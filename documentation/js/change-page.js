$('document').ready(function()
{
    $('.page-link').click(function()
    {
        let newPage = './html-contexts/' + this.getAttribute('name').toLowerCase() + '-context.html';

        $('.page-link.actual-page').removeClass('actual-page');
        $(this).addClass('actual-page');
        
        $('#context').empty().load(newPage).scrollTop();   

        if ( $('#menu-button').is(':visible') )
        {
            $('#menu-button').toggleClass('change');
            $('#menu').css('display', '');
            // .hide() aggiungerebbe display: none, così invece si cancella la proprietà
        }
    })
})