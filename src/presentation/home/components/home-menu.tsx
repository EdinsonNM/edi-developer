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
    <div className="fixed bottom-0 w-full h-20 left-0 flex flex-col justify-center items-center">
      <nav className="w-full flex gap-4 justify-center items-center">
        <ul className="flex flex-row mx-auto gap-4">
          {navigation.map((item) => (
            <li key={item.url} className="">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "p-3 rounded-md hover:bg-orange-200 hover:text-black hover:bg-opacity-50 bg-orange-500 font-bold"
                    : "bg-orange-50 bg-opacity-25 p-3 rounded-md hover:bg-orange-300 hover:text-black hover:bg-opacity-80 text-black font-bold"
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
