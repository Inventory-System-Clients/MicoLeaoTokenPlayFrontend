import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { apiRequest } from "@/lib/api";
import type { CreditPackage } from "@/lib/types";
import { BrandMark } from "@/components/ui/BrandMark";
import { useAuthStore } from "@/store/useAuthStore";

export function PromocoesPage() {
  const token = useAuthStore((state) => state.token);
  const buyPath = token ? "/fichas" : "/entrar?mode=register";

  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiRequest<CreditPackage[]>("/packages", { auth: false })
      .then(setPackages)
      .finally(() => setLoading(false));
  }, []);

  const popularPackages = packages.filter((item) => item.isPopular);
  const otherPackages = packages.filter((item) => !item.isPopular);

  return (
    <div className="min-h-dvh overflow-hidden bg-[#060814] px-5 pb-14 pt-7 text-white sm:px-8 lg:px-10">
      <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-yellow to-orange-400 shadow-[0_16px_34px_rgba(245,158,11,0.34)]">
            <BrandMark size={30} spinning={false} />
          </div>
          <div>
            <p className="text-lg font-black leading-tight text-white">
              Mico Leão
            </p>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-yellow">
              Token Play
            </p>
          </div>
        </Link>
        <Link
          to={token ? "/inicio" : "/entrar"}
          className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white ring-1 ring-white/15 transition hover:bg-white/15"
        >
          {token ? "Ir para o app" : "Entrar"}
        </Link>
      </header>

      <div className="relative mx-auto mt-10 max-w-6xl">
        <div className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-2 text-xs font-black uppercase text-brand-black shadow-[0_10px_30px_rgba(244,81,30,0.18)]">
          <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-black" />
          Pacotes com desconto e bônus
        </div>
        <h1 className="mt-6 max-w-2xl text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
          Promoções e pacotes de fichas
        </h1>
        <p className="mt-4 max-w-xl text-base font-semibold leading-relaxed text-white/70 sm:text-lg">
          Aproveite os pacotes mais populares com bônus extra. Escolha o seu e
          finalize o cadastro para comprar.
        </p>
      </div>

      {loading && (
        <div className="relative mx-auto mt-10 max-w-6xl rounded-3xl bg-white/5 p-8 text-center text-sm font-bold text-white/60 ring-1 ring-white/10">
          Carregando promoções...
        </div>
      )}

      {!loading && packages.length === 0 && (
        <div className="relative mx-auto mt-10 max-w-6xl rounded-3xl bg-white/5 p-8 text-center ring-1 ring-white/10">
          <p className="text-3xl">🎁</p>
          <p className="mt-2 font-black text-white">
            Nenhuma promoção disponível no momento
          </p>
          <p className="text-sm text-white/60">Volte em breve para conferir novidades.</p>
        </div>
      )}

      {!loading && popularPackages.length > 0 && (
        <section className="relative mx-auto mt-12 max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.33em] text-brand-yellow">
            Mais populares
          </p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            Os favoritos dos jogadores
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {popularPackages.map((creditPackage) => (
              <PromoCard
                key={creditPackage.id}
                creditPackage={creditPackage}
                buyPath={buyPath}
                highlighted
              />
            ))}
          </div>
        </section>
      )}

      {!loading && otherPackages.length > 0 && (
        <section className="relative mx-auto mt-12 max-w-6xl">
          <p className="text-xs font-black uppercase tracking-[0.33em] text-brand-yellow">
            Outros pacotes
          </p>
          <h2 className="mt-2 text-2xl font-black text-white sm:text-3xl">
            Todas as opções disponíveis
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {otherPackages.map((creditPackage) => (
              <PromoCard
                key={creditPackage.id}
                creditPackage={creditPackage}
                buyPath={buyPath}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function PromoCard({
  creditPackage,
  buyPath,
  highlighted = false,
}: {
  creditPackage: CreditPackage;
  buyPath: string;
  highlighted?: boolean;
}) {
  const totalCredits = creditPackage.baseCredits + creditPackage.bonusCredits;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-5 shadow-[0_18px_42px_rgba(0,0,0,0.28)] ${
        highlighted
          ? "bg-gradient-to-br from-amber-400 via-orange-500 to-orange-600 text-brand-black"
          : "bg-slate-900/90 text-white ring-1 ring-white/10"
      }`}
    >
      <span aria-hidden className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/15" />

      {highlighted && (
        <div className="absolute right-4 top-4 rounded-full bg-white px-3 py-1 text-[11px] font-black uppercase text-orange-600 shadow-lg">
          Popular
        </div>
      )}

      <p className={`relative text-xs font-black uppercase ${highlighted ? "text-brand-black/70" : "text-white/55"}`}>
        Pacote
      </p>
      <h3 className="relative mt-1 text-xl font-black">{creditPackage.name}</h3>

      <div className="relative mt-5 grid grid-cols-[1fr_auto] items-end gap-3">
        <div>
          <p className={`text-xs font-bold uppercase ${highlighted ? "text-brand-black/65" : "text-white/55"}`}>
            Você recebe
          </p>
          <p className={`text-4xl font-black leading-none ${highlighted ? "text-brand-black" : "text-brand-yellow"}`}>
            {totalCredits}
          </p>
          <p className={`text-sm font-bold ${highlighted ? "text-brand-black/70" : "text-white/65"}`}>
            {creditPackage.baseCredits} fichas
          </p>
        </div>
        <div className="text-right">
          <p className={`text-xs font-bold uppercase ${highlighted ? "text-brand-black/65" : "text-white/55"}`}>
            Valor
          </p>
          <p className="text-2xl font-black">
            R$ {Number(creditPackage.amountBrl).toFixed(2)}
          </p>
        </div>
      </div>

      {creditPackage.bonusCredits > 0 && (
        <div
          className={`relative mt-4 w-fit rounded-full px-3 py-1.5 text-xs font-black uppercase ${
            highlighted ? "bg-brand-black text-white" : "bg-brand-yellow text-brand-black"
          }`}
        >
          +{creditPackage.bonusCredits} bônus grátis
        </div>
      )}

      <Link
        to={buyPath}
        className={`relative mt-5 block w-full rounded-2xl py-3.5 text-center text-sm font-black shadow-lg transition-all duration-150 active:scale-[0.98] ${
          highlighted
            ? "bg-brand-black text-white shadow-slate-900/20"
            : "bg-gradient-to-r from-brand-yellow to-orange-400 text-brand-black shadow-amber-500/25"
        }`}
      >
        Comprar
      </Link>
    </div>
  );
}
