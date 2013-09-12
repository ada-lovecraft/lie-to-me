'use strict'

### Sevices ###
angular.module('app.repos')
.factory 'UserRepository', ['$http', ($http) ->
	getActiveUser: ->
		$http.get('/api/user')
	getLastLogin: ->
		$http.get('/api/user/lastLogin')
	getUserById: (id) ->
		$http.get('/api/user/' + id)
	saveUser: (user) ->
		$http.post('/api/user/update', user)


]