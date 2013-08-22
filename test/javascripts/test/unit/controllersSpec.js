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
      items: [ getItem(1), getItem(2) ],
      template: {
        data: [
          {name: ''},
          {age: 2}
        ]
      }
    }
  }

  function getItem(i){
    return {
      href: "/api/posts/" + i,
      rel: "post",
      prompt: "Post",
      data: [{
        name: "title",
        prompt: "Post title",
        value: "awesome post " + i
      }]
    }
  }

  beforeEach(inject(function(_$httpBackend_, $location, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    var root = "http://localhost:3000"
    $httpBackend.when('GET', '/api').respond(responseData);
    $httpBackend.when('GET', '/api/posts').respond(responseData);
    $httpBackend.when('POST', '/api').respond(responseData);
    $httpBackend.when('PUT', '/api/posts/1').respond(responseData);
    $httpBackend.when('DELETE', '/api/posts/1').respond(responseData);

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

  it('sets the itemPaths from response data', function() {
    expect(scope.itemPaths).toBeUndefined();
    $httpBackend.flush();

    var href1 = getItem(1).href
    var href2 = getItem(2).href
    expect(scope.itemPaths).toEqual(
      [
        {name: "-- None (POST create) --", value: ""},
        {name: href1, value: href1},
        {name: href2, value: href2}
      ]
    );
  });

  it('sets location path', function(){
    expect(location.path()).toEqual('');
    $httpBackend.flush();

    expect(location.path()).toEqual('/api')
  })

  describe('#goTo', function(){
    beforeEach(function(){
      spyOn(location, 'url')
    })

    it('stores fromRel', function(){
      scope.goTo('/api/posts', 'some-rel')
      expect(scope.fromRel).toEqual('some-rel')
    })

    it('sets location path', function(){
      scope.goTo('/api/posts', 'some-rel')
      $httpBackend.flush();
      expect(location.url).toHaveBeenCalledWith('/api/posts')
    })
  })

  describe('#submit', function(){
    beforeEach(function(){
      scope.collection = responseData.collection
    })

    it('post the form when fromRel is not edit-form', function(){
      $httpBackend.expectPOST('/api')

      scope.fromRel = 'some-stuff'
      scope.submit()

      $httpBackend.flush()
    })

    it('put the form when fromRel is edit-form', function(){
      spyOn(location, 'url').andReturn('/api/posts/1')
      $httpBackend.expectPUT('/api/posts/1')

      scope.fromRel = 'edit-form'
      scope.submit()

      $httpBackend.flush()
    })
  })

  describe('#destroy', function(){
    it('deletes the resource', function(){
      $httpBackend.expectDELETE('/api/posts/1')

      scope.destroy('/api/posts/1')

      $httpBackend.flush()
    })
  })
});
