'use strict';

angular.module('contactsAppApp')
  .constant('baseUrl', 'http://localhost:8080/')
  .factory('menuFactory', ['$resource', 'baseUrl', function ($resource, baseUrl) {
    return $resource(baseUrl + "contact/:id", null, {
      'update': {
        method: 'PUT'
      }
    });
  }]);
