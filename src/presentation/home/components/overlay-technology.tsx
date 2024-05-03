import classNames from "classnames";
import { HomeAnimationStates } from "../utils/contants";
import { useContext } from "react";
import HomeContext from "../home.context";

function OverlayTechnology() {
  const { changePage } = useContext(HomeContext);
  const goBack = () => {
    changePage!(HomeAnimationStates.DEVELOPER);
  };
  return (
    <section
      className={classNames("relative w-screen h-screen", {
        "opacity-0": false,
        flex: true,
        "items-start": true,
        "justify-start": true,
        "backdrop-filter backdrop-blur-lg": true,
      })}
      style={{ pointerEvents: "all" }}
    >
      <div className={`relative max-w-5xl m-auto `}>
        <button
          className="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-900 text-2xl pointer-events-auto cursor-pointer"
          onClick={goBack}
        >
          &#10005;
        </button>{" "}
        <h1 className="text-5xl font-bold text-left">Javascript</h1>
        <hr className="bg-yellow-400 h-0.5 border-none" />
        <section className="mt-8 text-justify text-lg px-5">
          <p>
            Soy un desarrollador frontend con más de 14 años de experiencia,
            especializado en JavaScript y apasionado por crear aplicaciones web
            modernas y eficientes. A lo largo de mi carrera, he explorado y
            dominado diversas tecnologías y patrones emergentes, como Web
            Components, que me permiten construir interfaces reutilizables y
            bien encapsuladas, y Web Workers, que utilizo para mejorar el
            rendimiento de las aplicaciones mediante el procesamiento en segundo
            plano.
          </p>
          <br />
          <p>
            También tengo experiencia en el desarrollo de Progressive Web Apps
            (PWA), que optimizan la accesibilidad y proporcionan una experiencia
            de usuario similar a las aplicaciones nativas, incluso en
            condiciones de red desfavorables. Además, he trabajado con
            frameworks y herramientas modernas como React, Angular y TypeScript,
            lo que me ha permitido construir aplicaciones robustas y escalables.
          </p>{" "}
          <br />
          <p>
            Mi enfoque está en aplicar las mejores prácticas de desarrollo y
            patrones de diseño para escribir código limpio y mantenible,
            asegurando que las aplicaciones no solo sean funcionales, sino
            también eficientes y fáciles de actualizar. Constantemente me
            actualizo con las últimas tendencias y tecnologías para mantener mis
            habilidades alineadas con las necesidades del mercado y seguir
            entregando soluciones innovadoras.
          </p>
        </section>
      </div>
    </section>
  );
}
export default OverlayTechnology;
