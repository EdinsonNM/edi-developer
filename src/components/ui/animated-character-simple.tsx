import Rive, { Layout, Alignment, Fit } from "@rive-app/react-canvas";

interface AnimatedCharacterSimpleProps {
  className?: string;
}

export default function AnimatedCharacterSimple({
  className = "",
}: AnimatedCharacterSimpleProps) {
  return (
    <div className={`${className} relative w-full h-full`}>
      <Rive
        src="/edidev.riv"
        stateMachines="default"
        layout={
          new Layout({
            fit: Fit.Contain,
            alignment: Alignment.Center,
          })
        }
        className="w-full h-full"
      />
    </div>
  );
}
