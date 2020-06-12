! function($) {
    //如何阻止提交按钮 onsubmit
    const $form = $('form');
    const $username = $('#username');
    const $password = $('.passnum');
    // const $repass = $('.repass');
    // const $email = $('.email');
    const $span = $('span'); //多个

    //每一个表单一个标记。
    let userflag = true; //标记
    let passflag = true;

    //1.用户名
    /* $username.on('focus', function() {
        $span.eq(0).html('设置后不可更改，中英文均可，最长14个英文或7个汉字').css({
            color: '#ccc'
        });
    }); */

    $username.on('blur', function() {
        if ($(this).val() !== '') { //有值
            let len = $(this).val().replace(/[\u4e00-\u9fa5]/g, 'aa').length; //将中文转换成两个英文计算长度
            if (len < 14) {
                $.ajax({
                    type: 'post',
                    url: 'http://localhost/NZ_1903/nz1903item/php/registry.php',
                    data: {
                        username: $username.val()
                    }
                }).done(function(result) {
                    if (!result) { //不存在
                        $span.eq(0).html('√').css('color', 'green');
                        $userflag = true;
                    } else {
                        $span.eq(0).html('该用户名已经存在').css('color', 'red');
                        $userflag = false;
                    }
                })
            } else {
                $span.eq(0).html('该用户名长度有问题').css({
                    color: 'red'
                });
                userflag = false;
            }
        } else {
            $span.eq(0).html('该用户名不能为空').css({
                color: 'red'
            });
            userflag = false;
        }
    });

    //密码
    /* $password.on('focus', function() {
        $span.eq(1).html('长度为8~14个字符,至少包含2种字符').css({
            color: '#ccc'
        });
    }); */

    $password.on('input', function() {
        let $pass = $(this).val();
        if ($pass.length >= 8 && $pass.length <= 14) {
            let regnum = /\d+/;
            let regupper = /[A-Z]+/;
            let reglower = /[a-z]+/;
            let regother = /[\W\_]+/; //其他字符

            //test():匹配存在感
            let $count = 0; //计数

            if (regnum.test($pass)) {
                $count++;
            }

            if (regupper.test($pass)) {
                $count++;
            }

            if (reglower.test($pass)) {
                $count++;
            }

            if (regother.test($pass)) {
                $count++;
            }

            switch ($count) {
                case 1:
                    $span.eq(2).html('弱').css({
                        color: 'red'
                    });
                    passflag = false;
                    break;

                case 2:
                case 3:
                    $span.eq(2).html('中').css({
                        color: 'yellow'
                    });
                    passflag = true;
                    break;
                case 4:
                    $span.eq(2).html('强').css({
                        color: 'green'
                    });
                    passflag = true;
                    break;
            }

        } else {
            $span.eq(2).html('密码长度错误').css({
                color: 'red'
            });
            passflag = false;
        }
    });

    $password.on('blur', function() {
        if ($(this).val() !== '') {
            if (passflag) {
                $span.eq(1).html('√').css({
                    color: 'green'
                });
                passflag = true;
            }
        } else {
            $span.eq(2).html('密码不能为空').css({
                color: 'red'
            });
            passflag = false;
        }
    });

    $form.on('submit', function() {
        if ($username.val() === '') {
            $span.eq(0).html('该用户名不能为空').css({
                color: 'red'
            });
            userflag = false;
        }

        if ($password.val() === '') {
            $span.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            passflag = false;
        }
        //阻止跳转：DOM 0级事件 return false   DOM 2级  event.perventDefault() / event.returnValue = false
        if (!userflag || !passflag) {
            return false;
        }

    });



    //手机号码：
    let tel = /^1[345678]\d{9}$/;
    // console.log(tel.test('13456789564'));


    //电子邮箱：
    let email = /^(\w+[\+\-\.]*\w+)\@(\w+[\-\.]*\w+)\.(\w+[\-\.]*\w+)$/; //学习转义字符
    console.log(email.test('75480420@qq.com'));


    //身份证号：\d{17}(\d|X|x)
    let cartid = /^\d{6}(19|20)\d{2}(0[1-9]|1[0-2])(0[1-9]|1[0-9]|2[0-9]|3[0-1])\d{3}[x|X|\d]$/;
    console.log(cartid.test('123456198812251234'));
}(jQuery);