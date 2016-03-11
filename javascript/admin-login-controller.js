AdminLoginController.$inject = ["$scope", "$location", "modalOpt", "httpPostService", "api"];
function AdminLoginController($scope, $location, modalOpt, httpPostService, api) {
    $scope.admin = {
        admin: $scope.checkbox ? localStorage.admin : "",
        password: $scope.checkbox ? localStorage.password : ""
    };
    $scope.checkbox = localStorage.admin ? true : false;

    $scope.modalOpt = modalOpt;

    $scope.adminLogin = adminLogin;

    function adminLogin() {
        if ($scope.admin.admin.trim() != "" && $scope.admin.password.trim() != "") {
            httpPostService.call(api.login, $scope.admin)
                .then(function (data) {
                    if (data) {
                        sessionStorage.loginUser = data.admin;
                        sessionStorage.loginUserState = data.state;
                        if ($scope.checkbox) {
                            localStorage.admin = data.admin;
                            localStorage.password = data.password;
                        } else {
                            localStorage.clear()
                        }
                        $location.path('/admin-main');
                    } else {
                        alert("用户名或密码不存在！")
                    }
                }, function (data) {
                    alert("登陆服务器异常！");
                });
        } else {
            alert("用户名或密码不能为空！")
        }
    }
}


