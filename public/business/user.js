$(function () {
    $("#add").click(function () {
        if (validator()) {
            $.ajax({
                type: 'POST',
                url: '/users/add',
                data: {
                    code: $('input[name="code"]').val(),
                    name: $('input[name="name"]').val(),
                    name: $('input[name="password"]').val(),
                    email: $('input[name="email"]').val()
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
    });

    $("#edit").click(function () {
        var $checkebox = $('input[type="checkbox"]:checked');
        var checkeboxLength = $checkebox.length;
        if (checkeboxLength > 1) {
            alert('不能批量选择')
            return;
        }
        if (checkeboxLength < 0 || checkeboxLength == 0) {
            alert('请选择要编辑的内容')
            return;
        }
        $('input[name="id"]').val($checkebox.attr('data-id'));
        $('input[name="code"]').val($checkebox.parent().next('td[class="code"]').text()).attr("readonly", "readonly");
        $('input[name="name"]').val($checkebox.parent().parent().find('td[class="name"]').text());
        $('input[name="password"]').val($checkebox.parent().parent().find('td[class="password"]').text());
        $('input[name="email"]').val($checkebox.parent().parent().find('td[class="email"]').text());
    });
    $("#delete").click(function () {
        if ($('input[type="checkbox"]:checked').length > 1) {
            alert('不能批量选择！');
            return;
        } else if ($('input[type="checkbox"]:checked').length == 0) {
            alert("请选择要删除的用户！");
            return;
        } else {
            $.ajax({
                type: 'POST',
                url: '/users/delete',
                data: {
                    id: $('input[type="checkbox"]:checked').attr('data-id')
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
    });
    $("#search").click(function () {
        var keyWord = $("#keyWord").val();
        if ($.trim(keyWord)) {
            window.location.href = '/users/search?name=' + $("#name").val()
        }
    });

    $("#save").click(function () {
        $.ajax({
            type: 'POST',
            url: '/users/update',
            data: {
                id: $('input[name="id"]').val(),
                code: $('input[name="code"]').val(),
                name: $('input[name="name"]').val(),
                password: $('input[name="password"]').val(),
                email: $('input[name="email"]').val()
            },
            dataType: 'json'
        }).done(function (res) {
            console.log(res);
            alert(res);
            window.location.reload();
        }).fail(function (res) {
            alert(res);
        });

    });
    var validator = function () {
        var code = $('input[name="code"]').val();
        var name = $('input[name="name"]').val();
        var password = $('input[name="password"]').val();
        var email = $('input[name="sex"]').val();
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
});