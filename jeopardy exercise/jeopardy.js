// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]

document.addEventListener("DOMContentLoaded", async function () {
  await setupAndStart();
});

let categories = [];

/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */
const NUM_CATEGORIES = 6;
const API_ENDPOINT = "http://jservice.io/api/categories?count=100";

async function getCategoryIds() {
  try {
    const response = await axios.get(API_ENDPOINT);
    // const categories = response.data;
    const categoryIds = response.data.map((cat) => cat.id);

    const randomCategoryIds = [];
    //pick random num_categories from random category ids
    while (randomCategoryIds.length < NUM_CATEGORIES) {
      const randomIndex = Math.floor(Math.random() * categoryIds.length);
      const randomCategoryId = categoryIds[randomIndex];
      if (!randomCategoryIds.includes(randomCategoryId)) {
        randomCategoryIds.push(randomCategoryId);
      }
    }
    return randomCategoryIds;
  } catch (err) {
    console.error(err);
  }
}
/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const response = await axios.get(
    `http://jservice.io/api/category?id=${catId}`
  );

  const category = response.data;
  const clues = category.clues.map((clue) => ({
    question: clue.question,
    answer: clue.answer,
    showing: null,
  }));
  return { title: category.title, clues };
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */
const NUM_QUESTIONS_PER_CAT = 5;

async function fillTable() {
  const $table = $("#jeopardy");
  const $thead = $("<thead>").appendTo($table);
  const $headerRow = $("<tr>").appendTo($thead);

  ///add category titles to header row
  for (let category of categories) {
    $("<th>").text(category.title).appendTo($headerRow);
  }

  const $tbody = $("<tbody>").appendTo($table);

  //add rows for each question

  for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
    const $row = $("<tr>").appendTo($tbody);

    for (let category of categories) {
      const $cell = $("<td>").addClass("clue").appendTo($row);

      const clue = category.clues[i];
      $cell.attr("data-question", clue.question);
      $cell.attr("data-answer", clue.answer);

      $("<span>").addClass("question-mark").text("?").appendTo($cell);
    }
  }

  //ad click listener to each cell
  $(".clue").on("click", handleClick);
  // $(".clue").textContent.on("click", handleClick);

  // $(".clue").attr().on("click", handleClick);
  // $(".question-mark").on("click", handleClick);
  //get data for each category and fill in clues

  // consoleLogevt(evt) {
  //   console.log(evt);
  // }

  for (let category of categories) {
    const categoryId = category.id;
    const catData = await getCategory(categoryId);

    for (let i = 0; i < NUM_QUESTIONS_PER_CAT; i++) {
      const clue = catData.clues[i];

      const $cell = $(
        $(`#jeopardy tbody tr:nth-child(${i + 1}) td`)[category.index]
      );
      //replace question mark with question
      $cell.attr("data-question", clue.data);
      $cell.attr("data-answer", clue.answer);
      $cell.find(".question-mark").text(clue.data);
      clue.showing = "question";
    }
  }
}
/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {
  const cell = evt.target;

  // console.log(cell);
  const $cell = $(cell);
  const showing = $cell.data("showing");

  const $span = $("span.question-mark");

  console.log($cell.data("showing"));

  if (showing === undefined) {
    $cell.data("showing", "question");
    $cell.find(".question-mark").text($cell.data("question"));
    $span.data("showing", "question");
    $span.find(".question-mark").text($span.data("question"));
  } else if (showing === "question") {
    $cell.data("showing", "answer");
    $cell.find(".question-mark").text($cell.data("answer"));
  } else if (showing === "answer") {
  }
}
/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
  $("#restart").text("Loading...").prop("disabled", true);
  $("#jeopardy")
    .empty()
    .append(
      '<tr><td colspan="' + NUM_CATEGORIES
      // +
      // '"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></td></tr>'
    );
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $("#restart").text("Restart").prop("disabled", false);
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {
  showLoadingView();
  try {
    const categoryIds = await getCategoryIds();
    const categoriesData = await Promise.all(
      categoryIds.map((catId) => getCategory(catId))
    );
    categories = categoriesData.map((cat) => ({
      title: cat.title,
      clues: cat.clues.filter((clue) => clue.question && clue.answer),
    }));
    fillTable();
  } catch (error) {
    console.error(error);
    alert("Error: Failed to load game. Please try again.");
  } finally {
    hideLoadingView();
  }
}

/** On click of start / restart button, set up game. */
$(document).ready(function () {
  $("#restart").click(function () {
    setupAndStart();
  });
});
// TODO

// /** On page load, add event handler for clicking clues */
// $("#jeopardy").on("click", "td", handleClick);
// // TODO
// function handleClick(evt) {

//   // Log click location
//   console.log(evt.target);

// }
