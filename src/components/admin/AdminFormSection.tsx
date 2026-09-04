import { useState, type FormHTMLAttributes, type ReactNode } from "react";

type AdminFormSectionProps = FormHTMLAttributes<HTMLFormElement> & {
  title: string;
  children: ReactNode;
  /** Comeca fechado, so mostrando um botao; clicar no titulo abre os campos. */
  collapsible?: boolean;
};

export function AdminFormSection({
  title,
  children,
  className = "",
  collapsible = false,
  ...props
}: AdminFormSectionProps) {
  const [open, setOpen] = useState(!collapsible);
  const showFields = !collapsible || open;

  return (
    <form {...props} className={`grid min-w-0 gap-3 rounded-2xl bg-surface-soft p-4 ${className}`}>
      {collapsible ? (
        <button
          type="button"
          onClick={() => setOpen((current) => !current)}
          className="flex items-center gap-1.5 text-left text-sm font-bold text-brand-black"
        >
          <span
            className="inline-block text-brand-yellow transition-transform duration-150"
            aria-hidden
            style={{ transform: open ? "rotate(45deg)" : "none" }}
          >
            ＋
          </span>
          {title}
        </button>
      ) : (
        <p className="flex items-center gap-1.5 text-sm font-bold text-brand-black">
          <span className="text-brand-yellow" aria-hidden>
            ＋
          </span>
          {title}
        </p>
      )}
      {showFields && children}
    </form>
  );
}
