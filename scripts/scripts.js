console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var piCohort = [];
var numPies;  // This will hold the number of students in the array.
var currentPi = 0; // This holds the index of the student currently displayed.

/// == Function Declarations == ///
function addIndieButton(index, memberName){
  $('#indieButtons').append(' <button data-which="'+index+
  '" class="btn btn-info indieNav">'+memberName+'</button> ');
}

function displayPi(){
  var piOnDisplay = piCohort[currentPi];
  var piNum = currentPi+1;
  $('#titleRow').html('<h3>'+'Pi Member #'+(piNum)+' of '+numPies+'</h3>');
  $('#nameRow').html('<h3>'+piOnDisplay.first_name+' '+piOnDisplay.last_name+'</h3>');
  $('#infoRow').html('<h4>'+piOnDisplay.info+'</h4>');
}

function displayNext(){
  // This conditional helps the nav buttons to wrap at the ends of the array
  if (currentPi+1 === numPies) {
    currentPi=0;
  } else {
    currentPi++;
  }

  displayPi();
}

function displayPrev(){
  // This conditional helps the nav buttons to wrap at the ends of the array
  if (currentPi-1 < 0) {
    currentPi=numPies-1;
  } else {
    currentPi--;
  }

  displayPi();
}

function displayThis(){
  var thisIndex = $(this).data('which');
  console.log($(this).data('which'));
  currentPi = thisIndex;

  displayPi();
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

      displayPi();

      for (var i = 0; i < numPies; i++) {
        addIndieButton(i,piCohort[i].first_name);
      }
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
}); // end document ready
