var BeerCrawlBase = BeerCrawlBase || {};

BeerCrawlBase.bindUI = function () {
    console.log('binding ui');

    $('form').submit(function (e) {
        e.preventDefault();
        var $this = $(this);
            formID = $this.attr('id'),
            serializedData = $(this).serialize();

        console.log(serializedData);
        
        $.ajax({
            url: "https://script.google.com/macros/s/AKfycbwxq10krHEc4Fu-zq2e1Wp-5PhIzoBHbO6HLogEcgKjbn_jkDWZ/exec",
            type: "post",
            data: serializedData
        });

    })
};

BeerCrawlBase.chekInVisuals = function () {
    // iterate over containers with class name venue
    var venues = $('.venue');
    for (var i = 0; i < venues.length; i++) {

        var venueCheckIn = $(venues[i]).find('input[type=checkbox]').is(':checked');
        if (venueCheckIn) {
            $(venues[i]).addClass('checkedin')

        }
    };
        // check input#checkedin
            // if true
                // then add checkmark


};

BeerCrawlBase.init = function () {
    BeerCrawlBase.bindUI();
    BeerCrawlBase.chekInVisuals();
};


$(function (){
    BeerCrawlBase.init();
});




// name
// email


//// form1#venu
    //// sumbit
    
//// form2
    //// sumbit
