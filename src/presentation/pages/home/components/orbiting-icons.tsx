import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { innerCircleIcons, middleCircleIcons, outerCircleIcons } from "./icons-config";
import { useResponsiveRadius } from "@/hooks/use-responsive-radius";

export const OrbitingIcons = () => {
  const innerRadius = useResponsiveRadius({
    base: 220,
    md: 320,
    lg: 420
  });

  const middleRadius = useResponsiveRadius({
    base: 290,
    md: 390,
    lg: 490
  });

  const outerRadius = useResponsiveRadius({
    base: 360,
    md: 460,
    lg: 560
  });

  return (
    <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
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
