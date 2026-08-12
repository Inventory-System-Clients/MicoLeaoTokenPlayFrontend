import { Link } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";
import { BrandMark } from "@/components/ui/BrandMark";

export function LandingPage() {
  const token = useAuthStore((state) => state.token);
  const startPath = token ? "/inicio" : "/entrar";

  return (
    <div className="app-viewport landing-shell landing-viewport min-h-dvh overflow-hidden bg-[#060814] text-white">
      <section className="landing-hero relative min-h-dvh px-5 pb-10 pt-7 sm:px-8 lg:px-10 lg:py-10">
        <div className="landing-spot landing-spot--yellow" />
        <div className="landing-spot landing-spot--orange" />
        <div className="landing-spot landing-spot--blue" />

        <header className="relative mx-auto flex w-full max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-14 w-14 items-center justify-center rounded-3xl bg-gradient-to-br from-brand-yellow to-orange-400 shadow-[0_16px_34px_rgba(245,158,11,0.34)]">
              <BrandMark size={36} spinning={false} />
            </div>
            <div>
              <p className="text-xl font-black leading-tight text-white drop-shadow">
                Mico Leão
              </p>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-brand-yellow">
                Token Play
              </p>
            </div>
          </div>
          <Link
            to="/entrar"
            className="rounded-full bg-white/10 px-4 py-2 text-xs font-black text-white ring-1 ring-white/15 transition hover:bg-white/15"
          >
            Entrar
          </Link>
        </header>

        <div className="relative mx-auto mt-12 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div className="lg:pt-6">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-2 text-xs font-black uppercase text-brand-black shadow-[0_10px_30px_rgba(244,81,30,0.18)]">
                <span className="inline-flex h-2.5 w-2.5 rounded-full bg-brand-black" />
                Pacotes com desconto e bônus
              </div>
              <h1 className="mt-6 max-w-[13ch] text-5xl font-black leading-[0.9] tracking-tight sm:text-6xl lg:text-7xl">
                Fichas digitais para jogar hoje mesmo.
              </h1>
              <p className="mt-5 max-w-xl text-base font-semibold leading-relaxed text-white/80 sm:text-lg lg:text-xl">
                Compre online, escolha a loja mais próxima e use o mascote Mico
                Leão para subir de nível na diversão.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
                <Link
                  to={startPath}
                  className="landing-cta inline-flex w-full items-center justify-center rounded-[1.75rem] bg-gradient-to-r from-brand-yellow to-orange-400 px-6 py-4 text-xl font-black uppercase tracking-wide text-brand-black shadow-[0_20px_44px_rgba(245,158,11,0.38)] transition duration-200 hover:-translate-y-0.5 hover:scale-[1.01] animate-pulse-glow sm:w-auto"
                >
                  Comece agora
                </Link>
                <p className="max-w-sm text-sm font-semibold text-white/60">
                  Cadastre-se em minutos e tenha acesso a ofertas exclusivas e
                  pagamento rápido via PIX.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="rounded-full bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-[0.24em] text-white/80 ring-1 ring-white/10 shadow-[0_10px_30px_rgba(255,255,255,0.05)]">
                  🔥 Mais de 30 promoções ativas
                </div>
                <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                  <HighlightChip
                    label="Entrega rápida"
                    value="PIX em segundos"
                  />
                  <HighlightChip
                    label="Loja mais perto"
                    value="Rede física integrada"
                  />
                  <HighlightChip
                    label="Mais bônus"
                    value="Pacotes exclusivos"
                  />
                </div>
              </div>

              <div className="mt-10 grid gap-4 sm:grid-cols-3">
                <LandingStat value="Pix" label="Pagamento instantâneo" />
                <LandingStat value="Bônus" label="Até +40%" />
                <LandingStat value="Rede" label="Máquinas reais" />
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <FeatureBubble
                  title="Ganha pontos"
                  description="Use fichas e suba de nível."
                />
                <FeatureBubble
                  title="Promoções diárias"
                  description="Ofertas frescas todos os dias."
                />
                <FeatureBubble
                  title="Pagamento seguro"
                  description="PIX confiável e rápido."
                />
              </div>
            </div>

            <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-slate-950/88 p-5 shadow-[0_32px_90px_rgba(0,0,0,0.45)] backdrop-blur">
              <div className="absolute -left-8 top-8 h-28 w-28 rounded-full bg-brand-yellow/15 blur-3xl" />
              <div className="absolute right-5 top-12 h-10 w-10 rounded-full bg-orange-400/20 blur-2xl" />
              <div className="absolute right-6 top-6 rounded-full border border-white/10 bg-black/40 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-white shadow-[0_12px_28px_rgba(0,0,0,0.2)] backdrop-blur">
                Promoção relâmpago
              </div>
              <div className="relative z-10 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-yellow">
                    App preview
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-white sm:text-3xl">
                    Dashboard Mico Leão
                  </h2>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-black uppercase tracking-[0.18em] text-white/80">
                  Novo
                </span>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-[2rem] bg-gradient-to-br from-brand-yellow/15 to-orange-400/10 p-4 shadow-[0_18px_40px_rgba(244,81,30,0.18)]">
                  <p className="text-sm font-black uppercase tracking-[0.24em] text-brand-yellow">
                    Destaque
                  </p>
                  <p className="mt-3 text-xl font-black text-white">
                    Mantenha controle das suas fichas e promoções em um só
                    lugar.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-white/5 p-4 shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:bg-white/10">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                      Saldo
                    </p>
                    <p className="mt-3 text-3xl font-black text-white">120</p>
                    <p className="mt-2 text-sm text-white/60">
                      Fichas prontas para usar
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] bg-white/5 p-4 shadow-[0_14px_28px_rgba(0,0,0,0.18)] transition hover:-translate-y-1 hover:bg-white/10">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/60">
                      Ofertas
                    </p>
                    <p className="mt-3 text-3xl font-black text-white">+30</p>
                    <p className="mt-2 text-sm text-white/60">
                      Promoções ativas
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
            <section className="rounded-[2rem] bg-gradient-to-br from-[#11131C] via-[#090B13] to-[#11131C] p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.33em] text-brand-yellow">
                    Coleção
                  </p>
                  <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                    Banners que chamam atenção
                  </h3>
                </div>
                <Link
                  to={startPath}
                  className="inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 text-sm font-black uppercase text-brand-black transition hover:bg-orange-400"
                >
                  Ver agora
                </Link>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.75rem] bg-slate-950/80 p-5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/5">
                  <p className="text-sm font-black text-white">
                    Experiência intuitiva
                  </p>
                  <p className="mt-3 text-sm text-white/65">
                    App com navegação clara e chamada para ação direta.
                  </p>
                </div>
                <div className="rounded-[1.75rem] bg-slate-950/80 p-5 ring-1 ring-white/10 transition hover:-translate-y-1 hover:bg-white/5">
                  <p className="text-sm font-black text-white">
                    Promoções em destaque
                  </p>
                  <p className="mt-3 text-sm text-white/65">
                    Banners modernos com gradientes e movimento suave.
                  </p>
                </div>
              </div>
            </section>

            <aside className="rounded-[2rem] bg-white/5 p-6 shadow-[0_30px_50px_rgba(0,0,0,0.24)] ring-1 ring-white/10 backdrop-blur">
              <p className="text-xs font-black uppercase tracking-[0.3em] text-brand-yellow">
                Impacto
              </p>
              <h3 className="mt-3 text-2xl font-black text-white">
                Design inspirado em apps modernos
              </h3>
              <p className="mt-4 text-sm leading-6 text-white/70">
                Elementos de destaque, fundo escuro e interações suaves para um
                visual atual e memorável.
              </p>
              <div className="mt-6 grid gap-3">
                <StatBadge label="Fluxo" value="Fácil" />
                <StatBadge label="Velocidade" value="Ágil" />
                <StatBadge label="Experiência" value="Premium" />
              </div>
            </aside>
          </div>

          <section className="mt-12 rounded-[2rem] border border-white/10 bg-slate-950/80 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] ring-1 ring-white/10 backdrop-blur transition hover:shadow-[0_35px_100px_rgba(0,0,0,0.45)]">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[0.33em] text-brand-yellow">
                  Como funciona
                </p>
                <h3 className="mt-3 text-3xl font-black text-white sm:text-4xl">
                  Três passos para começar a jogar
                </h3>
              </div>
              <p className="max-w-xl text-sm leading-6 text-white/70">
                Confira o fluxo claro e rápido: escolha o pacote, pague online e
                utilize nas máquinas físicas.
              </p>
            </div>

            <div className="mt-8 grid gap-4 lg:grid-cols-3">
              <StepCard
                number="01"
                title="Escolha sua loja"
                description="Selecione a unidade mais próxima e veja pacotes com bônus exclusivos."
              />
              <StepCard
                number="02"
                title="Compre fichas"
                description="Use PIX para comprar fichas digitais rapidamente e sem complicação."
              />
              <StepCard
                number="03"
                title="Jogue na máquina"
                description="Use o código gerado para liberar a máquina e aproveitar a partida."
              />
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}

