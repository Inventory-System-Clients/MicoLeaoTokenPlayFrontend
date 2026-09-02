import { Component, type ErrorInfo, type ReactNode } from "react";
import { BrandMark } from "@/components/ui/BrandMark";

const SUPPORT_PHONE_DISPLAY = "(11) 97117-4080";
const SUPPORT_PHONE_WHATSAPP = "https://wa.me/5511971174080";

type ErrorBoundaryProps = { children: ReactNode };
type ErrorBoundaryState = { hasError: boolean };

/**
 * Ultima linha de defesa contra tela branca: se qualquer erro inesperado
 * estourar no render, mostra uma tela amigavel em vez de travar o app sem
 * explicacao - importante porque cada cliente acessa do proprio celular,
 * sem ninguem por perto pra ajudar a "religar" nada.
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  state: ErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Erro nao tratado capturado pelo ErrorBoundary", error, errorInfo);
  }

  handleRestart = () => {
    this.setState({ hasError: false });
    window.location.href = "/";
  };

  render() {
    if (!this.state.hasError) {
      return this.props.children;
    }

    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-surface-soft px-6 py-10 text-center">
        <BrandMark size={110} />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-black text-brand-black">Estamos com instabilidade</h1>
          <p className="max-w-xs text-sm font-semibold text-gray-500">
            Algo deu errado por aqui. Qualquer dúvida, chame a gente no número:
            <br />
            <a href={SUPPORT_PHONE_WHATSAPP} className="font-black text-orange-700">
              {SUPPORT_PHONE_DISPLAY}
            </a>
          </p>
        </div>
        <button
          type="button"
          onClick={this.handleRestart}
          className="rounded-2xl bg-gradient-to-r from-brand-yellow to-orange-400 px-6 py-3.5 text-sm font-black text-brand-black shadow-[0_14px_26px_rgba(245,158,11,0.24)] transition active:scale-[0.98]"
        >
          Recomeçar
        </button>
      </div>
    );
  }
}
