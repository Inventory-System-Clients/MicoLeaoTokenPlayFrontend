import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { apiRequest, ApiError } from "@/lib/api";

export function EsqueciSenhaPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await apiRequest("/auth/forgot-password", {
        method: "POST",
        body: { email },
        auth: false,
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Nao foi possivel enviar o link");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-viewport flex min-h-dvh items-center justify-center bg-[#060814] px-5 py-10 text-white">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-brand-black shadow-2xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-yellow to-orange-400 text-2xl shadow-[0_10px_24px_rgba(245,158,11,0.3)]">
            🔑
          </div>
          <div>
            <p className="text-lg font-black leading-tight">Esqueci minha senha</p>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Mico Leão</p>
          </div>
        </div>

        {sent ? (
          <div className="rounded-2xl bg-emerald-50 px-4 py-4 text-sm font-bold text-emerald-700">
            Se esse e-mail tiver uma conta, enviamos um link para redefinir a senha. Confira sua caixa de entrada.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <p className="text-sm font-semibold text-gray-500">
              Informe o e-mail da sua conta. Vamos enviar um link para você criar uma nova senha.
            </p>
            <label className="flex flex-col gap-1.5 text-sm font-black text-brand-black">
              E-mail
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="voce@email.com"
                className="h-13 w-full rounded-2xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-base font-bold text-brand-black outline-none transition placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:ring-2 focus:ring-brand-yellow/25"
              />
            </label>

            {error && (
              <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-2 rounded-2xl bg-gradient-to-r from-brand-yellow to-orange-400 py-4 text-base font-black text-brand-black shadow-[0_16px_28px_rgba(245,158,11,0.28)] transition active:scale-[0.98] disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Enviar link"}
            </button>
          </form>
        )}

        <Link to="/entrar" className="mt-5 block text-center text-sm font-black text-orange-700">
          Voltar para o login
        </Link>
      </div>
    </div>
  );
}
