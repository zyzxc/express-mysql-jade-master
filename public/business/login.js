$(function () {
    $("#loginBtn").click(function () {
        if (validator()) {
            $.ajax({
                type: 'POST',
                url: '/login/auth',
                data: {
                    code: $('input[name="loginName"]').val(),
                    password: $('input[name="loginPwd"]').val()
                },
                dataType: 'json'
            }).done(function (res) {
                console.log(res);
                alert(res);
                window.location.reload();
            }).fail(function (res) {
                alert(res);
            });
        }
    })

    var validator = function () {
        var loginName = $("input[name='loginName']");
        var loginPwd = $("input[name='loginPwd']");
        if (!loginName.val() && !$.trim(loginName.val())) {
            alert("请输入用户名！");
            loginName.focus();
            return false;
        }
        if (!loginPwd.val() && !$.trim(loginPwd.val())) {
            alert("请输入登录密码！");
            loginPwd.focus();
            return false;
        }
        return true;
    }
})