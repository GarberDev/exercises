console.log("Let's get this party started!");

const form = document.getElementById("giphy-form");
const input = document.getElementById("gif-search");
const results = document.getElementById("giphyresults");

let responseData;

const creategifDiv = function () {
  const randomIndex = Math.floor(Math.random() * responseData.length);

  const gifdiv = document.createElement("div");
  gifdiv.className = "gif";
  results.appendChild(gifdiv);

  const imageurl = responseData[randomIndex].images.original.url;
  const gifimg = document.createElement("img");
  gifimg.className = "img";
  gifimg.setAttribute("src", imageurl);

  gifdiv.appendChild(gifimg);
};

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = input.value;
  await axios
    .get(
      `http://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=MhAodEJIJxQMxW9XqxKjyXfNYdLoOIym`
    )
    .then((response) => {
      responseData = response.data.data;
      console.log(responseData);
      creategifDiv();
    })
    .catch((error) => {
      console.error(error);
    });
});

const clearButton = document.querySelector('button[type="clear"]');
clearButton.addEventListener("click", function () {
  results.innerHTML = "";
});
