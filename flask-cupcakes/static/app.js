async function getCupcakes() {
    const response = await axios.get('/api/cupcakes');
    const cupcakes = response.data.cupcakes;

    for (let cupcake of cupcakes) {
        addCupcakeToPage(cupcake);
    }
}

function addCupcakeToPage(cupcake) {
    const cupcakeLi = $(`<li>
        ${cupcake.flavor} (${cupcake.size}) - Rating: ${cupcake.rating}
        <br>
        <img src="${cupcake.image}" alt="Cupcake Image" width="100">
    </li>`);

    $("#cupcakes-list").append(cupcakeLi);
}

$("#new-cupcake-form").on("submit", async function (event) {
    event.preventDefault();

    const flavor = $("#flavor").val();
    const size = $("#size").val();
    const rating = $("#rating").val();
    const image = $("#image").val();

    const response = await axios.post('/api/cupcakes', {
        flavor,
        size,
        rating,
        image
    });

    const cupcake = response.data.cupcake;
    addCupcakeToPage(cupcake);

    event.target.reset();
});

getCupcakes();
