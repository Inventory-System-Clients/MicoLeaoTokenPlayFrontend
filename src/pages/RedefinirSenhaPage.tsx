import { useState, type FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { apiRequest, ApiError } from "@/lib/api";

export function RedefinirSenhaPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("As senhas nao conferem.");
      return;
    }

    setLoading(true);
    try {
      await apiRequest("/auth/reset-password", {
        method: "POST",
        body: { token, password },
        auth: false,
      });
      setDone(true);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Nao foi possivel redefinir a senha");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-viewport flex min-h-dvh items-center justify-center bg-[#060814] px-5 py-10 text-white">
      <div className="w-full max-w-sm rounded-3xl bg-white p-6 text-brand-black shadow-2xl">
        <div className="mb-5 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-yellow to-orange-400 text-2xl shadow-[0_10px_24px_rgba(245,158,11,0.3)]">
            🔒
          </div>
          <div>
            <p className="text-lg font-black leading-tight">Nova senha</p>
            <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Mico Leão</p>
          </div>
        </div>

        {!token && (
          <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm font-bold text-red-600">
            Link invalido. Peca um novo link de redefinicao.
          </p>
        )}

        {token && done && (
          <div className="flex flex-col gap-3">
            <div className="rounded-2xl bg-emerald-50 px-4 py-4 text-sm font-bold text-emerald-700">
              Senha redefinida com sucesso.
            </div>
            <button
              type="button"
              onClick={() => navigate("/entrar")}
              className="rounded-2xl bg-gradient-to-r from-brand-yellow to-orange-400 py-4 text-base font-black text-brand-black shadow-[0_16px_28px_rgba(245,158,11,0.28)] transition active:scale-[0.98]"
            >
              Ir para o login
            </button>
          </div>
        )}

        {token && !done && (
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <label className="flex flex-col gap-1.5 text-sm font-black text-brand-black">
              Nova senha
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="********"
                className="h-13 w-full rounded-2xl border border-amber-100 bg-amber-50/60 px-4 py-3 text-base font-bold text-brand-black outline-none transition placeholder:text-gray-400 focus:border-brand-yellow focus:bg-white focus:ring-2 focus:ring-brand-yellow/25"
              />
            </label>
            <label className="flex flex-col gap-1.5 text-sm font-black text-brand-black">
              Confirmar nova senha
              <input
                type="password"
                required
                minLength={6}
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                placeholder="********"
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
              {loading ? "Salvando..." : "Redefinir senha"}
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
