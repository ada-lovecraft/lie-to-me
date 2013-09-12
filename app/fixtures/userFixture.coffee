fixtures = angular.module('app.fixtures')
.factory 'UserFixture', ->
	return {
		getUser: -> 
			firstName: 'Jeremy'
			lastName: 'Dowell'
			twitter: 'codevinsky'
			id: Math.floor(Math.random() * 100)
		getLastLogin: ->
			return new Date()
	}