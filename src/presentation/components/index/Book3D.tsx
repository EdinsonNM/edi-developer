import { useState } from "react";

interface Book3DProps {
  coverImage: string;
  className?: string;
}

export function Book3D({ coverImage, className = "" }: Book3DProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative ${className}`}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 ease-out"
        style={{
          transform: isHovered ? "scale(1.05) rotateY(-10deg)" : "rotateY(-15deg)",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Contenedor del libro con perspectiva 3D */}
        <div
          className="relative w-full h-full"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Portada del libro */}
          <div
            className="absolute inset-0 rounded-lg shadow-2xl overflow-hidden border-2 border-slate-200"
            style={{
              transform: "translateZ(25px)",
              backfaceVisibility: "hidden",
            }}
          >
            <img
              src={coverImage}
              alt="Portada del libro: Zorrito en la fábrica de programadores"
              className="w-full h-full object-cover"
            />
            {/* Efecto de brillo en la portada */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Lomo del libro */}
          <div
            className="absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-amber-900 via-amber-800 to-amber-900 rounded-l-lg shadow-lg"
            style={{
              transform: "rotateY(-90deg) translateX(-12px)",
              transformOrigin: "left center",
            }}
          />

          {/* Páginas del libro (lado derecho) */}
          <div
            className="absolute inset-0 bg-gradient-to-r from-slate-50 via-white to-slate-50 rounded-lg shadow-xl border border-slate-200"
            style={{
              transform: "translateZ(-15px)",
            }}
          >
            {/* Efecto de páginas apiladas */}
            <div className="absolute inset-0 flex flex-col">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="h-full border-b border-slate-200/50"
                  style={{
                    transform: `translateZ(${-i * 2}px)`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Sombra debajo del libro */}
          <div
            className="absolute -bottom-6 left-1/2 w-4/5 h-6 bg-black/15 rounded-full blur-2xl"
            style={{
              transform: "translateX(-50%) translateZ(-60px)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

