import { useState, useEffect } from "react";

const leftColumnValues = [
  {
    text: (
      <>
        <strong className="text-gray-900">Pensamiento de ingeniería,</strong>{" "}
        visión de producto.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-gray-900">Creatividad</strong> sin límites.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-gray-900">Pasión</strong> por enseñar e
        inspirar.
      </>
    ),
  },
];

const rightColumnValues = [
  {
    text: (
      <>
        <strong className="text-gray-900">Tecnología</strong> con propósito
        humano.
      </>
    ),
  },
  {
    text: (
      <>
        <strong className="text-gray-900">Soluciones</strong> elegantes,
        eficientes y escalables.
      </>
    ),
  },
];

export function AnimatedValues() {
  const [currentSet, setCurrentSet] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Crear sets de valores que rotan
  const allSets = [
    {
      left: [0, 1, 2],
      right: [0, 1],
    },
    {
      left: [1, 2, 0],
      right: [1, 0],
    },
    {
      left: [2, 0, 1],
      right: [0, 1],
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentSet((prev) => (prev + 1) % allSets.length);
        setIsVisible(true);
      }, 400);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  const currentLeft = allSets[currentSet].left;
  const currentRight = allSets[currentSet].right;

  return (
    <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
      {/* Columna izquierda */}
      <div className="space-y-4">
        {currentLeft.map((valueIdx, idx) => (
          <div
            key={`left-${currentSet}-${idx}`}
            className={`p-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
            style={{
              transitionDelay: `${idx * 100}ms`,
            }}
          >
            <p className="text-gray-900">
              {leftColumnValues[valueIdx].text}
            </p>
          </div>
        ))}
      </div>

      {/* Columna derecha */}
      <div className="space-y-4">
        {currentRight.map((valueIdx, idx) => (
          <div
            key={`right-${currentSet}-${idx}`}
            className={`p-4 rounded-lg bg-white/20 backdrop-blur-md border border-white/30 shadow-lg transition-all duration-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
            style={{
              transitionDelay: `${(idx + 3) * 100}ms`,
            }}
          >
            <p className="text-gray-900">
              {rightColumnValues[valueIdx].text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

