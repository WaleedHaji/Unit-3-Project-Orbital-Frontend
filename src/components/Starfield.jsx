
import { useEffect, useState } from "react";
import "./Starfield.css";

function Starfield() {
  const [stars, setStars] = useState([]);
  const [shootingStars, setShootingStars] = useState([]);

  useEffect(() => {
    const newStars = Array.from({ length: 120 }, (_, index) => ({
      id: index,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 5,
    }));

    setStars(newStars);

    let shootingStarId = 0;

    const interval = setInterval(() => {
      const id = shootingStarId++;

      setShootingStars([
        {
          id,
          left: Math.random() * 75 + 20,
          top: Math.random() * 45 + 5,
        },
      ]);

      setTimeout(() => {
        setShootingStars((current) =>
          current.filter((star) => star.id !== id)
        );
      }, 1600);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="starfield">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            animationDuration: `${star.duration}s`,
            animationDelay: `${star.delay}s`,
          }}
        />
      ))}

      {shootingStars.map((star) => (
        <span
          key={star.id}
          className="shooting-star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
          }}
        />
      ))}
    </div>
  );
}

export default Starfield;
