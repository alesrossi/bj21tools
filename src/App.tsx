import { useEffect, useState } from "react";
import "./App.css";
import { Card, Deck } from "./models/models";

let newDeck: Deck;

function App() {
  const [card, setCard] = useState<Card | null>(null);

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
    </>
  );
}

export default App;
