"use client";

import { useEffect, useRef, useState } from "react";
import { Brain, Code, Box, GraduationCap, Lightbulb } from "lucide-react";

interface Service {
  icon: typeof Brain;
  title: string;
  description: string;
  codeExample: string;
}

const services: Service[] = [
  {
    icon: Brain,
    title: "Soluciones con IA",
    description:
      "Aplicaciones inteligentes, asistentes conversacionales, agentes, análisis de datos y automatización.",
    codeExample: `// Asistente de IA con React
import { useState } from 'react';

export function AIService() {
  const [query, setQuery] = useState('');
  
  const handleQuery = async () => {
    const response = await fetch('/api/ai', {
      method: 'POST',
      body: JSON.stringify({ query })
    });
    return response.json();
  };
  
  return (
    <div>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleQuery}>
        Consultar IA
      </button>
    </div>
  );
}`,
  },
  {
    icon: Code,
    title: "Arquitectura & Desarrollo Web",
    description:
      "Sistemas escalables con React, Angular, NestJS, Node, Supabase y arquitecturas limpias.",
    codeExample: `// Arquitectura limpia con NestJS
import { Module, Controller, Get } from '@nestjs/common';

@Controller('api')
export class AppController {
  @Get()
  getData() {
    return { message: 'Sistema escalable' };
  }
}

@Module({
  controllers: [AppController],
})
export class AppModule {}`,
  },
  {
    icon: Box,
    title: "Experiencias 3D & Visuales",
    description:
      "React Three Fiber, WebGL, animaciones, mundos interactivos y visualizaciones técnicas.",
    codeExample: `// Experiencia 3D con React Three Fiber
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';

export function Scene3D() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial color="hotpink" />
      </Sphere>
      <OrbitControls />
    </Canvas>
  );
}`,
  },
  {
    icon: GraduationCap,
    title: "Educación & Workshops",
    description:
      "Charlas, mentoría y formación en IA, programación moderna y tecnología para estudiantes y equipos.",
    codeExample: `// Ejemplo educativo: Hook personalizado
import { useState, useEffect } from 'react';

export function useLearning() {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => 
        prev < 100 ? prev + 1 : 100
      );
    }, 100);
    
    return () => clearInterval(interval);
  }, []);
  
  return { progress };
}`,
  },
  {
    icon: Lightbulb,
    title: "Producto & Innovación",
    description:
      "Diseño de experiencias, prototipos funcionales, estrategia tecnológica y visión técnica.",
    codeExample: `// Prototipo funcional: Componente de producto
import { useState } from 'react';

export function ProductFeature() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="feature-card">
      <h2>Innovación</h2>
      <button 
        onClick={() => setIsActive(!isActive)}
        className={isActive ? 'active' : ''}
      >
        {isActive ? 'Activo' : 'Inactivo'}
      </button>
    </div>
  );
}`,
  },
];

export function ScrollableServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              setActiveIndex(index);
            }
          });
        },
        {
          threshold: [0, 0.25, 0.5, 0.75, 1],
          rootMargin: "-20% 0px -20% 0px",
        }
      );

      observer.observe(section);
      observers.push(observer);
    });

    return () => {
      observers.forEach((observer) => observer.disconnect());
    };
  }, []);

  const ActiveIcon = services[activeIndex].icon;

  return (
    <section className="relative z-10 py-24 px-4 md:px-6 bg-slate-50/50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4">
            Qué hago
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Servicios especializados para clientes y empresas que buscan
            innovación tecnológica.
          </p>
        </div>

        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start"
        >
          {/* Left: Scrollable Content */}
          <div className="space-y-24 lg:pr-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isActive = index === activeIndex;

              return (
                <div
                  key={index}
                  ref={(el) => {
                    sectionRefs.current[index] = el;
                  }}
                  className={`transition-all duration-500 ${
                    isActive
                      ? "opacity-100 scale-100"
                      : "opacity-40 scale-95"
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className={`h-12 w-12 rounded-lg flex items-center justify-center transition-all duration-300 ${
                        isActive
                          ? "bg-blue-600 text-white scale-110"
                          : "bg-slate-200 text-slate-600"
                      }`}
                    >
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex-1">
                      <h3
                        className={`text-2xl font-bold mb-3 transition-colors duration-300 ${
                          isActive ? "text-slate-900" : "text-slate-600"
                        }`}
                      >
                        {service.title}
                      </h3>
                      <p
                        className={`text-base leading-relaxed transition-colors duration-300 ${
                          isActive ? "text-slate-700" : "text-slate-500"
                        }`}
                      >
                        {service.description}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Sticky Code Editor */}
          <div className="sticky top-24 hidden lg:block h-[600px]">
            <div className="rounded-xl border border-slate-200 bg-slate-900 shadow-2xl overflow-hidden h-full flex flex-col">
              {/* Editor Header */}
              <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-800/50 border-b border-slate-700/50">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500"></div>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="flex-1 flex items-center gap-2 ml-3 text-xs">
                  <span className="text-slate-500 font-mono">src</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-500 font-mono">app</span>
                  <span className="text-slate-600">/</span>
                  <span className="text-slate-500 font-mono">services</span>
                  <span className="text-slate-600">/</span>
                  <ActiveIcon className="h-3.5 w-3.5 text-blue-400" />
                  <span className="text-slate-300 font-mono">
                    {services[activeIndex].title.toLowerCase().replace(/\s+/g, "-")}.tsx
                  </span>
                </div>
                <div className="text-xs text-slate-500 font-medium">
                  {services[activeIndex].title}
                </div>
              </div>

              {/* Code Content */}
              <div className="flex-1 p-6 overflow-auto bg-[#1e1e1e]">
                <pre className="text-sm text-slate-300 font-mono leading-relaxed">
                  <code className="block">
                    {services[activeIndex].codeExample.split("\n").map((line, i) => {
                      // Simple syntax highlighting
                      const lineNumber = i + 1;
                      const isHighlighted = lineNumber === 9; // Highlight the form line
                      
                      return (
                        <div
                          key={i}
                          className={`flex ${
                            isHighlighted ? "bg-blue-500/10 border-l-2 border-blue-500" : ""
                          }`}
                        >
                          <span className="text-slate-600 mr-4 w-8 text-right select-none">
                            {lineNumber}
                          </span>
                          <span
                            className={`flex-1 ${
                              line.trim().startsWith("//")
                                ? "text-slate-500 italic"
                                : line.trim().startsWith("import") ||
                                  line.trim().startsWith("export")
                                ? "text-blue-400"
                                : line.includes("function") || line.includes("const")
                                ? "text-purple-400"
                                : line.includes("(") || line.includes(")")
                                ? "text-yellow-300"
                                : line.includes('"') || line.includes("'")
                                ? "text-green-400"
                                : "text-slate-300"
                            }`}
                          >
                            {line || " "}
                          </span>
                        </div>
                      );
                    })}
                  </code>
                </pre>
              </div>

              {/* Editor Footer */}
              <div className="px-4 py-2 bg-slate-800/50 border-t border-slate-700/50 flex items-center justify-between text-xs text-slate-500">
                <div className="flex items-center gap-4">
                  <span className="font-mono">main*</span>
                  <span>0 A 0</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">Tab</span>
                  <span>-</span>
                  <span>Showing supercomplete</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

