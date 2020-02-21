$('document').ready(function()
{
    $('.page-link').click(function()
    {
        let newPage = './html-contexts/' + this.getAttribute('name').toLowerCase() + '-context.html';

        $('.page-link.actual-page').removeClass('actual-page');
        $(this).addClass('actual-page');
        
        $('#context').load(newPage);        
    })
})