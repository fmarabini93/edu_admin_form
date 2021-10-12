$('#nextStep').on('click', function(e) {
    $('#Div2').css({
        'display': 'block',
    });
    $('#Div1').css({
        'display': 'none',
    });
    $('#Div11').removeClass('active')
    $('#Div22').addClass('active')
})

$(".timeOptions").on('click', function(e) {
    $('.timeConfirmationBtn').hide();
    $(".timeOptions").removeClass('width45Per');
    $(this).toggleClass('width45Per');
    $(this).siblings('button').toggle();
})