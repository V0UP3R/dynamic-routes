"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Board = styled.div`
  display: grid;
  grid-template-columns: repeat(30, 20px);
  grid-template-rows: repeat(30, 20px);
  gap: 2px;
  background-color: rgba(51, 51, 51, 0.8); /* Adiciona opacidade */
  border: none;
  width: max-content;
  margin: 0 auto;
  position: relative;
  border-radius: 10px;
  cursor: none; /* Oculta o cursor */
`;

const Cell = styled.div<{ $isSnake?: boolean; $isFood?: boolean }>`
  width: 20px;
  height: 20px;
  background-color: ${({ $isSnake, $isFood }) =>
    $isSnake ? "green" : $isFood ? "red" : "#94a3b8"};
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  font-size: 3rem;
  z-index: 10;
`;

const Score = styled.h2`
  color: white;
  text-align: center;
`;

interface Position {
  x: number;
  y: number;
}

const Game: React.FC = () => {
  const [snake, setSnake] = useState<Position[]>([{ x: 15, y: 15 }]);
  const [food, setFood] = useState<Position>({ x: 10, y: 10 });
  const [direction, setDirection] = useState<Position>({ x: 0, y: -1 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const boardSize = 30;

  const generateFood = () => {
    const newX = Math.floor(Math.random() * boardSize);
    const newY = Math.floor(Math.random() * boardSize);
    setFood({ x: newX, y: newY });
  };

  const moveSnake = () => {
    const newSnake = [...snake];
    const head = {
      x: newSnake[0].x + direction.x,
      y: newSnake[0].y + direction.y,
    };

    if (
      head.x < 0 ||
      head.x >= boardSize ||
      head.y < 0 ||
      head.y >= boardSize
    ) {
      setGameOver(true);
      return;
    }

    if (
      newSnake.some((segment) => segment.x === head.x && segment.y === head.y)
    ) {
      setGameOver(true);
      return;
    }

    newSnake.unshift(head);
    if (head.x === food.x && head.y === food.y) {
      setScore(score + 1);
      generateFood();
    } else {
      newSnake.pop();
    }

    setSnake(newSnake);
  };

  const changeDirection = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (gameOver) return;

    switch (e.key) {
      case "ArrowUp":
        if (direction.y === 0) setDirection({ x: 0, y: -1 });
        break;
      case "ArrowDown":
        if (direction.y === 0) setDirection({ x: 0, y: 1 });
        break;
      case "ArrowLeft":
        if (direction.x === 0) setDirection({ x: -1, y: 0 });
        break;
      case "ArrowRight":
        if (direction.x === 0) setDirection({ x: 1, y: 0 });
        break;
      default:
        break;
    }
  };

  const restartGame = () => {
    setSnake([{ x: 15, y: 15 }]);
    setFood({ x: 10, y: 10 });
    setDirection({ x: 0, y: -1 });
    setScore(0);
    setGameOver(false);
  };

  const handleMouseEnter = () => {
    const gameContainer = document.querySelector(
      ".game-container"
    ) as HTMLElement;
    gameContainer?.focus();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (!gameOver) {
        moveSnake();
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [snake, direction, gameOver]);

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-zinc-900">
      <section className="bg-gray-100 w-1/3 h-full flex flex-col items-center justify-center gap-10">
        <Image width={300} height={300} src="/logo.svg" alt="logo" />
        <Link href={"/dashboard"}>
          <button className="bg-gray-900 p-3 min-w-44 rounded-xl shadow-2xl text-gray-100 font-normal text-base m-4 hover:bg-gray-700 duration-500">
            Playground +
          </button>
        </Link>
      </section>
      <section className="bg-zinc-900 w-2/3 h-full flex flex-col items-center justify-center">
        <h1 style={{ textAlign: "center", color: "white" }}>Snake Game</h1>
        <Score>Score: {score}</Score>
        <div
          tabIndex={0}
          onKeyDown={changeDirection}
          style={{ outline: "none" }}
          className="game-container"
          onMouseEnter={handleMouseEnter}
        >
          <Board>
            {Array.from({ length: boardSize * boardSize }, (_, index) => {
              const x = index % boardSize;
              const y = Math.floor(index / boardSize);
              const isSnake = snake.some(
                (segment) => segment.x === x && segment.y === y
              );
              const isFood = food.x === x && food.y === y;

              return <Cell key={index} $isSnake={isSnake} $isFood={isFood} />;
            })}
            {gameOver && <Overlay>Game Over! Press F5 to restart</Overlay>}
          </Board>
        </div>
        <div>
          <button
            className="bg-indigo-800 p-3 min-w-44 rounded-xl shadow-2xl text-gray-100 font-normal text-base m-4"
            onClick={restartGame}
          >
            Reiniciar Jogo
          </button>
        </div>
      </section>
    </div>
  );
};

export default Game;
