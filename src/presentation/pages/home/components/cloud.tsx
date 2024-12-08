import {  useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Object3D } from "three";
import { useTexture } from "@react-three/drei";

export default function Cloud() {
  const tempObject = useMemo(() => new Object3D(), []);
  const ref = useRef();
  const texture = useTexture('images/smoke.png');

  const particles = useMemo(() => {
    const cloudParticles = [];
    for (let p = 0; p < 50; p++) {
      const positionX = Math.random() * 800 - 400;
      const positionZ = Math.random() * 500 - 500;
      const rotationZ = Math.random() * 2 * Math.PI;

      cloudParticles.push({
        positionX,
        positionZ,
        rotationZ,
      });
    }
    return cloudParticles;
  },[]);

  useFrame((state) => {
    particles.forEach((particle, i) => {
      let { positionX, positionZ, rotationZ } = particle;
      tempObject.position.set(positionX, 0, positionZ);
      tempObject.rotation.set(0, 0, rotationZ);
      tempObject.updateMatrix();
      ref.current.setMatrixAt(i, tempObject.matrix);
    });
    particles.forEach((particle) => (particle.rotationZ -= 0.001));
    ref.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={ref} args={[null, null, 40]}>
      
       <bufferGeometry attach="geometry" >
        
        </bufferGeometry>
       <pointsMaterial
          size={100}
          vertexColors
          map={texture}
          transparent
          sizeAttenuation
          depthWrite={false}
          opacity={0.5}
        />
    </instancedMesh>
  );
}
