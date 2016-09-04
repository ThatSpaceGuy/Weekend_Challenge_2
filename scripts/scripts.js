console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///
studentArray = [];

/// == Function Declarations == ///


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

      studentArray = data.students;

      console.log(studentArray);
    },
    statusCode: {
      404: function(){
        alert('404 Error! Cannot load page');
      }
    }
  }); // end ajax
}); // end document ready
