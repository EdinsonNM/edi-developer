import Description from "@design/atoms/page/description";
import Subtitle from "@design/atoms/page/subtitle";
import Title from "@design/atoms/page/title";

function OverlayTechnology() {
  return (
    <section
      className="overlay-home relative w-screen h-screen flex flex-col items-center justify-center overflow-hidden bg-black bg-opacity-55"
      style={{ pointerEvents: "auto" }}
    >
      <div className="w-full max-w-[1024px] p-8 md:p-5 flex flex-col items-center md:items-start text-start">
        <div className="w-full max-w-[600px] gap-4 ">
          <Title>
            El <span className="text-violet-500">arsenal</span> del
            <br />
            desarrollador...
          </Title>
          <Subtitle>“Herramientas que Manejo Mejor que mi Cafetera”</Subtitle>
          <Description>
            Bienvenido a mi caja de herramientas digital, donde las líneas de
            código fluyen más libremente que el café por la mañana. Con más de
            14 años de experiencia en el campo del desarrollo frontend, he
            perfeccionado mis habilidades en JavaScript, TypeScript, React,
            Angular y Flutter, equipándome con un arsenal de herramientas tan
            indispensable como mi cafetera diaria.
          </Description>
          <a className="mt-4 inline-block bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors pointer-events-auto z-10">
            Revisemos juntos...
          </a>
        </div>
      </div>
    </section>
  );
}
export default OverlayTechnology;
