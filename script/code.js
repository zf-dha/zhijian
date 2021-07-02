var yzPhone;
var yzCode;

// 获取验证码
function getCode(regType) {
    var phone = $.trim($('.phone input').val());
    if (!checkMobile(phone)) {
        _msg('手机号不正确');
        console.log('手机号不正确');
        return;
    }
    var status = $('.get-code').attr('data-status');
    if (status != 0) return;

    var code = getRandom(100000, 999999);
    console.log(phone)
    console.log(code)
    var deviceId = api.deviceId;
    // 判断是否注册
    if (regType == 1) {
        _ajax('home/user/sel', function (ret, err) {
            if (ret.code != 200) {
                _msg('手机号已经被注册');
            } else {
                _ajax('api/code/sms', function (rets, errs) {
                    console.log(JSON.stringify(rets))
                    console.log(JSON.stringify(errs))
                    _msg(rets.msg);
                    if (rets && rets.code == 200) {
                        yzPhone = phone;
                        yzCode = code;
                        console.log('发送成功')
                        downTime();
                    }
                }, {
                    phone: phone,
                    code: code,
                    deviceId: deviceId,
                })
            }
        }, {
            phone: phone
        })
    } else {
        _ajax('api/code/sms', function (rets, errs) {
            console.log(JSON.stringify(rets))
            console.log(JSON.stringify(errs))
            _msg(rets.msg);
            if (rets && rets.code == 200) {
                yzPhone = phone;
                yzCode = code;
                _msg('发送成功');
                console.log('发送成功')
                downTime();
            }
        }, {
            phone: phone,
            code: code,
            deviceId: deviceId,
        })
    }
}


// 校验验证码是否正确
function checkCode(phone, code, callback) {
    if (phone != yzPhone || code != yzCode) {
        _msg('验证码不正确');
        return;
    }
    if (typeof callback == 'function') {
        callback();
    }
}

// 倒计时
function downTime() {
    var i = 60;
    $('.get-code').attr('data-status', 1);
    var time = setInterval(function () {
        i--;
        if (i == 0) {
            clearInterval(time);
            $('.get-code').attr('data-status', 0)
            $('.get-code').text('重新获取');
            return;
        }
        $('.get-code').text('重新发送 ' + i + ' s');
    }, 1000)
}