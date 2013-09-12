angular.module('partials', [])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/nav.html', [
'',
'<ul class="nav navbar-nav">',
'  <li ng-class="getClass(\'/mock/1234\')"><a href="#/mock/1234">Mock Example</a></li>',
'  <li ng-class="getClass(\'/fixture\')"><a href="#/fixture">Fixture Example</a></li>',
'</ul>',''].join("\n"));
}])
.run(['$templateCache', function($templateCache) {
  return $templateCache.put('/partials/userPartial.html', [
'',
'<h1>Method: {{method}}</h1>',
'<p>Last Login: {{lastLogin | date:\'short\'}}</p>',
'<form name="userForm" class="form-horizontal">',
'  <div class="form-group">',
'    <div class="col-md-6">',
'      <label>First Name</label>',
'      <input type="text" ng-model="user.firstName" ng-readonly="{true: \'\', false: \'readonly\'}[canEdit]" class="form-control">',
'    </div>',
'    <div class="col-md-6">',
'      <label>Last Name</label>',
'      <input type="text" ng-model="user.lastName" ng-readonly="{true: \'\', false: \'readonly\'}[canEdit]" class="form-control">',
'    </div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-md-6">',
'      <div class="input-group">',
'        <div class="input-group-addon"><span>Twitter Handle</span></div>',
'        <input type="text" ng-model="user.twitter" ng-readonly="{true: \'\', false: \'readonly\'}[canEdit]" class="form-control">',
'      </div>',
'    </div>',
'    <div class="col-md-6"><a ng-href="http://twitter.com/{{user.twitter}}">',
'        <button class="btn btn-info col-md-12">Follow @{{user.twitter}} on Twitter</button></a></div>',
'  </div>',
'  <div class="form-group">',
'    <div class="col-md-6">',
'      <div class="input-group">',
'        <div class="input-group-addon"><span>User ID</span></div>',
'        <input type="text" ng-model="user.id" readonly class="form-control">',
'      </div>',
'    </div>',
'    <div class="col-md-6">',
'      <button ng-click="update()" ng-show="canEdit" ng-disabled="userForm.$pristine" class="form-control btn btn-primary">Update User</button>',
'    </div>',
'  </div>',
'</form>',''].join("\n"));
}]);