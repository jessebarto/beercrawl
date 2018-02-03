var firstname = localStorage.getItem('firstname');
var email = ('value', localStorage.getItem('email'));
$('[name=email]').val(email);
$('[name=firstname]').val(firstname);

// on checkin submit data and collapse
$('form').submit(function(event){

    //var serializedData = $(this).serialize();
    var dataArray = $(this).serializeArray();
    var venue = dataArray[2].value;
    
    // send data to google sheet
    jQuery.ajax({
        url: "https://script.google.com/macros/s/AKfycbwxq10krHEc4Fu-zq2e1Wp-5PhIzoBHbO6HLogEcgKjbn_jkDWZ/exec",
        type: "post",
        data: dataArray,
        success: function(data){
            console.log("it worked!");
            $('#' + venue + "c").addClass('showcheck')
            $('#' + venue + "b").addClass('checkedin')
        },
        error: function(data) {
            alert("Error");
        }
    });

    // Prevent default posting of form
    event.preventDefault();
});