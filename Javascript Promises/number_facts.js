//1.

const number = 4;
axios
  .get(`http://numbersapi.com/${number}?json`)
  .then((response) => {
    console.log(response.data.text);
  })
  .catch((error) => {
    console.error(error);
  });

//2.

const numbers = [2, 13, 34, 35, 12, 3];
let promises = [];

for (const number of numbers) {
  promises.push(
    axios.get(`http://numbersapi.com/${number}?json`).then((response) => {
      const fact = `Number: ${number}, Fact: ${response.data.text}`;
      console.log(fact);
      return fact;
    })
  );
}

//3.

// const number = 4;
for (let i = 0; i < 4; i++) {
  axios
    .get(`http://numbersapi.com/${number}?json`)
    .then((response) => {
      console.log(response.data.text);
    })
    .catch((error) => {
      console.error(error);
    });
}
