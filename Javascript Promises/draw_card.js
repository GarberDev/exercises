let deckId;
let rotation = 0;

function drawCard() {
  axios
    .get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`)
    .then((response) => {
      const card = response.data.cards[0];

      // display the card image with a rotation
      const img = document.createElement("img");
      img.classList.add("card-img");
      img.style.transform = `rotate(${rotation}deg)`;
      img.src = card.image;

      document.getElementById("card").appendChild(img);

      // adjust rotation for next card
      rotation += 15;
    })
    .catch((error) => {
      console.error(error);
    });
}

window.onload = () => {
  axios
    .get("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((response) => {
      deckId = response.data.deck_id;
      const button = document.getElementById("drawBtn");
      button.onclick = drawCard;
    })
    .catch((error) => {
      console.error(error);
    });
};
