import { useEffect, useState } from "react";
import "./App.css";
import { Card, Deck } from "./models/models";

let newDeck: Deck;

function App() {
  const [card, setCard] = useState<Card | null>(null);
  const [betAmount, setBetAmount] = useState<number>(0);

  useEffect(() => {
    newDeck = new Deck();
    newDeck.shuffle();
  }, []);

  const drawCard = () => {
    let drawnCard = newDeck.draw();
    if (drawnCard) {
      setCard(drawnCard);
      console.log(drawnCard.name);
    } else {
      console.log("No more cards in the deck");
    }
  };

  const raiseBet = (amount: number) => {
    setBetAmount((prevBetAmount) => (prevBetAmount += amount));
    console.log(betAmount);
  };

  return (
    <>
      <div className="card">
        <h2>Deck {newDeck ? newDeck.getLenght() : 52}</h2>
        {card && (
          <div>
            <h3>Drawn Card</h3>
            <img src={`./${card.name}.svg`} alt={card.name} />
          </div>
        )}
      </div>
      <button onClick={drawCard}>Draw Card</button>
      <div className="fixed bottom-4 left-4 space-x-2">
        <div className="vertical ">
          <p className="left-1">BET: {betAmount ? betAmount : 0}</p>
          <div className="space-x-2">
            <button
              onClick={() => raiseBet(1)}
              className="p-2 bg-white text-black rounded"
            >
              1
            </button>
            <button
              onClick={() => raiseBet(5)}
              className="p-2 bg-red-500 text-white rounded"
            >
              5
            </button>
            <button
              onClick={() => raiseBet(10)}
              className="p-2 bg-blue-500 text-white rounded"
            >
              10
            </button>
            <button
              onClick={() => raiseBet(25)}
              className="p-2 bg-green-500 text-white rounded"
            >
              25
            </button>
            <button
              onClick={() => raiseBet(100)}
              className="p-2 bg-black text-white rounded"
            >
              100
            </button>
            <button
              onClick={() => raiseBet(500)}
              className="p-2 bg-purple-500 text-white rounded"
            >
              500
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
