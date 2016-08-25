'use strict';

/**
 * @ngdoc function
 * @name contactsAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the contactsAppApp
 */
angular.module('contactsAppApp')
  .controller('MainCtrl', ['$scope', 'menuFactory', function ($scope, menuFactory) {
    $scope.contact = {id: 0, name: '', surname: '', phone: '', email: ''};

    $scope.addContact = function () {
      menuFactory
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
    }
  }]);
