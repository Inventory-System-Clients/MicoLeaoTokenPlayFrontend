import { useEffect, useState } from "react";

const LOADING_MESSAGES = [
  "Conectando com a máquina...",
  "Ativando os motores...",
  "Posicionando a garra...",
  "Quase lá...",
];

/**
 * Estado de transicao exibido enquanto o backend desconta as fichas e
 * dispara os pulsos na CompactPay. Substitui o conteudo do modal. A garra
 * "descendo" ate a pelucia e as mensagens alternando preenchem a espera
 * real da chamada a /machines/play com algo mais ludico que um texto parado.
 */
export function TelemetryLoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setMessageIndex((current) => (current + 1) % LOADING_MESSAGES.length);
    }, 1200);
    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center gap-6 px-6 py-16">
      <div className="relative flex h-28 w-28 items-center justify-center">
        <span className="absolute top-6 text-5xl animate-claw-drop" aria-hidden>
          🪝
        </span>
        <span className="absolute bottom-2 text-4xl" aria-hidden>
          🧸
        </span>
      </div>
      <p className="text-center text-base font-semibold text-brand-black">{LOADING_MESSAGES[messageIndex]}</p>
    </div>
  );
}
