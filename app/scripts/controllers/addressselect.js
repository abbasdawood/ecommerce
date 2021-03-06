'use strict';
/**
 * @ngdoc function
 * @name chocoholicsApp.controller:AddressselectcontrollerCtrl
 * @description
 * # AddressselectcontrollerCtrl
 * Controller of the chocoholicsApp
 */
angular.module('chocoholicsApp')
  .controller('AddressselectCtrl', function($scope, $uibModal, $uibModalInstance, localStorageService, orderService, customerService) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    var vm = this;
    this.selectedAddress = {};
    this.addresses = {};
    this.customerId = localStorageService.get('userId');
    if (localStorageService.get('selectedAddress')) {
      vm.selectedAddress = localStorageService.get('selectedAddress');
      this.selected = true;
    } else {
      this.selected = false;
    }
    this.getUserAddresses = function() {
      customerService.getAddresses(vm.customerId)
        .then(function(addresses) {
          vm.addresses = addresses;
          console.log(vm.addresses);
        }).catch(function(error) {
          $scope.$emit('handleError', { error: error });

          console.log(error);
        });
    };
    this.cancel = function() {
      $uibModalInstance.close('cancel');
    };
    this.selectAddress = function(index) {
      vm.selectedAddress = vm.addresses[index];
      this.selected = true;
      localStorageService.set('selectedAddress', vm.selectedAddress);
      var info = {
        orderId: localStorageService.get('id'),
        addressId: vm.selectedAddress.id
      };
      orderService.updateInfo(info)
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          $scope.$emit('handleError', { error: error });

          console.log(error);
        });
    };
    this.reselect = function() {
      this.selected = false;
      localStorageService.remove('selectedAddress');
    };
    this.getOrderDetails = function() {
      orderService.getOrder()
        .then(function(response) {
          console.log(response);
        })
        .catch(function(error) {
          $scope.$emit('handleError', { error: error });

          console.log(error);
        });
    };
    this.getUserAddresses();
  });
