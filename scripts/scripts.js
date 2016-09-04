console.log('scripts.js sourced!');
/// == Global Variable Declarations == ///


/// == Function Declarations == ///


/// == JavaScript == ///

$(document).ready(function(){
  console.log('Document ready!');

  var genericUrl = 'http://www.'+'';

  //ajax call
  $.ajax({
    url: genericUrl,
    dataType: 'JSON',
    success: function(data){
      console.log('in Ajax success, with data:', data.xxxx);

    },
    statusCode: {
      404: function(){
        alert('404 Error! Cannot load page');
      }
    }
  }); // end ajax
}); // end document ready
