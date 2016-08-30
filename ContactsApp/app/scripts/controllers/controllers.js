'use strict';

/**
 * @ngdoc function
 * @name contactsAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the contactsAppApp
 */
angular.module('contactsAppApp')
  .controller('MainCtrl', ['$scope', 'contactFactory', function($scope, contactFactory) {
      var contactsList = contactFactory.query();

      var contactDatasource = {};
      contactDatasource.get = function(index, count, success) {
        var result = contactsList.slice(index, count);

        return success(result);
      };

      $scope.contactDatasource = contactDatasource;
  }])
  .controller('ContactCtrl', ['$scope', 'contactFactory', function ($scope, contactFactory) {
    $scope.contact = {id: 0, image: '', name: '', surname: '', phone: '', email: ''};

    $scope.addContact = function () {
      contactFactory
        .save($scope.contact,
          function (response) {
            console.log("Contact saved " + response);
            $scope.contact = {id: 0, name: '', surname: '', phone: '', email: ''};
            $scope.addContactForm.$setPristine();
          },
          function (response) {
            console.log("Error saving contact: " + response.status);
          }
        );
    };
  }]);
