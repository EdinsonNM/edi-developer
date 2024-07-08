import { NavLink } from "react-router-dom";
import HomeContext from "../home.context";
import { useContext } from "react";

function HomeMenu() {
  const { changePage } = useContext(HomeContext);
  const navigation = [
    { url: "page1", title: "Inicio" },
    { url: "page2", title: "Tecnología" },
    { url: "page3", title: "Experiencia" },
    { url: "page4", title: "Store" },
  ];

  const navigateTo = (url: string) => () => {
    changePage!(url, true, true);
  };
  return (
    <div className="fixed top-24 md:top-0 left-0 md:left-auto right-0 h-20 flex flex-col justify-center items-center z-50 text-xs md:text-lg">
      <nav className="w-full flex gap-4 justify-center items-center py-4 px-2 md:px-8">
        <ul className="flex flex-row mx-auto gap-0 md:gap-4">
          {navigation.map((item) => (
            <li key={item.url} className="">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "p-3 rounded-md hover:text-orange-200  hover:bg-opacity-50 text-orange-500 font-bold"
                    : "p-3 rounded-md hover:text-orange-300 hover:bg-opacity-80 text-white font-bold"
                }
                onClick={navigateTo(item.url)}
              >
                {item.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
export default HomeMenu;
