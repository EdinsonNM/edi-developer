import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { innerCircleIcons, middleCircleIcons, outerCircleIcons } from "./icons-config";
import { useResponsiveRadius } from "@/hooks/use-responsive-radius";

export const OrbitingIcons = () => {
  const innerRadius = useResponsiveRadius({
    base: 90,
    md: 180,
    lg: 200
  });

  const middleRadius = useResponsiveRadius({
    base: 130,
    md: 250,
    lg: 320
  });

  const outerRadius = useResponsiveRadius({
    base: 160,
    md: 260,
    lg: 400
  });

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-30">
      <OrbitingCircles iconSize={40} radius={innerRadius}>
        {innerCircleIcons.map(({ Icon, color }, index) => (
          <Icon key={index} size={40} className={color} />
        ))}
      </OrbitingCircles>
      
      <OrbitingCircles 
        iconSize={40} 
        radius={middleRadius}
        reverse 
        className="opacity-80"
      >
        {middleCircleIcons.map(({ Icon, color }, index) => (
          <Icon key={index} size={40} className={color} />
        ))}
      </OrbitingCircles>
      
      <OrbitingCircles 
        iconSize={40} 
        radius={outerRadius}
        className="opacity-30"
      >
        {outerCircleIcons.map(({ Icon, color }, index) => (
          <Icon key={index} size={40} className={color} />
        ))}
      </OrbitingCircles>
    </div>
  );
};
