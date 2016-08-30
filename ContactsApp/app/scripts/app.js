'use strict';

angular.module('contactsAppApp', ['ui.router', 'ngResource', 'ui.scroll', 'ui.scroll.jqlite'])
  .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $stateProvider

    // route for the home page
      .state('app', {
        url: '/',
        views: {
          'header': {
            templateUrl: 'views/header.html'
          },
          'content': {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
          }
        }

      })
      .state('app.contact', {
        url: 'contact',
        views: {
          'content@': {
            templateUrl: 'views/contact.html',
            controller: 'ContactCtrl'
          }
        }

      });

    $urlRouterProvider.otherwise('/');
  }])
;
