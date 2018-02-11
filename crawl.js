function populateCheckin () {
    var getvenues = localStorage.getItem('venues');
    var venues = JSON.parse(getvenues);
    console.log(venues);
    for (var i = 0; i < venues.length; ++i){
        $('#' + venues[i] + "c").removeClass('checkedin');
        $('#' + venues[i] + "c").addClass('showcheck');
        $('#' + venues[i] + "b").addClass('checkedin');
        $('#' + venues[i] + "s").addClass('selected');

    }
    
}

function registerUser(firstname, email) {
    localStorage.setItem('firstname', firstname);
    localStorage.setItem('email', email);
    localStorage.setItem('registration', 'yes')

}

function populateForm(){
    //if users is registered this will populate all hidden venue forms
    var firstname = localStorage.getItem('firstname');
    var email = ('value', localStorage.getItem('email'));
    $('[name=email]').val(email);
    $('[name=firstname]').val(firstname);
    return;

}

function checkin(location){
    //get the venues string and convert to array, then append new venue
    var getvenues = localStorage.getItem('venues');
    var venues = JSON.parse(getvenues);
    venues.push(location);
    localStorage.setItem('venues', JSON.stringify(venues));
    return;

    
}

// on checkin submit data and collapse
$('form').submit(function(event){
    if (localStorage.registration){
        populateForm();
    }
    
    var dataArray = $(this).serializeArray();
    var venue = dataArray[2].value;

    if (venue == "raffle")
        registerUser(dataArray[0].value, dataArray[1].value);

    
    // send data to google sheet
    jQuery.ajax({
        url: "https://script.google.com/macros/s/AKfycbwxq10krHEc4Fu-zq2e1Wp-5PhIzoBHbO6HLogEcgKjbn_jkDWZ/exec",
        type: "post",
        data: dataArray,
        success: function(data){
            console.log("user checked in!");
            $('#' + venue + "c").removeClass('checkedin');
            $('#' + venue + "c").addClass('showcheck');
            $('#' + venue + "b").addClass('checkedin');
            $('#' + venue + "s").addClass('selected');
            checkin(venue);
        },
        error: function(data) {
            alert("Error");
        }
    });

    // Prevent default posting of form
    event.preventDefault();
});

function loaded() {
    console.log('page loaded success');
    //create the local string from array to hold checkedin venues
    if (!localStorage.venues){
        var venues = [];
        localStorage.setItem('venues', JSON.stringify(venues));
        
    }
    populateCheckin();

};

document.addEventListener('DOMContentLoaded', loaded, false);

/*
brewcrawl javascript created by jessebarto.com with help from Jean Luc the cats' dad Benjamin Steyaert
*/