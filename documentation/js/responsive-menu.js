$('document').ready(function()
{
    $('#menu-button').click(function()
    {
        $('#menu-button').toggleClass('change');

        if ( $('#menu').is(':visible') )
            $('#menu').css('display', '');
            // .hide() aggiungerebbe display: none, così invece si cancella la proprietà
        else
            $('#menu').show();
    });

    $(document).click(function(event)
    {
        if ( $('#context').get(0).contains(event.target) && $('#menu-button').hasClass('change') )
        {
            $('#menu').hide();
            $('#menu-button').toggleClass('change');

        }
    });
})