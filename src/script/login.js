!function ($) {
    const $btns = $('.content .tab');
    const $item = $('.content .item');
    $btns.on('click', function () {
        $(this).addClass('active').siblings('.content .tab').removeClass('active');
        $item.eq($(this).index()).show().siblings('.content .item').hide();
    });
}(jQuery)