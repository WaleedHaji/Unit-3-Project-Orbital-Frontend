import tx1 from "./textures/1.jpg";
import tx2 from "./textures/2.jpg";
import tx3 from "./textures/3.jpg";
import tx4 from "./textures/4.jpg";
import tx5 from "./textures/5.jpg";
import tx6 from "./textures/6.jpg";
import tx7 from "./textures/7.jpg";
import tx8 from "./textures/8.jpg";

const planetData = [
  {
    id: 1,
    name: "Mercury",
    size: 0.2,
    xRadius: 4,
    zRadius: 4,
    speed: 0.25,
    offset: 0,
    rotationSpeed: 0.2,
    textureMap: tx3,
    gravity: 3.7,
    orbitalPeriod: 87.97,
    surfaceArea: 74.8
  },
  {
    id: 2,
    name: "Venus",
    size: 0.35,
    xRadius: 5.5,
    zRadius: 5.5,
    speed: 0.25 * (87.97 / 224.7),
    offset: 0,
    rotationSpeed: 0.05,
    textureMap: tx6,
    gravity: 8.87,
    orbitalPeriod: 224.7,
    surfaceArea: 460.2
  },
  {
    id: 3,
    name: "Earth",
    size: 0.38,
    xRadius: 7,
    zRadius: 7,
    speed: 0.25 * (87.97 / 365.25),
    offset: 0,
    rotationSpeed: 0.5,
    textureMap: tx5,
    gravity: 9.81,
    orbitalPeriod: 365.25,
    surfaceArea: 510.1
  },
  {
    id: 4,
    name: "Mars",
    size: 0.28,
    xRadius: 9,
    zRadius: 9,
    speed: 0.25 * (87.97 / 687),
    offset: 0,
    rotationSpeed: 0.48,
    textureMap: tx2,
    gravity: 3.71,
    orbitalPeriod: 687,
    surfaceArea: 144.8
  },
  {
    id: 5,
    name: "Jupiter",
    size: 1.1,
    xRadius: 13,
    zRadius: 13,
    speed: 0.25 * (87.97 / 4332.6),
    offset: 4.80,
    rotationSpeed: 1.2,
    textureMap: tx1,
    gravity: 24.79,
    orbitalPeriod: 4332.6,
    surfaceArea: 61418
  },
  {
    id: 6,
    name: "Saturn",
    size: 0.95,
    xRadius: 17,
    zRadius: 17,
    speed: 0.25 * (87.97 / 10759),
    offset: 3.23,
    rotationSpeed: 1.0,
    textureMap: tx4,
    gravity: 10.44,
    orbitalPeriod: 10759,
    surfaceArea: 42700
  },
  {
    id: 7,
    name: "Uranus",
    size: 0.65,
    xRadius: 21,
    zRadius: 21,
    speed: 0.25 * (87.97 / 30687),
    offset: 2.00,
    rotationSpeed: 0.7,
    textureMap: tx7,
    gravity: 8.69,
    orbitalPeriod: 30687,
    surfaceArea: 8083
  },
  {
    id: 8,
    name: "Neptune",
    size: 0.63,
    xRadius: 25,
    zRadius: 25,
    speed: 0.25 * (87.97 / 60190),
    offset: 0,
    rotationSpeed: 0.65,
    textureMap: tx8,
    gravity: 11.15,
    orbitalPeriod: 60190,
    surfaceArea: 7618
  }
];

export default planetData;
