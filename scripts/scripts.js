console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
var piCohort = [];
var numPies;  // This will hold the number of students in the array.

/// == Function Declarations == ///

function displayPi(){
  var thisPi = 0;
  var piOnDisplay = piCohort[thisPi];
  $('#titleRow').html('<h3>'+'Pi Student #'+(thisPi+1)+'</h3>');
  $('#nameRow').html('<h3>'+piOnDisplay.first_name+' '+piOnDisplay.last_name+'</h3>');
  $('#infoRow').html('<h4>'+piOnDisplay.info+'</h4>');
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
    },
    statusCode: {
      404: function(){
        alert('404 Error! Cannot load page');
      }
    }
  }); // end ajax
}); // end document ready
