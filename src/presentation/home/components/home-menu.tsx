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
    <div className="fixed top-0 w-full h-full left-0">
      <nav className="fixed left-0 bottom-0 h-7 w-full flex gap-4 justify-center items-center">
        <ul className="flex flex-row mx-auto gap-4 mb-20">
          {navigation.map((item) => (
            <li key={item.url} className="">
              <NavLink
                to={item.url}
                className={({ isActive }) =>
                  isActive
                    ? "rounded-md hover:bg-gray-600 bg-cyan-500 p-3"
                    : "rounded-md hover:bg-gray-600 p-3"
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
