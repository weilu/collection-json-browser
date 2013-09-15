'use strict';

//helper functions from https://github.com/tomazy/angular-quiz/blob/master/test/e2e/lib/ng-scenario-dsl-ext.coffee
angular.scenario.dsl('modelInput', angular.scenario.dsl['input']);
angular.scenario.dsl('input', function() {
  var chain = {};
  chain.enter = function(value, event) {
    return this.addFutureAction("input '" + this.label + "' enter '" + value + "'", function($window, $document, done) {
      var input;
      input = $document.elements().filter(':input');
      input.val(value);
      input.trigger(event || 'input');
      return done();
    });
  };
  chain.val = function() {
    return this.addFutureAction("return input val", function($window, $document, done) {
      var input;
      input = $document.elements().filter(':input');
      return done(null, input.val());
    });
  };
  return function(selector, label) {
    this.dsl.using(selector, label);
    return chain;
  };
});

angular.scenario.dsl('modelSelect', angular.scenario.dsl['select']);
angular.scenario.dsl('select', function() {
  var chain = {};
  chain.option = function(value) {
    return this.addFutureAction("select '" + this.name + "' option '" + value + "'", function($window, $document, done) {
      var select = $document.elements();
      var option = select.find('option[value="' + value + '"]');
      if (option.length) {
        select.val(value);
      } else {
        option = select.find('option').filter(function(){
          return this.text === value;
        });
        if (!option.length) {
          option = select.find('option:contains("' + value + '")');
        }
        if (option.length) {
          select.val(option.val());
        } else {
            return done("option '" + value + "' not found");
        }
      }
      select.trigger('change');
      done();
    });
  };

  chain.options = function() {
    var values = arguments;
    return this.addFutureAction("select '" + this.name + "' options '" + values + "'", function($window, $document, done) {
      var select = $document.elements();
      select.val(values);
      select.trigger('change');
      done();
    });
  };

  return function(selector) {
    this.name = selector;
    this.dsl.using(selector);
    return chain;
  };
});

describe('Collection JSON Browser', function() {
  beforeEach(function() {
    browser().navigateTo('/doc');
  });

  it('displays 1 link', function() {
    expect(repeater('.links tr a').count()).toBe(1);
  });

  it('displays 1 image', function() {
    expect(repeater('.links tr img').count()).toBe(1);
  });

  it('displays response status', function() {
    expect(element('.status').text()).toMatch(/\s200\s/);
  });

  describe('clicking on posts link', function(){
    beforeEach(function() {
      element(".links a:contains('posts')").click();
    });

    it('displays a link to home', function() {
      element('.nav a').click()
      expect(browser().location().url()).toBe('/api');
    });

    it('sets and displays browser location', function() {
      expect(browser().location().url()).toBe('/api/posts');
      expect(element("#href").val()).toEqual('/api/posts')
      expect(repeater('.links tr a').count()).toBe(0);
    });

    it('displays a form when the response contains a template', function() {
      expect(element("form input#title").count()).toEqual(1)
      expect(element("form input#content").count()).toEqual(1)
      expect(element("form select#category").count()).toEqual(1)
      expect(element("form button[type=submit]").count()).toEqual(1)
    });

    describe('lists items', function() {
      it('lists alls', function() {
        expect(repeater('ol .item').count()).toBe(2);
      })

      it('lists items with their respective GET links', function() {
        expect(element('ol .item dl dd.get a').text()).toEqual('/api/posts/1/api/posts/2')
      })

      it('lists items with their respective DELETE links', function() {
        expect(element('ol .item dl dd.delete a').text()).toEqual('delete /api/posts/1delete /api/posts/2')
      })
    })

    describe('form', function() {
      describe('selecting an item to update', function() {
        it('fetches and populates form with template data', function() {
          select('#item-to-update').option('/api/posts/2')
          expect(element('#item-to-update').val()).toEqual('2')
          // expect(element('#item-to-update').val()).toEqual('/api/posts/2')
          expect(element('#title').val()).toEqual('title 2')
          expect(element('#content').val()).toEqual('content 2')
          expect(element('#category').attr('value')).toEqual('1')
          // expect(element('#category').attr('value')).toEqual('javascript')

          element("form button[type=submit]").click()
          expect(repeater('ol .item').count()).toBe(1);
        })
      })

      describe('creating an item', function() {
        it('list the created item under collection items when the form is submitted successfully', function(){
          input('#title').enter('Ruby and Angular')
          input('#content').enter('Happily ever after')
          select('#category').option('ruby')

          element("form button[type=submit]").click()

          expect(repeater('ol .item').count()).toBe(1);

          var data = repeater("tr.data")
          expect(data.row(0)).toEqual(['title', 'Post title', 'Ruby and Angular'])
          expect(data.row(1)).toEqual(['content', 'Post content', 'Happily ever after'])
          expect(data.row(2)).toEqual(['category', 'Post category', 'ruby'])

          var links = repeater(".item-links tr")
          expect(links.row(1)).toEqual(['edit-form', 'post', 'Edit post', '/api/posts/1/edit'])
          expect(links.row(2)).toEqual(['comments', 'comments', 'Comments', '/api/posts/1/comments'])
        })
      })
    })
  })
});
