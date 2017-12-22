$(function () {
    $("#regBtn").click(function () {
        if (validator()) {
            $.ajax({
                type: 'POST',
                url: '/register/add',
                data: {
                    code: $('input[name="code"]').val(),
                    name: $('input[name="name"]').val(),
                    password: $('input[name="password"]').val(),
                    email: $('input[name="email"]').val()
                },
                dataType: 'json'
            }).done(function (res) {
                clearForm();
                console.log(res);
                alert("1111" + res);
            }).fail(function (res) {
                alert(res);
            });
        }
    })
    var validator = function () {
        var code = $('input[name="code"]').val();
        var name = $('input[name="name"]').val();
        var password = $('input[name="password"]').val();
        var email = $('input[name="email"]').val();
        if (!code && !$.trim(code)) {
            alert("用户编码不能为空！");
            $('input[name="code"]').focus();
            return false;
        }
        if (!name && !$.trim(name)) {
            alert("姓名不能为空！");
            $('input[name="name"]').focus();
            return false;
        }
        if (!password && !$.trim(password)) {
            alert("密码不能为空！");
            $('input[name="password"]').focus();
            return false;
        }
        if (!email && !$.trim(email)) {
            alert("邮箱不能为空");
            $('input[name="email"]').focus();
            return false;
        }
        return true;
    }
    var clearForm = function () {
        $('input[name="code"]').val("");
        $('input[name="name"]').val("");
        $('input[name="password"]').val("");
        $('input[name="email"]').val("");
    }
})