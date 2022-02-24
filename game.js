const buttonColor = ['green', 'red', 'yellow', 'blue']
let gamePattern = [];
let userClickedPattern = [];
let isGameStarted = false;
let level = 1;
let currentStep = 0;

function nextSequence() {
  $("#level-title").text("Level " + level)
  const random = Math.floor(Math.random() * 4);
  gamePattern.push(buttonColor[random]);
  $(`#${buttonColor[random]}`).animate({
    opacity: 0
  }, 200).animate({
    opacity: 1
  }, 200)
  playSound(buttonColor[random]);
  userClickedPattern = []
  currentStep = 0
}

function playSound(name) {
  const audio = new Audio(`sounds/${name}.mp3`)
  audio.play()
}

function animatePress(name) {
  $(`#${name}`).addClass("pressed");
  setTimeout(() => {
    $(`#${name}`).removeClass("pressed");
  }, 100)
}

function checkResult(current) {
  currentStep++;
  if (userClickedPattern[current] == gamePattern[current]) {
    return true
  }
  return false

}

function endGame() {
  $("#level-title").text("Game Over, Press Any Key to Restart")
  $("body").addClass("red");
  setTimeout(() => {
    $(`body`).removeClass("red");
  }, 100)
  playSound("wrong")
  isGameStarted = false;
  gamePattern = []
  level = 1
}

$(".btn").click(event => {
  // debugger
  if (!isGameStarted) return
  const userClicked = event.target.id;
  userClickedPattern.push(userClicked)
  playSound(userClicked)
  animatePress(userClicked)
  const result = checkResult(currentStep)

  if (result && currentStep == level) {
    level++;
    setTimeout(() => {
      nextSequence()

    }, 1000)
  }
  if (!result) {
    endGame()
  }

})

$(document).keydown(event => {
  if (!isGameStarted) {

    nextSequence()
    isGameStarted = true;
  }
})