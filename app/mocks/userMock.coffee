mocks = angular.module('app.mocks')
.factory 'UserMock', ->
	@user = 
		firstName: 'Jeremy'
		lastName: 'Dowell'
		twitter: 'codevinsky'
		id: Math.floor( Math.random() * 100 )
	return {
		getActiveUser: =>
			console.log 'getting active user'
			return @user
		getUserById: (id) =>
			console.log 'getting user by id:', id
			@user.id = id
			return @user
		getLastLogin:  ->
			console.log 'getting last login'
			return { lastLogin: new Date() }
		saveUser: (data) =>
			@user = data
			console.log 'saving user:', @user
			return @user
	}