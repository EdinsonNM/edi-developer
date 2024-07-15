import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";

type Props = {
  layout: string;
  onClose: () => void;
};
function Companies(props: Props) {
  const companies = [
    {
      title: "Tekton",
      url: "./assets/images/companies/tekton.jpeg",
      color: "#0c4752",
    },
    {
      title: "Hatun",
      url: "./assets/images/companies/hatun.png",
      color: "#fff",
    },
    {
      title: "Minedu",
      url: "./assets/images/companies/minedu.png",
      color: "#fff",
    },
    {
      title: "Pacifico",
      url: "./assets/images/companies/pacifico.jpg",
      color: "#fff",
    },
    {
      title: "Everis",
      url: "./assets/images/companies/everis.jpg",
      color: "#fff",
    },
    {
      title: "Excelsoftsource",
      url: "./assets/images/companies/excel.jpeg",
      color: "#1f3759",
    },
    {
      title: "Belatrix",
      url: "./assets/images/companies/belatrix.png",
      color: "#fff",
    },
    {
      title: "Globant",
      url: "./assets/images/companies/globant.png",
      color: "#fff",
    },
  ];
  return (
    <motion.div
      layoutId={props.layout}
      className="fixed flex flex-col left-0 top-0 right-0 bottom-0 z-20 bg-opacity-15 bg-black text-white justify-center items-center  backdrop-blur-md pointer-events-auto"
    >
      <div className="max-w-5xl relative p-8 w-full">
        <div className="text-start mb-10">
          <motion.h2 className="text-2xl md:text-4xl text-white font-bold">
            Confian en mi trabajo{" "}
          </motion.h2>
          <motion.h5 className="text-cyan-500">
            Conoce mis ultimos proyectos destacados
          </motion.h5>
        </div>

        <motion.button
          className="bg-[#f22929] rounded-full w-10 h-10 flex justify-center items-center text-white cursor-pointer absolute top-4 right-4"
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={props.onClose}
        >
          <IoClose className="text-2xl" />
        </motion.button>

        <motion.div className={`flex-wrap grid grid-cols-12 gap-8`}>
          {companies.map((item) => (
            <motion.button
              className="col-span-6 md:col-span-3 "
              whileHover={{
                scale: 1.1,
                transition: { duration: 0.3 },
              }}
            >
              <div
                className={`mx-auto bg-[${item.color}] rounded-lg shadow-md flex flex-col justify-center items-center overflow-hidden w-50 h-28 bg-no-repeat bg-contain bg-center relative`}
                style={{
                  backgroundImage: `url(${item.url})`,
                  backgroundColor: item.color,
                }}
              ></div>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
export default Companies;
