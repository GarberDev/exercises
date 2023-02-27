//When the form is submitted, capture the values for each of the inputs and append them to the DOM along with a button to remove each title and rating from the DOM.

$(document).ready(function () {
  $("#movieinfo").submit(function (event) {
    event.preventDefault(); // prevent the form from submitting normally

    // get the values of the input fields
    var title = $("#mtitle").val();
    var rating = $(".rating").val();

    // create a new list item with the input values and a remove button
    var listItem = $("<li>").text(title + " - " + rating);
    var removeButton = $("<button>").text("Remove").addClass("remove");
    listItem.append(removeButton);

    // add the new list item to the movie list
    $("#movies").append(listItem);

    // clear the input fields
    $("#mtitle").val("");
    $(".rating").val("");
  });

  // remove a movie when the remove button is clicked
  $("#movies").on("click", ".remove", function () {
    $(this).parent().remove();
  });
});
