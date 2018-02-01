// Variable to hold request
var request;

// on checkin submit data and collapse
$('form').submit(function(event){
  //document.getElementById('first name').value = localStorage.getItem('first name');
  //document.getElementById('email').value = localStorage.getItem('email');
    // setup some local variables
    var $form = $(this);
    var venue = $(this).data('id');
    console.log(venue)
    console.log($form)

    // Serialize the data in the form
    var serializedData = $(this).serialize();

    // send data to google sheet
    request = $.ajax({
        url: "https://script.google.com/macros/s/AKfycbwxq10krHEc4Fu-zq2e1Wp-5PhIzoBHbO6HLogEcgKjbn_jkDWZ/exec",
        type: "post",
        data: serializedData
    });

    // Callback handler that will be called on success
    request.done(function (response, textStatus, jqXHR){
        $('#' + venue).show();
        $('#' + venue).hide();
        // Log a message to the console
        console.log("it worked!");
        console.log(response);
        console.log(textStatus);
        console.log(jqXHR);
    });

       // Prevent default posting of form
    event.preventDefault();
});