function LandingStat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-900/75 px-2 py-3 text-center shadow-[0_14px_28px_rgba(0,0,0,0.22)] sm:px-4 sm:py-4">
      <p className="text-sm font-black text-brand-yellow sm:text-base">
        {value}
      </p>
      <p className="mt-1 text-[10px] font-black uppercase leading-tight text-white/70 sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function StatBadge({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-black/40 px-4 py-3 text-sm text-white/85 ring-1 ring-white/10">
      <p className="font-black text-white">{value}</p>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-white/60">
        {label}
      </p>
    </div>
  );
}

function HighlightChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-full bg-white/5 px-4 py-3 text-left shadow-[0_12px_30px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:bg-white/10">
      <p className="text-[11px] font-black uppercase tracking-[0.3em] text-white/70">
        {label}
      </p>
      <p className="mt-2 text-sm font-bold text-white">{value}</p>
    </div>
  );
}

function FeatureBubble({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-5 text-white shadow-[0_18px_40px_rgba(0,0,0,0.16)] transition hover:-translate-y-1 hover:bg-white/10">
      <p className="text-sm font-black uppercase tracking-[0.25em] text-brand-yellow">
        {title}
      </p>
      <p className="mt-3 text-sm leading-6 text-white/70">{description}</p>
    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group rounded-[2rem] border border-white/10 bg-slate-900/90 p-6 text-white shadow-[0_18px_50px_rgba(0,0,0,0.2)] transition duration-200 hover:-translate-y-1 hover:border-brand-yellow/40 hover:bg-white/10">
      <div className="inline-flex h-11 w-11 items-center justify-center rounded-3xl bg-brand-yellow text-sm font-black text-brand-black">
        {number}
      </div>
      <h4 className="mt-5 text-xl font-black text-white">{title}</h4>
      <p className="mt-3 text-sm leading-6 text-white/70">{description}</p>
    </div>
  );
}
