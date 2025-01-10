import { PopoverPanel } from "@headlessui/react";
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import LayoutContext from "../layout.context";

type MenuResponsiveProps = {
  items: { url: string; title: string }[];
};
function MenuResponsive({ items }: MenuResponsiveProps) {
  const { isDark } = useContext(LayoutContext);
  return (
    <PopoverPanel
      transition
      anchor="bottom"
      className="w-48 divide-y divide-white/5 rounded-xl bg-white/5 text-sm/6 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 z-20"
    >
      <div className="p-3">
        {items.map((item) => (
          <NavLink
            key={item.url}
            to={item.url}
            className={({ isActive }) =>
              isActive
                ? "block rounded-lg py-2 px-3 transition hover:bg-orange/5 bg-orange-500"
                : "block rounded-lg py-2 px-3 transition hover:bg-orange/5"
            }
          >
            <p
              className={`font-semibold ${
                isDark ? "text-white" : "text-black"
              }`}
            >
              {item.title}
            </p>
          </NavLink>
        ))}
      </div>
    </PopoverPanel>
  );
}
export default MenuResponsive;
