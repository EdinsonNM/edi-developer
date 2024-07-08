import Description from "@design/atoms/page/description";
import Subtitle from "@design/atoms/page/subtitle";
import Title from "@design/atoms/page/title";

function OverlayStore() {
  return (
    <section
      className="overlay-home relative w-screen h-screen flex flex-col items-center justify-start md:justify-center overflow-hidden bg-black bg-opacity-75"
      style={{ pointerEvents: "auto" }}
    >
      <div className="w-full max-w-[1024px] p-8 md:p-5 flex flex-col items-center md:items-start justify-start text-start gap-4 mt-8 md:mt-0">
        <Title>
          Gadgets y Más para <br />
          <span className="text-violet-500">Programadores</span>
        </Title>
        <Subtitle>
          "Todo lo que un Desarrollador
          <br />
          podría Desear"
        </Subtitle>
        <Description>
          Descubre "Only for Devs", tu destino exclusivo para encontrar gadgets,
          funkos y ropa especialmente seleccionados para programadores. En
          nuestro espacio, cada producto está pensado para mejorar tu día a día,
          desde accesorios útiles hasta artículos de colección que expresan tu
          pasión por la programación. Únete a nuestra comunidad y disfruta de
          una selección que solo un verdadero desarrollador puede apreciar, todo
          en un solo lugar diseñado para inspirar, motivar y equipar a los
          entusiastas de la tecnología como tú.
        </Description>
        <a className="mt-4 inline-block bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition-colors pointer-events-auto z-10">
          Conoce nuestra tienda
        </a>
      </div>
    </section>
  );
}
export default OverlayStore;
