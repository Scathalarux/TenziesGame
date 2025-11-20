import type { ReactNode } from "react";
import "./Die.css";

type DieProps = {
  id: string;
  value: ReactNode;
  isHeld: boolean;
  hold: (id: string) => void;
};

export function Die({ id, value, isHeld, hold }: DieProps) {
  const handleClick = () => {
    hold(id);
  };

  return (
    <button
      id={id}
      className={isHeld ? "isHeld" : ""}
      onClick={handleClick}
      aria-pressed={isHeld}
      aria-label={`die with value ${value}, ${isHeld ? "held" : "not held"}`}
    >
      {value}
    </button>
  );
}
