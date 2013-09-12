'use strict';
var App;

angular.module('app.mocks', []);

angular.module('app.fixtures', []);

angular.module('app.repos', []);

App = angular.module('app', ['ngCookies', 'ngResource', 'ngRoute', 'ngMockE2E', 'app.controllers', 'app.fixtures', 'app.mocks', 'app.repos', 'partials']);

App.run([
  '$httpBackend', 'UserMock', '$q', function($httpBackend, $UserMock, $q) {
    $httpBackend.whenGET('/api/user').respond($UserMock.getActiveUser());
    $httpBackend.whenGET('/api/user/lastLogin').respond($UserMock.getLastLogin());
    $httpBackend.whenGET(/\/api\/user\/(\d+)$/).respond(function(method, url, data, header) {
      var id;
      id = url.match(/(\d+)$/)[0];
      data = $UserMock.getUserById(id);
      console.log('data:', data);
      return [200, data];
    });
    return $httpBackend.whenPOST('/api/user/update').respond(function(method, url, data, header) {
      return [200, $UserMock.saveUser(data)];
    });
  }
]);

App.config([
  '$routeProvider', '$locationProvider', function($routeProvider, $locationProvider, config) {
    $routeProvider.when('/mock/:id', {
      templateUrl: '/partials/userPartial.html',
      controller: 'UserMockController'
    }).when('/fixture', {
      templateUrl: '/partials/userPartial.html',
      controller: 'UserFixtureController'
    }).otherwise({
      redirectTo: '/mock/1234'
    });
    return $locationProvider.html5Mode(false);
  }
]);
var fixtures;

fixtures = angular.module('app.fixtures').factory('UserFixture', function() {
  return {
    getUser: function() {
      return {
        firstName: 'Jeremy',
        lastName: 'Dowell',
        twitter: 'codevinsky',
        id: Math.floor(Math.random() * 100)
      };
    },
    getLastLogin: function() {
      return new Date();
    }
  };
});
var mocks;

mocks = angular.module('app.mocks').factory('UserMock', function() {
  var _this = this;
  this.user = {
    firstName: 'Jeremy',
    lastName: 'Dowell',
    twitter: 'codevinsky',
    id: Math.floor(Math.random() * 100)
  };
  return {
    getActiveUser: function() {
      console.log('getting active user');
      return _this.user;
    },
    getUserById: function(id) {
      console.log('getting user by id:', id);
      _this.user.id = id;
      return _this.user;
    },
    getLastLogin: function() {
      console.log('getting last login');
      return {
        lastLogin: new Date()
      };
    },
    saveUser: function(data) {
      _this.user = data;
      console.log('saving user:', _this.user);
      return _this.user;
    }
  };
});
'use strict';
/* Controllers*/

angular.module('app.controllers', []).controller('AppCtrl', [
  '$scope', '$location', '$resource', '$rootScope', function($scope, $location, $resource, $rootScope) {
    $scope.$location = $location;
    $scope.$watch('$location.path()', function(path) {
      return $scope.activeNavId = path || '/';
    });
    return $scope.getClass = function(id) {
      if ($scope.activeNavId.substring(0, id.length) === id) {
        return 'active';
      } else {
        return '';
      }
    };
  }
]).controller('UserFixtureController', [
  '$scope', 'UserFixture', function($scope, $UserFixture) {
    $scope.method = "Fixture";
    $scope.user = $UserFixture.getUser();
    $scope.lastLogin = $UserFixture.getLastLogin();
    return $scope.canEdit = false;
  }
]).controller('UserMockController', [
  '$scope', '$routeParams', 'UserRepository', function($scope, $routeParams, $UserRepository) {
    $scope.method = "$httpBackend";
    $scope.canEdit = true;
    $UserRepository.getActiveUser().then(function(response) {
      return console.log('got active user:', response);
    });
    $UserRepository.getUserById($routeParams.id).then(function(response) {
      console.log('got user:', response);
      return $scope.user = response.data;
    });
    $UserRepository.getLastLogin().then(function(response) {
      console.log('got user count:', response);
      return $scope.lastLogin = response.data.lastLogin;
    });
    return $scope.update = function() {
      return $UserRepository.saveUser($scope.user).then(function(response) {
        return console.log('saved user:', response);
      });
    };
  }
]);
'use strict';
/* Sevices*/

angular.module('app.repos').factory('UserRepository', [
  '$http', function($http) {
    return {
      getActiveUser: function() {
        return $http.get('/api/user');
      },
      getLastLogin: function() {
        return $http.get('/api/user/lastLogin');
      },
      getUserById: function(id) {
        return $http.get('/api/user/' + id);
      },
      saveUser: function(user) {
        return $http.post('/api/user/update', user);
      }
    };
  }
]);

//@ sourceMappingURL=app.js.map