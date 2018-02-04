
function populateForm(){
    //if users is registered this will populate all hidden venue forms
    var firstname = localStorage.getItem('firstname');
    var email = ('value', localStorage.getItem('email'));
    $('[name=email]').val(email);
    $('[name=firstname]').val(firstname);

}

function checkin(location){
    //create the local string from array to hold checkedin venues
    if (!localStorage.venues){
        var venues = [location];
        localStorage.setItem('venues', JSON.stringify(venues));
        
    }
    //get the venues string and convert to array, then append new venue
    var getvenues = localStorage.getItem('venues');
    var venues = JSON.parse(getvenues);
    venues.push(location);
    localStorage.setItem('venues', JSON.stringify(venues));
    
}

// on checkin submit data and collapse
$('form').submit(function(event){
    if (localStorage.registration){
        populateForm();
    }
    
    var dataArray = $(this).serializeArray();
    var venue = dataArray[2].value;
    
    // send data to google sheet
    jQuery.ajax({
        url: "https://script.google.com/macros/s/AKfycbwxq10krHEc4Fu-zq2e1Wp-5PhIzoBHbO6HLogEcgKjbn_jkDWZ/exec",
        type: "post",
        data: dataArray,
        success: function(data){
            console.log("it worked!");
            $('#' + venue + "c").addClass('showcheck');
            $('#' + venue + "b").addClass('checkedin');
            checkin(venue);
        },
        error: function(data) {
            alert("Error");
        }
    });

    // Prevent default posting of form
    event.preventDefault();
});

/*
brewcrawl javascript created by jessebarto.com with help from Jean Luc the cats' dad Benjamin Steyaert
*/