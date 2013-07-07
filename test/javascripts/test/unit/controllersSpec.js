'use strict';

describe('ApiController', function(){
  var scope, ctrl, location, $httpBackend;
  var link = {
    href: "/api/sign_in",
    rel: "authentication",
    name: "email",
    prompt: "Sign in with email"
  };
  var image = {
    href: "/assets/cat.gif",
    rel: "My cat is cooler",
    render: "image"
  };
  var responseData = {
    collection: {
      version: "1.0",
      href: "/api",
      links: [ link, image ]
    }
  }

  beforeEach(inject(function(_$httpBackend_, $location, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    var root = "http://localhost:3000"
    $httpBackend.when('GET', '/api').respond(responseData);

    scope = $rootScope.$new();
    location = $location;
    ctrl = $controller(ApiController, {$scope: scope});
  }));

  it('sets collection model from the collection', function() {
    expect(scope.collection).toBeUndefined();
    $httpBackend.flush();

    expect(scope.collection).toEqual(responseData.collection);
  });

  it('sets the raw model from response data', function() {
    expect(scope.raw).toBeUndefined();
    $httpBackend.flush();

    expect(JSON.parse(scope.raw)).toEqual(responseData);
  });

  it('sets location path', function(){
    expect(location.path()).toEqual('');
    $httpBackend.flush();

    expect(location.path()).toEqual('/api')
  })
});
