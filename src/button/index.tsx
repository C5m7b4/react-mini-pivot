import React, { useState } from "react";

export const Button = () => {
  const [count, setCount] = useState(0);
  return (
    <button
      className="bg-blue-500 text-white"
      onClick={() => {
        switch (count) {
          case 0:
            alert("Oh yea baby! Click me again!");
            setCount(count + 1);
            break;
          case 1:
            alert("You click me soooo good!");
            setCount(count + 1);
            break;
          case 2:
            alert("Woah you're getting a little too spicy with me!");
            setCount(count + 1);
            break;
          default:
            alert(`We're done. You clicked me too hard.`);
            break;
        }
      }}
    >
      {count < 3 ? "Click me, baby!" : "😒😒😒"}
    </button>
  );
};
