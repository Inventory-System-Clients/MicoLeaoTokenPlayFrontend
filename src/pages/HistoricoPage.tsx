import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import type { GameplayLog, Transaction } from "@/lib/types";
import { AchievementsSection } from "@/components/achievements/AchievementsSection";

function dateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTime(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", { hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatGroupDate(value: string): string {
  return new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "2-digit" }).format(new Date(value));
}

function statusLabel(status: GameplayLog["status"]): string {
  return status === "SUCCESS" ? "Sucesso" : "Falhou";
}

function statusTone(status: GameplayLog["status"]): string {
  return status === "SUCCESS" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700";
}

/**
 * Sequencia de dias consecutivos (fuso do navegador) com pelo menos uma
 * jogada com sucesso, contando a partir de hoje. Se ainda nao jogou hoje mas
 * jogou ontem, a sequencia continua valendo (so zera se faltar um dia).
 */
function computeStreak(logs: GameplayLog[]): number {
  const successDates = new Set(
    logs.filter((log) => log.status === "SUCCESS").map((log) => dateKey(new Date(log.createdAt))),
  );
  if (successDates.size === 0) return 0;

  const cursor = new Date();
  if (!successDates.has(dateKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
    if (!successDates.has(dateKey(cursor))) {
      return 0;
    }
  }

  let streak = 0;
  while (successDates.has(dateKey(cursor))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

type LogGroup = { key: string; label: string; logs: GameplayLog[] };

function groupLogsByDay(logs: GameplayLog[]): LogGroup[] {
  const groups = new Map<string, GameplayLog[]>();
  for (const log of logs) {
    const key = dateKey(new Date(log.createdAt));
    const existing = groups.get(key);
    if (existing) {
      existing.push(log);
    } else {
      groups.set(key, [log]);
    }
  }

  const todayKey = dateKey(new Date());
  const yesterdayDate = new Date();
  yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  const yesterdayKey = dateKey(yesterdayDate);

  return Array.from(groups.entries()).map(([key, groupLogs]) => ({
    key,
    label: key === todayKey ? "Hoje" : key === yesterdayKey ? "Ontem" : formatGroupDate(groupLogs[0].createdAt),
    logs: groupLogs,
  }));
}

export function HistoricoPage() {
  const [gameplay, setGameplay] = useState<GameplayLog[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      apiRequest<GameplayLog[]>("/gameplay"),
      apiRequest<Transaction[]>("/transactions").catch(() => []),
    ])
      .then(([gameplayData, transactionsData]) => {
        setGameplay(gameplayData);
        setTransactions(transactionsData);
      })
      .finally(() => setLoading(false));
  }, []);

  const totalPlays = gameplay.length;
  const successPlays = gameplay.filter((log) => log.status === "SUCCESS").length;
  const streak = computeStreak(gameplay);
  const hasApprovedPurchase = transactions.some((transaction) => transaction.status === "APPROVED");
  const groups = groupLogsByDay(gameplay);

  return (
    <div className="flex flex-col gap-5 px-4 py-5">
      <div className="relative overflow-hidden rounded-3xl bg-slate-950 px-5 py-6 text-white shadow-[0_22px_55px_rgba(15,23,42,0.22)]">
        <span aria-hidden className="absolute -right-10 -top-12 h-36 w-36 rounded-full bg-brand-yellow/30" />
        <span aria-hidden className="absolute -bottom-14 left-10 h-28 w-28 rounded-full bg-orange-500/20" />
        <div className="relative">
          <div className="flex items-center gap-2">
            <span aria-hidden className="text-3xl">
              🕹️
            </span>
            <h1 className="text-3xl font-black text-white">Minhas jogadas</h1>
          </div>
          <p className="mt-2 text-sm font-medium text-white/65">Acompanhe apenas suas ativações recentes.</p>

          {!loading && (
            <div className="mt-5 grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                <p className="text-2xl font-black text-brand-yellow">{totalPlays}</p>
                <p className="text-[11px] font-bold uppercase text-white/50">Jogadas</p>
              </div>
              <div className="rounded-2xl bg-white/10 p-3 ring-1 ring-white/15">
                <p className="text-2xl font-black text-brand-yellow">
                  {streak} {streak > 0 && "🔥"}
                </p>
                <p className="text-[11px] font-bold uppercase text-white/50">
                  {streak === 1 ? "Dia seguido" : "Dias seguidos"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {loading && (
        <div className="rounded-3xl bg-white/85 p-8 text-center text-sm font-bold text-gray-500 shadow-sm">
          Carregando jogadas...
        </div>
      )}

      {!loading && gameplay.length === 0 && (
        <div className="rounded-3xl bg-white/85 p-8 text-center shadow-sm">
          <p className="text-3xl">🧸</p>
          <p className="mt-2 font-black text-brand-black">Nenhuma jogada ainda</p>
          <p className="text-sm text-gray-500">Escolha uma loja e ative uma máquina para começar.</p>
        </div>
      )}

      {!loading && (
        <AchievementsSection
          totalPlays={totalPlays}
          successPlays={successPlays}
          hasApprovedPurchase={hasApprovedPurchase}
        />
      )}

      {!loading &&
        groups.map((group) => (
          <section key={group.key} className="flex flex-col gap-3">
            <h2 className="text-sm font-black uppercase tracking-wide text-gray-500">{group.label}</h2>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.logs.map((log) => (
                <div key={log.id} className="rounded-3xl bg-white/90 p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="truncate font-black text-brand-black">{log.machine.name}</p>
                      <p className="truncate text-sm font-semibold text-gray-500">{log.machine.store.name}</p>
                      <p className="mt-1 text-sm font-bold text-amber-700">{log.pulsesSent} pulsos enviados</p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={`rounded-full px-3 py-1 text-xs font-black ${statusTone(log.status)}`}>
                        {statusLabel(log.status)}
                      </p>
                      <p className="mt-2 text-xs font-semibold text-gray-500">{formatTime(log.createdAt)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
    </div>
  );
}
