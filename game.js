var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
level = 0;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
}

function playSequence() {
  var pat = 0,
    howManyTimes = gamePattern.length;

  function f() {
    $("#" + gamePattern[pat]).animate({
      opacity: 1
    }).animate({
      opacity: 0.6
    });
    playSound(gamePattern[pat]);
    pat++;
    if (pat < howManyTimes) {
      setTimeout(f, 1000);
    }
  }
  f();
}

$(".btn").click(function() {
  if (started) {
    userClickedPattern.push($(this).attr("id"));
    $(this).animate({
      opacity: 1
    }).animate({
      opacity: 0.6
    });
    playSound($(this).attr("id"));
    if (userClickedPattern[userClickedPattern.length - 1] != gamePattern[userClickedPattern.length - 1]) {
      playSound("wrong");
      $(".start").text("Game Over");
      $(".start").css("background-color","red");
      setTimeout(function() {
        $(".start").text("Play");
        $(".start").css("background-color","#011F3F");
        started=false;
        if (level > Number($(".level").text())){
          $(".level").text(level);
        }
        level=0;
        userClickedPattern=[];
      }, 1000);
    } else if (userClickedPattern.length==gamePattern.length) {
      level += 1;
      $(".start").text("Level " + level);
      $(".start").css("background-color","green");
      setTimeout(function() {
        $(".start").css("background-color","#011F3F");
        nextSequence();
        playSequence();
        userClickedPattern=[];
      }, 1250);
    }
  }
});

$(".start").click(function() {
  if (!started) {
    gamePattern = [];
    nextSequence();
    playSequence();
    $(this).text("Level " + level);
    started = true;
    $(this).removeClass("start_active");
  }
});

function playSound(color) {
  switch (color) {
    case "blue":
      var b = new Audio("sounds/blue.mp3");
      b.play();
      break;
    case "green":
      var g = new Audio("sounds/green.mp3");
      g.play();
      break;
    case "yellow":
      var y = new Audio("sounds/yellow.mp3");
      y.play();
      break;
    case "red":
      var r = new Audio("sounds/red.mp3");
      r.play();
      break;
    case "wrong":
      var w = new Audio("sounds/wrong.mp3");
      w.play();
      break;
  }
}
