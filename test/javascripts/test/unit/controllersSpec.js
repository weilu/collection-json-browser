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
      links: [ link, image ],
      template: {
        data: [
          {name: ''},
          {age: 2}
        ]
      }
    }
  }

  beforeEach(inject(function(_$httpBackend_, $location, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    var root = "http://localhost:3000"
    $httpBackend.when('GET', '/api').respond(responseData);
    $httpBackend.when('POST', '/api').respond(responseData);
    $httpBackend.when('PUT', '/api').respond(responseData);

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

  describe('#goTo', function(){
    beforeEach(function(){
      spyOn(location, 'path')
    })

    it('stores fromRel', function(){
      scope.goTo('/api/posts', 'some-rel')
      expect(scope.fromRel).toEqual('some-rel')
    })

    it('sets location path', function(){
      scope.goTo('/api/posts', 'some-rel')
      expect(location.path).toHaveBeenCalledWith('/api/posts')
    })
  })

  describe('#submit', function(){
    it('post the form when fromRel is not edit-form', function(){
      scope.collection = responseData.collection

      $httpBackend.expectPOST('/api')

      scope.fromRel = 'some-stuff'
      scope.submit()

      $httpBackend.flush()
    })

    it('put the form when fromRel is edit-form', function(){
      scope.collection = responseData.collection

      $httpBackend.expectPUT('/api')

      scope.fromRel = 'edit-form'
      scope.submit()

      $httpBackend.flush()
    })
  })
});
