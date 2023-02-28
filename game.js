const cardSuits = ['Diamond', 'Clubs', 'Spades', 'Hearts'];
const cardValues = [];
const cardDeck = [];
let isDeckGenerated = false;

const player = {
  hand: [],
  totalScore: 0,
  isFirstDraw: true,
};

const dealer = {
  hand: [],
  totalScore: 0,
  isFirstDraw: true,
};

const generateCardValues = () => {
  for (let i = 1; i <= 13; i++) {
    if (i === 1) {
      cardValues.push('Ace');
    }
    if (i > 1 && i < 11) {
      cardValues.push(i);
    }
    if (i === 11) {
      cardValues.push('Jack');
    }
    if (i === 12) {
      cardValues.push('Queen');
    }
    if (i === 13) {
      cardValues.push('King');
    }
  }
};

const generateDeck = () => {
  cardSuits.forEach((suit) => {
    cardValues.forEach((card) => {
      cardDeck.push({ suit, value: card });
    });
  });
};

const drawCard = (player) => {
  if (!player.isFirstDraw) {
    player.hand.push(generateRandomCard());
    addScore(player);
  }
  if (player.isFirstDraw) {
    player.hand.push(generateRandomCard());
    player.hand.push(generateRandomCard());
    addScore(player);
    player.isFirstDraw = false;
  }
};

const addScore = (player) => {
  const { hand } = player;
  const score = hand.reduce((acc, card) => {
    if (card.value === 'Ace') {
      return acc + 1;
    }

    if (
      card.value === 'Jack' ||
      card.value === 'Queen' ||
      card.value === 'King'
    ) {
      return acc + 10;
    }
    return acc + card.value;
  }, 0);
  player.totalScore = score;
};

const checkScore = (playerObj) => {
  const { totalScore } = playerObj;
  if (playerObj === dealer) {
    if (totalScore === 21) {
      console.log(
        `You lose! Your final score was: ${player.totalScore} while the dealer had ${totalScore}`
      );
      return true;
    }

    if (totalScore > 21) {
      console.log(
        `You win! Your final score was: ${player.totalScore} while the dealer had ${totalScore}`
      );
      return true;
    }

    return false;
  }
  if (playerObj === player) {
    if (totalScore === 21) {
      console.log(
        `You win! Your final score was: ${totalScore} while the dealer had ${dealer.totalScore}`
      );
      return true;
    }

    if (totalScore > 21) {
      console.log(
        `You losts! Your final score was: ${totalScore} while the dealer had ${dealer.totalScore}`
      );
      return true;
    }

    return false;
  }
};

const removeCardFromDeck = (drawnCard) => {
  cardDeck.forEach((card, i, arr) => {
    if (drawnCard.suit === card.suit && drawnCard.value === card.value) {
      arr.splice(i, 1);
    }
  });
};

const generateRandomCard = () => {
  const card = cardDeck[Math.floor(Math.random() * cardDeck.length)];
  removeCardFromDeck(card);
  return card;
};

while (true) {
  if (!isDeckGenerated) {
    generateCardValues();
    generateDeck();
    isDeckGenerated = true;

    drawCard(player);
    drawCard(dealer);
    console.log(`Starting player hand:`, player.hand);
    console.log(`Starting player score:`, player.totalScore);
    console.log(`Starting dealer hand:`, dealer.hand);
    console.log(`Starting dealer score:`, dealer.totalScore);
  }

  if (!checkScore(player)) {
    drawCard(player);
  }

  if (checkScore(player)) {
    console.log(`Ending hands:`, player, dealer);
    break;
  }

  if (!checkScore(dealer)) {
    drawCard(dealer);
  }

  if (checkScore(dealer)) {
    console.log(`Ending hands:`, player, dealer);
    break;
  }
}
