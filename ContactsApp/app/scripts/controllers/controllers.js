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
      var contactDatasource = {};
      contactDatasource.get = function(index, count, success) {
        if (index < 0) {
          return;
        }
        contactFactory.query(
          function(response) {
              return success(response.slice(index - 1, count));
          },
          function(response) {
            console.log("Error " + response);
          }
        );
      };

      $scope.contactDatasource = contactDatasource;
  }])
  .controller('ContactCtrl', ['$scope', 'contactFactory', function ($scope, contactFactory) {
    $scope.contact = {id: 0, image: '', name: '', surname: '', phone: '', email: ''};

    $scope.saveContact = function () {
      $scope.contact.image = 'images/noimage.png';
      contactFactory
        .save($scope.contact,
          function (response) {
            console.log("Contact saved " + response);
            $scope.contact = {id: 0, image: '', name: '', surname: '', phone: '', email: ''};
            $scope.addContactForm.$setPristine();
          },
          function (response) {
            console.log("Error saving contact: " + response.status);
          }
        );
    };
  }])
  .controller('EditContactController', ['$scope', '$stateParams', 'contactFactory', function($scope, $stateParams, contactFactory) {

    contactFactory.get({id: parseInt($stateParams.id, 10)})
    .$promise.then(
      function(response) {
        $scope.contact = response;
      },
      function(response) {
        console.log("Error " + response);
      }
    );

    $scope.saveContact = function() {
      contactFactory.update({id: $scope.contact.id}, $scope.contact);
      console.log("Contact saved " + $scope.contact);
    };
  }]);
