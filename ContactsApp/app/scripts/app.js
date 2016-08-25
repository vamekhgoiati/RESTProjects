'use strict';

angular.module('contactsAppApp', ['ui.router', 'ngResource'])
  .config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    // route for the home page
      .state('app', {
        url: '/',
        views: {
          'content': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          }
        }

      });

    $urlRouterProvider.otherwise('/');
  })
;
