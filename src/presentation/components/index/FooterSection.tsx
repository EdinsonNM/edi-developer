import { EdiDevLogo } from "@/components/ui/edidev-logo";

export function FooterSection() {
  return (
    <footer className="relative z-10 py-12 px-4 md:px-6 bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <EdiDevLogo className="h-6 w-6 text-white" />
            <span className="text-lg font-semibold tracking-tight">
              Edi Developer
            </span>
          </div>
          <p className="text-slate-400 text-center text-sm max-w-md">
            Construyendo futuro con tecnología y propósito.
          </p>
        </div>
      </div>
    </footer>
  );
}

