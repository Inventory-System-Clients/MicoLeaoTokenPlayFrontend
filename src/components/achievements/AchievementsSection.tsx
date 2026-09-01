import { useEffect, useState } from "react";
import { ConfettiBurst } from "@/components/ui/ConfettiBurst";

type Achievement = {
  id: string;
  emoji: string;
  label: string;
  unlocked: boolean;
};

const SEEN_STORAGE_KEY = "mico-leao.achievements-seen";

function readSeenIds(): string[] {
  try {
    const raw = window.localStorage.getItem(SEEN_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

function writeSeenIds(ids: string[]): void {
  window.localStorage.setItem(SEEN_STORAGE_KEY, JSON.stringify(ids));
}

type AchievementsSectionProps = {
  totalPlays: number;
  successPlays: number;
  hasApprovedPurchase: boolean;
};

/**
 * Conquistas calculadas no cliente a partir dos dados que a HistoricoPage ja
 * carrega (sem endpoint proprio). O confete so aparece na primeira vez que
 * uma conquista e detectada como desbloqueada (controle via localStorage).
 */
export function AchievementsSection({ totalPlays, successPlays, hasApprovedPurchase }: AchievementsSectionProps) {
  const achievements: Achievement[] = [
    { id: "first-play", emoji: "🎮", label: "Primeira jogada", unlocked: totalPlays >= 1 },
    { id: "ten-plays", emoji: "🏆", label: "10 jogadas", unlocked: successPlays >= 10 },
    { id: "first-purchase", emoji: "💳", label: "Primeira compra", unlocked: hasApprovedPurchase },
  ];

  const [celebrate, setCelebrate] = useState(false);

  useEffect(() => {
    const unlockedIds = achievements.filter((achievement) => achievement.unlocked).map((achievement) => achievement.id);
    if (unlockedIds.length === 0) return;

    const seenIds = readSeenIds();
    const newlyUnlocked = unlockedIds.filter((id) => !seenIds.includes(id));
    if (newlyUnlocked.length === 0) return;

    writeSeenIds([...seenIds, ...newlyUnlocked]);
    setCelebrate(true);
    const timeout = window.setTimeout(() => setCelebrate(false), 1600);
    return () => window.clearTimeout(timeout);
  }, [totalPlays, successPlays, hasApprovedPurchase]);

  return (
    <section className="relative flex flex-col gap-3">
      {celebrate && <ConfettiBurst />}
      <div>
        <h2 className="text-xl font-black text-brand-black">Conquistas</h2>
        <p className="text-sm font-medium text-gray-500">Desbloqueie badges jogando e comprando fichas.</p>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`flex flex-col items-center gap-1 rounded-3xl bg-white/90 p-4 text-center shadow-sm transition-all duration-200 ${
              achievement.unlocked ? "" : "grayscale opacity-60"
            }`}
          >
            <span className="text-3xl">{achievement.emoji}</span>
            <span className="text-xs font-black text-brand-black">{achievement.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
