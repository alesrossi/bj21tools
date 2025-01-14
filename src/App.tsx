import { useEffect, useState } from "react";
import { Card, Deck } from "./models/models";
import "./App.css";

// Declare newDeck as a global variable
let newDeck: Deck;

function App() {
  const [betAmount, setBetAmount] = useState<number>(0);
  const [bankroll, setBankroll] = useState<number>(500);
  const [dealerCards, setDealerCards] = useState<Card[]>([]);
  const [playerCards, setPlayerCards] = useState<Card[]>([]);
  const [playerTotal, setPlayerTotal] = useState<number>(0);
  const [dealerTotal, setDealerTotal] = useState<number>(0);

  useEffect(() => {
    // Initialize newDeck when the component mounts
    newDeck = new Deck();
    newDeck.shuffle();
  }, []);

  useEffect(() => {
    // Update totals whenever playerCards or dealerCards change
    const playerTotal = playerCards.reduce((acc, card) => acc + card.value, 0);
    const dealerTotal = dealerCards.reduce((acc, card) => acc + card.value, 0);

    setPlayerTotal(playerTotal);
    setDealerTotal(dealerTotal);
  }, [playerCards, dealerCards]);

  const raiseBet = (amount: number) => {
    setBetAmount((prevBetAmount) => prevBetAmount + amount);
    setBankroll((prevBankroll) => prevBankroll - amount);
  };

  const startRound = () => {
    beginRound();
  };

  function beginRound() {
    // Deal the starting hands
    setPlayerCards([newDeck.draw()!]);
    setDealerCards([newDeck.draw()!]);
    setPlayerCards((prevCards) => [...prevCards, newDeck.draw()!].slice(-5));
    let dealerSecondCard = newDeck.draw()!;
    dealerSecondCard.isFaceUp = false;
    setDealerCards((prevCards) => [...prevCards, dealerSecondCard].slice(-5));
  }

  useEffect(() => {
    // Update totals whenever playerCards or dealerCards change
    checkResult();
  }, [playerTotal, dealerTotal]);

  function checkResult() {
    const playerTotal = playerCards.reduce((acc, card) => acc + card.value, 0);
    const dealerTotal = dealerCards.reduce((acc, card) => acc + card.value, 0);

    if (playerTotal === 21) {
      setBankroll((prevBankroll) => prevBankroll + betAmount * 1.5);
      setBetAmount(0);
    } else if (dealerTotal === 21) {
      setBetAmount(0);
    }
  }

  return (
    <div className="flex flex-col h-screen p-4">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-xl mb-2">Dealer's Zone</h2>
        <div className="flex space-x-2">
          {dealerCards.map((card, index) => (
            <img
              key={index}
              src={card.isFaceUp ? `./${card.name}.svg` : `./back.svg`}
              alt={card.name}
              className="w-24 h-32"
            />
          ))}
        </div>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <button
          className="m-2 p-2 bg-pink-300 text-white rounded"
          onClick={startRound}
        >
          Start
        </button>
        <button className="m-2 p-2 bg-green-500 text-white rounded">
          Stand
        </button>
        <button className="m-2 p-2 bg-red-500 text-white rounded">Hit</button>
        <div>{playerTotal ? playerTotal : 0}</div>
        <div>{dealerTotal ? dealerTotal : 0}</div>
      </div>
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-xl mb-2">Player's Zone</h2>
        <div className="flex space-x-2">
          {playerCards.map((card, index) => (
            <img
              key={index}
              src={card.isFaceUp ? `./${card.name}.svg` : `./card-back.svg`}
              alt={card.name}
              className="w-24 h-32"
            />
          ))}
        </div>
      </div>
      <div className="fixed top-4 right-4 flex flex-col items-center">
        <h2 className="text-xl mb-2">
          Deck Size: {newDeck ? newDeck.getLenght() : 52}
        </h2>
      </div>
      <div className="fixed bottom-4 left-4 space-x-2">
        <div className="vertical space-y-2">
          <p className="left-1">
            BET: {betAmount} BANKROLL: {bankroll}
          </p>
          <div className="space-x-2">
            <button
              onClick={() => raiseBet(1)}
              className="p-2 bg-white text-black rounded"
            >
              1
            </button>
            <button
              onClick={() => raiseBet(5)}
              className="p-2 bg-red-800 text-white rounded"
            >
              5
            </button>
            <button
              onClick={() => raiseBet(10)}
              className="p-2 bg-orange-500 text-white rounded"
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
    </div>
  );
}

export default App;
