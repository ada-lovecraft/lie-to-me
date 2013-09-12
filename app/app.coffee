'use strict'

# Declare app level module which depends on filters, and services
angular.module('app.mocks', [])
angular.module('app.fixtures', [])
angular.module('app.repos', [])

App = angular.module('app', [
  'ngCookies'
  'ngResource'
  'ngRoute'
  'ngMockE2E'
  'app.controllers'
  'app.fixtures'
  'app.mocks'
  'app.repos'
  'partials'
])

App.run ['$httpBackend','UserMock','$q', ($httpBackend, $UserMock, $q) -> 
  

  #Route for GET /api/user/
  $httpBackend.whenGET('/api/user').respond($UserMock.getActiveUser())

  #Route for GET /api/users/total
  $httpBackend.whenGET('/api/user/lastLogin').respond($UserMock.getLastLogin())


  # Route for GET /api/user/:id
  $httpBackend.whenGET(/\/api\/user\/(\d+)$/).respond (method, url, data, header) ->
    id = url.match(/(\d+)$/)[0]
    data = $UserMock.getUserById(id)
    console.log 'data:',data
    return [
      200, # status code
      data # data object
    ]

  # Route for POST /api/user/update
  $httpBackend.whenPOST('/api/user/update').respond (method, url, data, header) ->
    return [200, $UserMock.saveUser(data) ]
]

App.config([
  '$routeProvider'
  '$locationProvider'

($routeProvider, $locationProvider, config) ->

  $routeProvider

    .when('/mock/:id', {
      templateUrl: '/partials/userPartial.html', 
      controller: 'UserMockController'
    })
    .when('/fixture', {
      templateUrl: '/partials/userPartial.html'
      controller: 'UserFixtureController'
    })

    # Catch all
    .otherwise({redirectTo: '/mock/1234'})

  # Without server side support html5 must be disabled.
  $locationProvider.html5Mode(false)
])
