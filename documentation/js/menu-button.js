$('document').ready(function()
{
    $('#menu-button').click(function()
    {
        $('#menu-button').toggleClass('change');

        if ( $('#menu').css('display') == 'block' )
            $('#menu').css('display', '');
            // .hide() aggiungerebbe display: none, così invece si cancella la proprietà
        else
            $('#menu').show();
    })
})