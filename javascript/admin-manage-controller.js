AdminManageController.$inject = ["$scope","$location","modalOpt","httpPostService","api"];
function AdminManageController($scope,$location,modalOpt,httpPostService,api) {

    (function () {
        if(!sessionStorage.loginUser||sessionStorage.loginUserState=="1"){
            window.location.href="error.html";
        }else{
            $scope.loginIn=true;
            initFun();
        }
    })();


    function initFun() {
        $scope.addModal = false;
        $scope.editModal=false;
        $scope.loginIn=true;
        $scope.modalOpt = modalOpt;
        $scope.selectedAdmin = null;
        getAdminList();
    }

    $scope.addNewAdmin =addModalOpen;
    $scope.addAdmin=addAdmin;
    $scope.delAdmin=delAdmin;
    $scope.editAdminFun=editModalOpen;
    $scope.editAdmin=editAdmin;
    $scope.initNewAdmin=initNewAdmin;
    $scope.selectedAdminFun=selectedAdminFun;

    function addModalOpen() {
        $scope.initNewAdmin();
        $scope.addModal = true;
        setTimeout(function(){
            $("#addAdmin").focus();
        },500);
    }

    function addAdmin() {
        if ($scope.newAdmin.admin.trim() != ""&& $scope.newAdmin.password.trim() != "") {
            httpPostService.call(api.adminAdd,$scope.newAdmin)
                .then(function (data) {
                    $scope.addModal = false;
                    getAdminList();
                }, function (data) {
                    alert("添加失败！");
                });
        } else {
            alert("用户名及密码不能为空！");
        }
    }

    function delAdmin() {
        if ($scope.selectedAdmin!= null ) {
            var result=confirm("要删除["+$scope.selectedAdmin.admin+"]吗?");
            if(!result){
                return;
            }
            httpPostService.call(api.adminDelete,$scope.selectedAdmin.id)
                .then(function (data) {
                    $scope.selectedAdmin=null;
                    getAdminList();
                }, function (data) {
                    alert("删除失败！");
                });
        } else {
            alert("请选择管理员！");
        }
    }

    function editModalOpen() {
        if ($scope.selectedAdmin!= null ) {
            $scope.editModal=true;
            setTimeout(function(){
                $("#editAdmin").focus();
            },500);
        }else{
            alert("请选择管理员！");
        }
    }

    function editAdmin() {
        httpPostService.call(api.adminUpdate,$scope.selectedAdmin)
            .then(function (data) {
                $scope.editModal = false;
                getAdminList();
            }, function (data) {
                alert("更新失败！");
            });
    }

    function getAdminList(){
        httpPostService.call(api.admins)
            .then(function (data) {
                $scope.adminList=angular.copy(data);
            }, function (data) {
                alert("获取管理员列表失败！");
            });
    }

    function initNewAdmin() {
        $scope.newAdmin={
            admin:"",
            password:""
        };
    }

    function selectedAdminFun(admin){
        $scope.selectedAdmin={
            id:admin.id,
            admin:admin.admin,
            password:admin.password
        };
    }

}

