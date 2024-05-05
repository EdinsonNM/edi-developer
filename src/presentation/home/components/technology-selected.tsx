import { GroupProps } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
type Props = {
  path: string;
  name: string;
};

const TechnologySelected = ({
  path,

  ...meshProps
}: Props & GroupProps) => {
  const gltf = useGLTF(`./${path}`);

  return (
    <group {...meshProps}>
      <primitive object={gltf.scene.clone()} />;
    </group>
  );
};

export default TechnologySelected;
