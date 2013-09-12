'use strict'

### Controllers ###

angular.module('app.controllers', [])

.controller('AppCtrl', [
  '$scope'
  '$location'
  '$resource'
  '$rootScope'

($scope, $location, $resource, $rootScope) ->
  $scope.$location = $location
  $scope.$watch('$location.path()', (path) ->
    $scope.activeNavId = path || '/'
  )
  $scope.getClass = (id) ->
    if $scope.activeNavId.substring(0, id.length) == id
      return 'active'
    else
      return ''
])

.controller('UserFixtureController', [
  '$scope'
  'UserFixture'
  ($scope,$UserFixture) ->
    $scope.method = "Fixture"
    $scope.user = $UserFixture.getUser();
    $scope.lastLogin = $UserFixture.getLastLogin()
    $scope.canEdit = false;
])

.controller('UserMockController', [
  '$scope'
  '$routeParams'
  'UserRepository'
  ($scope, $routeParams, $UserRepository) ->
    $scope.method = "$httpBackend"
    $scope.canEdit = true

    $UserRepository.getActiveUser().then (response) ->
      console.log 'got active user:', response
    $UserRepository.getUserById($routeParams.id).then (response) ->
      console.log 'got user:', response
      $scope.user = response.data

    $UserRepository.getLastLogin().then (response) ->
      console.log 'got user count:', response
      $scope.lastLogin = response.data.lastLogin

    $scope.update = ->
      $UserRepository.saveUser($scope.user).then (response) ->
        console.log 'saved user:', response
])

