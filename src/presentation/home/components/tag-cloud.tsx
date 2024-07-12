import { useEffect, useRef } from "react";
import TagCloud, { TagCloudOptions } from "TagCloud";
import "./tag-cloud.css";
import { useMobile } from "@core/utils/is-mobile";
type Props = {
  tags: string[];
};
function TagCloudUI({ tags }: Props) {
  const { isMobile } = useMobile();
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const options: TagCloudOptions = {
      radius: isMobile ? 120 : 180,
      maxSpeed: "normal",
      initSpeed: "normal",
      keep: true,
    };

    TagCloud(ref.current!, tags, options);

    return () => {
      if (ref.current) {
        ref.current!.innerHTML = ""; // Limpiar el contenedor antes de actualizar
      }
    };
  }, [isMobile]);
  return (
    <div className="flex flex-col justify-end items-center text-xs md:text-xl">
      <span className="tagcloud" ref={ref}></span>
    </div>
  );
}
export default TagCloudUI;
