"use client";
import Image from "next/image";
import naruto from "@/app/public/naruto.jpg";
import boruto from "@/app/public/boruto.jpg";
import sasuke from "@/app/public/sasuke.jpg";
import kakshi from "@/app/public/kakshi.jpg";
import chiso from "@/app/public/chiso.jpg";
import gara from "@/app/public/gara.jpg";
import itachi from "@/app/public/itachi.jpg";
import jiraya from "@/app/public/jiraya.jpg";

import React, { useEffect, useState } from "react";
const generateDeck = () => {
  const memoryCard = [
    naruto.src,
    boruto.src,
    sasuke.src,
    kakshi.src,
    chiso.src,
    gara.src,
    itachi.src,
    jiraya.src,
  ];
  const deck = [...memoryCard, ...memoryCard];
  return deck.sort(() => Math.random() - 0.5);
};
const MemoryGame = () => {
  const [cards, setCards] = useState<string[]>(generateDeck());
  const [flipped, setFlipped] = useState<number[]>([]);
  const [solved, setSolved] = useState<number[]>([]);
  useEffect(() => {
    const checkForMatch = () => {
      const [first, second] = flipped;
      if (cards[first] == cards[second]) {
        setSolved([...solved, ...flipped]);
      }
      setFlipped([]);
    };

    if (flipped.length === 2) {
      setTimeout(() => {
        checkForMatch();
      }, 1000);
    }
  }, [cards, flipped, solved]);

  const handleClick = (index: number) => {
    if (!flipped.includes(index) && flipped.length < 2) {
      setFlipped([...flipped, index]);
    }
  };

  const gameOver = solved.length==cards.length;
  const resetGame = ()=>{
    setCards(generateDeck());
    setFlipped([]);
    setSolved([])
  }
  return (
    <div className="text-center p-1">
      <h1 className="text-2xl font-semibold">Memory Game</h1>
      {gameOver && (<h2 className="p-5 font-semibold text-xl text-green-500">You Won!</h2>)}
      <div className="grid grid-cols-4 gap-5 mt-5">
        {cards.map((card, index) => (
          <div
            onClick={() => handleClick(index)}
            className={`bg-slate-200  flex justify-center items-center  text-4xl font-bold text-black w-28 h-28 transform cursor-pointer transition-transform duration-300 ${solved.includes(index) || flipped.includes(index) ?'rotate-180':""} `}
            key={index}
          >
            {solved.includes(index) || flipped.includes(index) ? (
              <Image className="rotate-180" src={card} fill alt={card} />
            ) : (
              "?"
            )}
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="flex p-5 bg-slate-500 rounded-md mt-5" >Restart</button>
    </div>
  );
};

export default MemoryGame;
