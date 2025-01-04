export class Card {
  name: string;
  value: number;
  constructor(name: string, value: number) {
    this.name = name;
    this.value = value;
  }
}

export class Deck {
  private cards: Array<Card> = [];

  constructor() {
    let suits = ["C", "D", "H", "S"];
    let ranks = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

    for (let i = 0; i < 52; i++) {
      if (ranks[i % 13] > 10) {
        this.cards.push(new Card(suits[i % 4] + ranks[i % 13], 10));
      } else {
        this.cards.push(new Card(suits[i % 4] + ranks[i % 13], ranks[i % 13]));
      }
    }
  }

  shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(): Card | undefined {
    return this.cards.pop();
  }

  getLenght(): number {
    return this.cards.length;
  }
}
