import { useState, type FormEvent } from "react";
import { apiRequest, ApiError } from "@/lib/api";
import type { TwoFactorSetup } from "@/lib/types";

type TwoFactorSectionProps = {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
};

/**
 * So aparece pra usuarios ADMIN (ver MeuCadastroPage). Fluxo: setup gera um
 * secret novo (ainda desativado) + QR; verify confirma o codigo e ativa;
 * disable exige a senha de novo antes de desligar.
 */
export function TwoFactorSection({ enabled, onChange }: TwoFactorSectionProps) {
  const [setup, setSetup] = useState<TwoFactorSetup | null>(null);
  const [code, setCode] = useState("");
  const [showDisableForm, setShowDisableForm] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  async function startSetup() {
    setError(null);
    setFeedback(null);
    setLoading(true);
    try {
      const data = await apiRequest<TwoFactorSetup>("/users/me/2fa/setup", { method: "POST" });
      setSetup(data);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Nao foi possivel iniciar a ativacao");
    } finally {
      setLoading(false);
    }
  }

  async function handleVerify(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiRequest("/users/me/2fa/verify", { method: "POST", body: { code } });
      setSetup(null);
      setCode("");
      onChange(true);
      setFeedback("Autenticacao de dois fatores ativada.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Codigo invalido");
    } finally {
      setLoading(false);
    }
  }

  async function handleDisable(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiRequest("/users/me/2fa/disable", { method: "POST", body: { password } });
      setShowDisableForm(false);
      setPassword("");
      onChange(false);
      setFeedback("Autenticacao de dois fatores desativada.");
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Nao foi possivel desativar");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="rounded-3xl bg-white/90 p-5 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="text-xl" aria-hidden>
          🛡️
        </span>
        <h2 className="text-xl font-black text-brand-black">Segurança</h2>
      </div>
      <p className="mt-1 text-sm font-medium text-gray-500">
        Autenticação em duas etapas para sua conta de administrador.
      </p>

      {feedback && (
        <p className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">{feedback}</p>
      )}
      {error && <p className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>}

      {enabled && !showDisableForm && (
        <div className="mt-4 flex items-center justify-between gap-3 rounded-2xl bg-emerald-50 px-4 py-3">
          <p className="text-sm font-bold text-emerald-700">Ativada ✅</p>
          <button
            type="button"
            onClick={() => setShowDisableForm(true)}
            className="rounded-xl border border-red-200 px-3 py-2 text-xs font-black text-red-600"
          >
            Desativar
          </button>
        </div>
      )}

      {enabled && showDisableForm && (
        <form onSubmit={handleDisable} className="mt-4 grid gap-3 rounded-2xl bg-red-50 p-4">
          <p className="text-xs font-black uppercase text-red-600">Confirme sua senha para desativar</p>
          <input
            type="password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Sua senha"
            className="h-12 rounded-2xl border border-red-100 bg-white px-4 text-sm font-bold text-brand-black outline-none focus:ring-2 focus:ring-red-300"
          />
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setShowDisableForm(false);
                setPassword("");
              }}
              className="rounded-xl border border-gray-200 py-3 text-sm font-black text-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-red-600 py-3 text-sm font-black text-white disabled:opacity-60"
            >
              {loading ? "Desativando..." : "Desativar"}
            </button>
          </div>
        </form>
      )}

      {!enabled && !setup && (
        <button
          type="button"
          onClick={startSetup}
          disabled={loading}
          className="mt-4 w-full rounded-2xl bg-gradient-to-r from-brand-yellow to-orange-400 py-3.5 text-sm font-black text-brand-black shadow-[0_14px_26px_rgba(245,158,11,0.24)] disabled:opacity-60"
        >
          {loading ? "Gerando..." : "Ativar autenticação de dois fatores"}
        </button>
      )}

      {!enabled && setup && (
        <form onSubmit={handleVerify} className="mt-4 flex flex-col items-center gap-3 rounded-2xl bg-amber-50 p-4">
          <p className="text-center text-xs font-bold text-gray-600">
            Escaneie com o Google Authenticator (ou outro app compatível) e digite o código gerado.
          </p>
          <img
            src={`data:image/png;base64,${setup.qrCodeBase64}`}
            alt="QR Code para configurar a autenticação de dois fatores"
            className="h-44 w-44 rounded-xl bg-white p-2"
          />
          <p className="break-all text-center text-xs font-semibold text-gray-500">
            Não consegue escanear? Digite manualmente: <span className="font-mono">{setup.secret}</span>
          </p>
          <input
            type="text"
            inputMode="numeric"
            required
            minLength={6}
            maxLength={6}
            value={code}
            onChange={(event) => setCode(event.target.value.replace(/\D/g, ""))}
            placeholder="000000"
            className="h-14 w-full rounded-2xl border border-amber-200 bg-white px-4 text-center text-2xl font-black tracking-[0.3em] text-brand-black outline-none focus:ring-2 focus:ring-brand-yellow/25"
          />
          <div className="grid w-full grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setSetup(null);
                setCode("");
              }}
              className="rounded-xl border border-gray-200 py-3 text-sm font-black text-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-brand-black py-3 text-sm font-black text-white disabled:opacity-60"
            >
              {loading ? "Confirmando..." : "Confirmar"}
            </button>
          </div>
        </form>
      )}
    </section>
  );
}
