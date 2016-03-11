angular.module('adminApp',['ui.bootstrap','wiki.common','ngRoute']);

angular.module('adminApp').config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/admin-login', {
                templateUrl: 'admin-login.html',
                controller: 'AdminLoginController'
            }).
            when('/admin-manage', {
                templateUrl: 'admin-manage.html',
                controller: 'AdminManageController'
            }).
            when('/admin-main', {
                templateUrl: 'admin-main.html',
                controller: 'AdminMainController'
            }).otherwise({
                redirectTo: '/admin-login'
            });
    }]);

angular.module("adminApp")
    .controller("AdminLoginController", AdminLoginController)
    .controller("AdminMainController",AdminMainController)

angular.module('adminApp').value("modalOpt",{
        dialogClass: "modal",
        backdropFade: true,
        dialogFade: true,
        keyboard: false,
        backdrop: true,
        backdropClick: false
    }) .constant("api",{
        "login":"http://42.96.207.122:89/api/admin/login",
        "vms":"http://42.96.207.122:89/api/vm",
        "vmDelete":"http://42.96.207.122:89/api/vm/delete",
        "vmAdd":"http://42.96.207.122:89/api/vm/add",
        "vmUpdate":"http://42.96.207.122:89/api/vm/update",
        "vmChangeSingle":"http://42.96.207.122:89/api/vm/change-project-single",
        "vmChangeAll":"http://42.96.207.122:89/api/vm/change-project-all",
        "projectAdd":"http://42.96.207.122:89/api/project/add",
        "projectSearch":"http://42.96.207.122:89/api/project"
    });

angular.module("adminApp")
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
    })
    .factory("httpGetService", function ($q, $http) {
        return {
            call: _call
        };
        function _call(url, params) {
            var d = $q.defer();
            if (params) {
                url += "?" + params
            }
            $http.get(url)
                .success(function (data, status, header, config) {
                    d.resolve(data);
                }).error(function (data, status, header, config) {
                d.reject();
            });
            return d.promise;
        }
    });



angular.module('adminApp').directive('clickOutside', ['$document', function ($document) {
    return {
        restrict: 'A',
        link: function (scope, element, attrs) {
            $(element).bind('mousedown', function (e) {
                e.preventDefault();
                e.stopPropagation();
            });

            $("#" + attrs["insideId"]).bind('mousedown', function (e) {
                e.stopPropagation();
            });

            $("#" + attrs["insideId"]).bind('blur', function (e) {
                setTimeout(function () {
                    scope.$apply(attrs.clickOutside);
                });
            });

            $document.bind('mousedown', function () {
                scope.$apply(attrs.clickOutside);
            });
        }
    };
}]);