var counter = 1;
var on = false;
var turn = false;
var dispCount = 0;
var clicked = 0;
var strict = false;
var greenAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
var redAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
var yellowAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
var blueAudio = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

//function if game is turned on
var turnedOn = function() {
  //console.log('game is on');
  $('.count-text').css({
    "color": "#B71C1C"
  })
}

//function if game is turned off
var turnedOff = function() {
  //console.log('game is on');
  $('.count-text').css({
    "color": "#5E0000"
  })
}

var colorArr = [0, 1, 2, 3];
var lightArr = [];

var pattRand = function() {
  return Math.floor(Math.random() * 4);
};

//countup function
function countUp(){
  counter += 1;
}

//check if user input is correct
function patternRight(){
  if(clicked !== lightArr[dispCount] && strict === true){
    turn = false;
    counter = 1;
    dispCount = 0;
    lightArr.splice(0, lightArr.length);
    incLightArr();
    $('.count-text').text('!!')
  $('.count-text').css({
        "font-size": "180%",
        "top": "0%",
        "bottom": "0",
        "left": "15%",
        "letter-spacing": "7px"
      })
  $('.count-text').effect("pulsate", {times:2}, 3000);
    setTimeout(function(){countDisp();}, 4000);
    setTimeout(function(){runPatt(0);}, 4000);
  } else{
  if(clicked !== lightArr[dispCount]){
    turn = false;
    $('.count-text').text('!!')
  $('.count-text').css({
        "font-size": "180%",
        "top": "0%",
        "bottom": "0",
        "left": "15%",
        "letter-spacing": "7px"
      })
  $('.count-text').effect("pulsate", {times:3}, 3000);
    setTimeout(function(){countDisp();}, 4000);
    setTimeout(function(){runPatt(0);}, 4000);
  } else{
    if(dispCount + 1 === 20 && (dispCount + 1) === lightArr.length){
      alert("You Win!");
    }else{
    if((dispCount + 1) === lightArr.length){
    countUp();
    countDisp();
    incLightArr();
      setTimeout(function(){runPatt(0);}, 500);
    }
    dispCount += 1;
    }
  }
  } 
};

//add to lightArr
function incLightArr(){
  var len = lightArr.length;
  lightArr[len] = pattRand();
  console.log(lightArr);
}

//Counter display function
function countDisp(){
  var countText = counter.toString();
  if(counter < 10){
  $('.count-text').text('0' + countText);
  } else{
    $('.count-text').text(countText);
  }
  $('.count-text').css({
        "font-size": "180%",
        "top": "0%",
        "bottom": "0",
        "left": "15%",
        "letter-spacing": "3px"
      })
}

//return to dashes when turned off
 function countOff(){
   $('.count-text').text('--');
   $('.count-text').css({
        "font-size": "140%",
        "top": "8%",
        "bottom": "0",
        "left": "25%",
        "letter-spacing": "7px"
      })
 }

//waiting function
var wait = function(){
  //console.log('i"m Waiting');
  $('.green').removeClass('green2');
  $('.red').removeClass('red2');
  $('.blue').removeClass('blue2');
  $('.yellow').removeClass('yellow2');
};

//function to run comp pattern
function runPatt(i){
  setTimeout(function(){
    //console.log(lightArr[i]);
    if (lightArr[i] === colorArr[0]) {
    $('.green').addClass('green2');
      greenAudio.play();
          setTimeout(function(){wait();}, 800);
  } else {
    if (lightArr[i] === colorArr[1]) {
      $('.red').addClass('red2');
      redAudio.play();
          setTimeout(function(){wait();}, 800);
    } else {
      if (lightArr[i] === colorArr[2]) {
        $('.yellow').addClass('yellow2');
        yellowAudio.play();
          setTimeout(function(){wait();}, 800);
      } else {
        if (lightArr[i] === colorArr[3]) {
          $('.blue').addClass('blue2');
          blueAudio.play();
          setTimeout(function(){wait();}, 800);
        }
      }
    }
  }
    if(i < lightArr.length - 1){
      i++;
      runPatt(i);
    };
    dispCount = 0;
  },1000)
  turn = true;
  };

//user turn
var placeholder = 0;
function userTurn(){
  
}

$(document).ready(function() {

  //Turn on function
  $('.slide').click(function() {
   countOff(); //console.log(colorArr[pattRand()]);
    if (on === true) {
      on = false;
    } else {
      on = true;
    }
    var x = $(this).css("left");
    if (on === true) {
      $(this).css({
        "left": '50%',
        "right": '0%'
      });
      turnedOn();
    } else {
      $(this).css({
        "left": '0%',
        "right": '100%'
      });
      turnedOff();
      //return lightArr to zero elements when turned off
      lightArr.splice(0, lightArr.length);
    }
  });
  
  //Clicking green button lights it up
  $('.green').click(function(){
    clicked = 0;
    if(turn === true){
      greenAudio.play();
    $(this).addClass('green2');
    setTimeout(function(){wait();}, 300);
    }
    patternRight();
  })
  
  //Clicking red button lights it up
  $('.red').click(function(){
    clicked = 1;
    if(turn === true){
      redAudio.play();
    $(this).addClass('red2');
    setTimeout(function(){wait();}, 300);
    }
    patternRight();
  })
  
  //Clicking yellow button lights it up
  $('.yellow').click(function(){
    clicked = 2;
    if(turn === true){
      yellowAudio.play();
    $(this).addClass('yellow2');
    setTimeout(function(){wait();}, 300);
    }
    patternRight();
  })
  
  //Clicking blue button lights it up
  $('.blue').click(function(){
    clicked = 3;
    if(turn === true){
      blueAudio.play();
    $(this).addClass('blue2');
    setTimeout(function(){wait();}, 300);
    }
    patternRight();
  })

//startOver function
  function startOver(){
    if(on === true){
      countDisp();
    }
    if(lightArr.length === 0){
    incLightArr();
    } 
    runPatt(0);
  }
  
  //Click Start function
  $('.start').click(function(){
    //show counter on start click
    if(on === true){
    $('.count-text').text('--');
    $('.count-text').effect("pulsate", {times:3}, 3000);
    counter = 1;
    dispCount = 0;
    lightArr.splice(0, lightArr.length);
    
      setTimeout(function(){countDisp();}, 3000);
    
    incLightArr();
    setTimeout(function(){runPatt(0);}, 3000);
    }
  });
  
  //Click Strict function
  $('.strict').click(function(){
    if(strict === false){
      strict = true;
    $(this).css({
      "border-color": "red",
      "color": "red"
    });
    } else{
      strict = false;
      $(this).css({
      "border-color": "gray",
      "color": "black"
    });
    };
    
  });
  
});