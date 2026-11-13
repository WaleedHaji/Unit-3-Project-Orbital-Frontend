
import { useEffect, useState } from "react";
import "./Starfield.css";

function Starfield() {
  const [mousePosition, setMousePosition] = useState({
    x: 50,
    y: 50,
  });

  useEffect(() => {
    function handleMouseMove(event) {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    }

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="starfield">
      <div className="stars stars-small"></div>
      <div className="stars stars-medium"></div>
      <div className="stars stars-large"></div>

      <div
        className="starfield-glow"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
        }}
      ></div>
    </div>
  );
}

export default Starfield;
