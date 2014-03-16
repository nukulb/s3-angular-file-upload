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
  });
