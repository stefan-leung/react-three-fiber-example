import React, { useState, useRef } from "react";
import { Canvas } from "react-three-fiber";
import { Text, Stars } from "drei";
import { Physics, useBox, usePlane } from "use-cannon";
import Sparks from './sparks'
import "./styles.css";

function randomNumber(min, max) { 
  return Math.floor(Math.random() * (max - min) + min);
} 

const deep_pink = '#ed529e'
const royal_black = '#08020e'
const blanched_almond = '#ffa600'
const logo_purple = '#522a66'

function Box() {
  const [ref, api] = useBox(() => ({
    mass: 30,
    position: [0, 8, -2],
    rotation: [0, 45, 0]
  }));
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  return (
    <mesh 
      onClick={() => {
        api.velocity.set(randomNumber(-10, 10), randomNumber(-10, 10), randomNumber(-10, 10))
        setActive(!active)
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      ref={ref} position={[1, 1, 0]} castShadow receiveShadow
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={hovered ? 'cyan' : deep_pink} />
    </mesh>
  )
};

function Box2() {
  const [ref, api] = useBox(() => ({
    mass: 30,
    position: [-0.8, 10, -1],
    rotation: [0, 5, 0]
  }));
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  return (
    <mesh 
      onClick={() => {
        api.velocity.set(randomNumber(-10, 10), randomNumber(-10, 10), randomNumber(-10, 10))
        setActive(!active)
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      ref={ref} position={[1, 1, 0]} castShadow receiveShadow
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={hovered ? 'cyan' : logo_purple} />
    </mesh>
  )
};

function Box3() {
  const [ref, api] = useBox(() => ({
    mass: 30,
    position: [-0.5, 12, -1.35],
    rotation: [0, 10, 0]
  }));
  const [hovered, setHover] = useState(false)
  const [active, setActive] = useState(false)
  return (
    <mesh 
      onClick={() => {
        api.velocity.set(randomNumber(-10, 10), randomNumber(-10, 10), randomNumber(-10, 10))
        setActive(!active)
      }}
      onPointerOver={(event) => setHover(true)}
      onPointerOut={(event) => setHover(false)}
      ref={ref} position={[1, 1, 0]} castShadow receiveShadow
    >
      <boxBufferGeometry attach="geometry" />
      <meshStandardMaterial attach="material" color={hovered ? 'cyan' : blanched_almond} />
    </mesh>
  )
};

function Plane() {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, -2, 0]
  }));

  return (
    <mesh ref={ref} position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <planeBufferGeometry attach="geometry" args={[100, 100]} />
      <meshLambertMaterial attach="material" color={royal_black} />
    </mesh>
  )
}

export default function App() {
  const mouse = useRef([0, 0])

  return (
    <Canvas shadowMap linear
      dpr={[1, 2]}
      camera={{
        position: [0, 3, 10],
        zoom: 2
      }}
    >
      <Stars />
      <Sparks count={10} mouse={mouse} colors={['#A2CCB6', '#FCEEB5', '#EE786E', '#e0feff', 'lightpink', 'lightblue']} />

      <spotLight position={[10, 15,10]} angle={0.3} castShadow />
      <fog attach="fog" args={[royal_black, 0, 40]} />
      <ambientLight intensity={0.5} />

      <Physics>
        <Box castShadow />
        <Box2 castShadow />
        <Box3 castShadow />
        <Plane receiveShadow />
      </Physics>

      <Text
        color="#ffffffff"
        fontSize={1}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.2}
        textAlign={'left'}
        font="https://allfont.net/allfont.css?fonts=montserrat-hairline"
        anchorX="back" anchorY="top" anchorZ="middle"
        castShadow
      >
        ANZEN
      </Text>
      
    </Canvas>
  );
}
