angular.module('managerApp', ['ui.bootstrap', 'ngRoute']);

angular.module('managerApp').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/admin-manage', {
            templateUrl: 'admin-manage.html',
            controller: 'AdminManageController'
        }).otherwise({
            redirectTo: '/admin-manage'
        });
    }]);

angular.module("managerApp")
    .controller("AdminManageController", AdminManageController);

angular.module('managerApp').value("modalOpt", {
    dialogClass: "modal",
    backdropFade: true,
    dialogFade: true,
    keyboard: false,
    backdrop: true,
    backdropClick: false
}).constant("api", {
    "admins": "http://121.42.239.141:89/api/admin",
    "adminAdd": "http://121.42.239.141:89/api/admin/add",
    "adminUpdate": "http://121.42.239.141:89/api/admin/update",
    "adminDelete": "http://121.42.239.141:89/api/admin/delete"
});

angular.module("managerApp")
    .factory("httpPostService", function ($q, $http) {
        return {
            call: _call
        };
        function _call(url, object, params) {
            var d = $q.defer();
            if (params) {
                url += "?" + params
            }
            $http.post(url, object)
                .success(function (data, status, header, config) {
                    d.resolve(data);
                }).error(function (data, status, header, config) {
                d.reject();
            });
            return d.promise;
        }
    });
