import Particles from "@/components/ui/particles";
import { TextAnimate } from "@/components/ui/text-animate";
import useDarkMode from "@presentation/utils/use-dark-mode";

export default function Contact() {
  const isDark = useDarkMode();

  return (
    <div className="w-full h-full bg-gradient-to-b from-black to-blue-900">
      <div className="absolute w-full h-full left-0 top-0">
        <Particles />
      </div>
      <div className="w-full h-full relative flex flex-row justify-center items-center container mx-auto py-10">
        <div>
          <TextAnimate
            animation="slideLeft"
            by="character"
            as={"h1"}
            className={`mb-10 pointer-events-none font-bold text-2xl md:text-6xl text-center ${isDark ? "text-cyan-500" : "text-green-500"}`}
          >
            Contáctame
          </TextAnimate>

          <TextAnimate
            animation="slideRight"
            by="word"
            as={"h2"}
            duration={1500}
            delay={500}
            className={`text-sm md:text-xl text-center max-w-5xl ${isDark ? "text-white" : "text-black"}`}
          >
            Estoy aquí para ayudarte. Por favor, completa el formulario a
            continuación y me pondré en contacto contigo lo antes posible.
          </TextAnimate>

          <form className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px flex flex-col gap-4 text-white">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="sr-only">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Correo Electrónico"
                />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-white rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Mensaje"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Enviar
              </button>
            </div>
          </form>
        </div>
        <div />
      </div>
    </div>
  );
}
