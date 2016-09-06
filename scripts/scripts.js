console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var piCohort = [];
var numPies;  // This will hold the number of students in the array.
var currentPi = 0; // This holds the index of the student currently displayed.
var intervalMark; // This will serve as the container for the interval.
var elapsedSec = 0; // Counter for the interval timer.
var viewType = 'default'; // Flag for type of view

/// == Function Declarations == ///
function addIndieButton(index, memberName){
  $('#indieButtons').append(' <button data-which="'+index+
  '" class="btn btn-info indieNav">'+memberName+'</button> ');
}

function displayPi(fadeEffect){
  var piOnDisplay = piCohort[currentPi];
  var piNum = currentPi+1;
  var changeInfo;

  if (viewType == 'default'){
    changeInfo = function(){
      $('#titleRow').html('<h3>'+'Pi Member #'+(piNum)+' of '+numPies+'</h3>');
      $('#nameRow').html('<h3>'+piOnDisplay.first_name+' '+piOnDisplay.last_name+'</h3>');
      $('#infoRow').html('<h4>'+piOnDisplay.info+'</h4>');
    };
  } else {
    changeInfo = function(){
      $('#titleRow').html('<h3>'+'Pi Member #'+(piNum)+' of '+numPies+'</h3>');
      $('#nameRow').html('<h3>'+piOnDisplay.first_name+' "'+piOnDisplay.info+'" '+piOnDisplay.last_name+'</h3>');
      $('#infoRow').html('');
    };
  }

  if (fadeEffect){
    $('#memberInfo').fadeOut('slow',changeInfo).fadeIn();
  } else {
    changeInfo();
  }

  elapsedSec = 0; //Reset the timer for the automatic advance
}

function displayNext(){
  // This conditional helps the nav buttons to wrap at the ends of the array
  if (currentPi+1 === numPies) {
    currentPi=0;
  } else {
    currentPi++;
  }

  displayPi(true);
}

function displayPrev(){
  // This conditional helps the nav buttons to wrap at the ends of the array
  if (currentPi-1 < 0) {
    currentPi=numPies-1;
  } else {
    currentPi--;
  }

  displayPi(true);
}

function displayThis(){
  var thisIndex = $(this).data('which');
  console.log($(this).data('which'));
  currentPi = thisIndex;

  displayPi(true);
}

function autoAdvance(){

  elapsedSec++;
  console.log('elapsed seconds:', elapsedSec);

  if (elapsedSec === 10){
    displayNext();
  }
}

function displayRandom(){

  currentPi = Math.floor(Math.random()*numPies);
  console.log(currentPi);

  displayPi(true);
}

function changeTimer(){
  var timerButton = $('#timerButton');
  var timerOn = !timerButton.hasClass('btn-success');

  timerButton.toggleClass('btn-success');
  timerButton.toggleClass('btn-danger');

  if (timerOn) {
    clearInterval(intervalMark); // end the timer
    timerButton.html('Enable Auto Advance');
  } else {
    elapsedSec = 0; // Reset Timer
    intervalMark = setInterval(autoAdvance,1000); // Start timer
    timerButton.html('Disable Auto Advance');
  }
}

function changeView(){
  console.log('in changeView with:', viewType);
  if (viewType == 'default') {
    viewType = 'nickname';
    $('#viewText').html('Default');
  } else {
    viewType = 'default';
    $('#viewText').html('Nickname');
  }

  displayPi(true);
}

/// == JavaScript == ///
$(document).ready(function(){
  console.log('Document ready!');
  var devUrl = 'http://devjana.net/pi/pi_students.json';

  //ajax call
  $.ajax({
    url: devUrl,
    dataType: 'JSON',
    success: function(data){
      console.log('in Ajax success, with data:', data);

      piCohort = data.students;
      numPies = piCohort.length;

      console.log(numPies, piCohort);

      displayPi(false);

      for (var i = 0; i < numPies; i++) {
        addIndieButton(i,piCohort[i].first_name);
      }

      intervalMark = setInterval(autoAdvance,1000);
    },
    statusCode: {
      404: function(){
        alert('404 Error! Cannot load page');
      }
    }
  }); // end ajax

  // page functionality
  $('#nextButton').click(displayNext);

  $('#prevButton').click(displayPrev);

  $('body').on('click','.indieNav',displayThis);

  $('#randomButton').click(displayRandom);

  $('#timerButton').click(changeTimer);

  $('#viewButton').click(changeView);
}); // end document ready
