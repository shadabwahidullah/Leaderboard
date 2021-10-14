import _, { result, some } from "lodash"; // eslint-disable-line no-unused-vars
import "./style.css";

const submit = document.getElementById("submit");
const refresh = document.getElementById("refresh");
const scoreslist = document.getElementById("scores");

const baseURL =
  "https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/battlefield/scores/";

function printScores(scores) {
  scoreslist.innerHTML = "";
  scores.forEach((element) => {
    createHTML(element["user"], element["score"]);
  });
}

function createHTML(name, score) {
  const listItem = document.createElement("li");
  listItem.classList.add("p-3", "fw-bold");
  listItem.innerHTML = name + ": " + score;
  scoreslist.appendChild(listItem);
}

async function getScores() {
  const response = await fetch(baseURL).then(function (response) {
    response.text().then(function (text) {
      printScores(JSON.parse(text).result);
    });
  });
}

async function postScore(name, score) {
  let newscore = { user: name, score: score };

  await fetch(baseURL, {
    method: "POST",
    body: JSON.stringify(newscore),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
}

getScores();

refresh.addEventListener("click", getScores);
submit.addEventListener("click", (event) => {
  event.preventDefault();
  const name = document.getElementById("new-name");
  const score = document.getElementById("new-score");
  postScore(name.value, score.value);
  name.value = "";
  score.value = "";
});
