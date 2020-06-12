!function ($) {
    const $btns = $('.content .tab');
    const $item = $('.content .item');
    $btns.on('click', function () {
        $(this).addClass('active').siblings('.content .tab').removeClass('active');
        $item.eq($(this).index()).show().siblings('.content .item').hide();
    });
}(jQuery)


!function ($) {
    $('.btn').on('click', function () {
        $.ajax({
            type: 'post',
            url: 'http://localhost/js2002/Day%2019_1_projectname/php/login.php',
            data: {
                user: $('.username').val(),
                pass: hex_sha1($('.password').val())
            }
        }).done(function (result) {
            if (result) {
                location.href = "index.html";
                localStorage.setItem('username', $('.username').val());
            } else {
                $('.password').val('');
                alert('用户名或者密码错误');
            }
        });
    });
}(jQuery);