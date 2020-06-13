!function ($) {
    const $form = $('form')
    const $username = $('.phonenum')
    const $password = $('.passnb input')
    const $repassword = $('.passure input')
    const $email = $('.meansize')
    const $check = $('.agree input')
    const $decide = $('.decide span')


    let $userbool = true
    let $passbool = true
    let $repassbool = true
    let $emailbool = true
    let $checkbool = true
    // 用户名
    $username.on("focus", function () {//获得焦点显示文字
        $decide.eq(0).html('最长为8个汉字或16个英文字母').css({
            color: "#666666"
        })
    })
    $username.on("blur", function () {
        // 验证唯一性
        if ($username.val() !== "") {
            let $size = $username.val().replace(/[\u4e00-\u9fa5]/g, 'ab').length
            if ($size < 16) {
                $.post('http://localhost/js2002/xiangmu/php/registry.php', { username: $username.val() },
                    function (data) {
                        if (data) {
                            $userbool = false
                            $decide.eq(0).html("用户名已存在").css({
                                color: "red"
                            })
                        } else {
                            $userbool = true
                            $decide.eq(0).html("√").css({
                                color: "#22bb55"
                            })
                        }
                    })
            } else {//验证长度
                $decide.eq(0).html('用户名长度有问题').css({
                    color: 'red',
                });
                $userbool = false
            }

        } else {//空值验证
            $userbool = false
            $decide.eq(0).html('用户名不能为空').css({
                color: 'red'
            });
        }
    })


    $password.on('focus', function () {//获得焦点
        $decide.eq(1).html('长度为8~16个字符,需要包含数字，大小写字母，特殊符号中的两种字符').css({
            color: "#666666"
        });
    });
    $password.on('input', function () {
        // 密码强度验证
        let $passVal = $(this).val();
        if ($passVal.length >= 8 && $passVal.length <= 16) {
            let $passNum = /\d+/;
            let $passCaps = /[A-Z]+/;
            let $passlower = /[a-z]+/;
            let $passSymbol = /[\W\_]+/;
            let $num = 0;
            if ($passNum.test($passVal)) $num++;
            if ($passCaps.test($passVal)) $num++;
            if ($passlower.test($passVal)) $num++;
            if ($passSymbol.test($passVal)) $num++;
            switch ($num) {
                case 1:
                    $decide.eq(1).html('弱').css({
                        color: 'red'
                    });
                    $passbool = false;
                    break;
                case 2:
                case 3:
                    $decide.eq(1).html('中').css({
                        color: 'orange'
                    });
                    $passbool = true;
                    break;
                case 4:
                    $decide.eq(1).html('强').css({
                        color: 'green'
                    });
                    $passbool = true;
                    break;
            }
            // 密码长度验证
        } else {
            $decide.eq(1).html('密码长度错误').css({
                color: 'red'
            });
            $passbool = false;
        }
    });
    // 空值验证
    $password.on('blur', function () {
        if ($(this).val() !== '') {
            if ($passbool) {
                $decide.eq(1).html('√').css({
                    color: '#22bb55'
                });
                $passbool = true;
            }
        } else {
            $decide.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            $passbool = false;
        }
    });


    // repass验证
    $repassword.on('blur', function () {
        if ($(this).val() !== '') {
            if ($(this).val() === $password.val()) {
                $decide.eq(2).html('√').css({
                    color: '#22bb55'
                });
                $repassbool = true;
            }else{
                $decide.eq(2).html('两次密码不一致').css({
                    color: 'red'
                });
                $repassbool = false;
            }
        } else {
            $decide.eq(2).html('确认密码不能为空').css({
                color: 'red'
            });
            $repassbool = false;
        }
    });
    $repassword.on('focus', function () {//获得焦点
        $decide.eq(2).html('长度为8~16个字符,需要包含数字，大小写字母，特殊符号中的两种字符').css({
            color: "#666666"
        });
    });

    // 邮箱验证
    $email.on('focus', function () {//获得焦点
        $decide.eq(3).html('您可以通过该邮箱登录或找回密码').css({
            color: "#666666",
        });
    });
    $email.on("blur", function () {
        //验证邮箱格式是否正确
        if ($email.val() !== "") {
            let $emailVal = /^(\w+[\+\-\.]*\w+)\@(\w+[\-\.]*\w+)\.(\w+[\-\.]*\w+)$/
            if ($emailVal.test($email.val())) {
                $emailbool = true
                $decide.eq(3).html("√").css({
                    color: "#22bb55"
                })
            } else {//验证邮箱格式是否正确
                $decide.eq(3).html('您的邮箱格式有问题').css({
                    color: 'red',
                });
                $emailbool = false
            }

        } else {//空值验证
            $emailbool = false
            $decide.eq(3).html('邮箱不能为空').css({
                color: 'red'
            });
        }
    })


    $form.on('submit', function () {
        if ($username.val() === '') {
            $decide.eq(0).html('用户名不能为空').css({
                color: 'red'
            });
            $userbool = false;
        }

        if ($password.val() === '') {
            $decide.eq(1).html('密码不能为空').css({
                color: 'red'
            });
            $passbool = false;
        }
        if ($repassword.val() === '') {
            $decide.eq(2).html('确认密码不能为空').css({
                color: 'red'
            });
            $repassbool = false;
        }
        if ($email.val() === '') {
            $decide.eq(3).html('邮箱不能为空').css({
                color: 'red'
            });
            $emailbool = false;
        }
        // 判断I agree是否选中
        if ($check.prop('checked') === false) {
            $checkbool = false
            $decide.eq(4).html('您需要同意用户协议方可正常注册').css({
                color: 'red'
            });
        } else {
            $checkbool = true
            $decide.eq(4).html('')
        }
        //全部不为空时才可以提交
        if (!$userbool || !$passbool || !$emailbool || !$checkbool || !$repassbool) {
            return false;
        }
    });



}(jQuery)