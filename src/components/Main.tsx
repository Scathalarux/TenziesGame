import { useEffect, useRef, useState } from "react";
import { Die } from "./Die";
import { nanoid } from "nanoid";
import "./Main.css";
import ReactConfetti from "react-confetti";

export function Main() {
  const diceNumber = 10;
  const [dice, setDice] = useState(() => generateDice());
  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  const buttonRef = useRef(null);
  useEffect(()=>{
    if(gameWon){
      buttonRef.current.focus();
    }
  },[gameWon]);

  function generateDice() {
    /*const aux = Array(diceNumber);
    for (let i = 0; i < aux.length; i++) {
      const randomNumber = Math.ceil(Math.random() * 6);
      aux[i] = randomNumber;
    }
    return aux;*/

    return new Array(diceNumber).fill(0).map(() => ({
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    }));
  }

  const rollDice = () => {
    if (!gameWon) {
      setDice((oldDice) => {
        return oldDice.map((die) => {
          return die.isHeld
            ? die
            : { ...die, value: Math.ceil(Math.random() * 6) };
        });
      });
    } else {
      setDice(generateDice());
    }
  };

  const diceElements = dice.map((dieObj) => {
    return (
      <Die
        key={dieObj.id}
        id={dieObj.id}
        value={dieObj.value}
        isHeld={dieObj.isHeld}
        hold={hold}
      />
    );
  });

  function hold(idSelected: string) {
    setDice((oldDice) => {
      return oldDice.map((die) => {
        return die.id === idSelected ? { ...die, isHeld: !die.isHeld } : die;
      });
    });
  }

  return (
    <main>
      {gameWon && <ReactConfetti />}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>
            Congratulations, you won the game! Press 'New Game' to start again.
          </p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rools.
      </p>
      <div id="dice-container">{diceElements}</div>
      <button id="roll-dice" ref={buttonRef} onClick={rollDice}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
