import Button from "@design/atoms/button/button";
import Description from "@design/atoms/page/description";
import Subtitle from "@design/atoms/page/subtitle";
import Title from "@design/atoms/page/title";

function Store() {
  return (
    <section
      className="overlay-home relative w-screen h-screen flex flex-col items-center justify-center md:justify-center overflow-hidden bg-black bg-opacity-45"
      style={{ pointerEvents: "auto" }}
    >
      <div className="w-full max-w-[1024px] p-8 md:p-5 flex flex-col items-center md:items-start justify-start text-start gap-4 mt-8 md:mt-0">
        <Title>
          Gadgets y Más para <br />
          <span className="text-violet-500">Programadores</span>
        </Title>
        <Subtitle>"Todo lo que un Desarrollador podría Desear"</Subtitle>
        <Description>
          Descubre "Only for Devs", tu destino exclusivo para encontrar gadgets,
          funkos y ropa especialmente seleccionados para programadores.
        </Description>
        <Button>Muy pronto...</Button>
      </div>
    </section>
  );
}
export default Store;
