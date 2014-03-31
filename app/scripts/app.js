'use strict';

angular.module('s3UploadApp', [
  'ngCookies',
  'ngSanitize',
  'ngRoute',
  'angularFileUpload'
])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'partials/main',
        controller: 'MainCtrl'
      })
    .otherwise({
        redirectTo: '/'
      });

    $locationProvider.html5Mode(true);
  })
.run(function ($rootScope, $location, $http) {

    $http.get('/api/config').success(function(config) {
        $rootScope.config = config;
      });
  });
