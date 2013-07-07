'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Collection JSON Browser', function() {
  beforeEach(function() {
    browser().navigateTo('/doc');
  });

  it('displays 1 link', function() {
    expect(repeater('.links tr a').count()).toBe(1);
  });

  it('displays 1 image', function() {
    expect(repeater('.images img').count()).toBe(1);
  });

  it('displays response status', function() {
    expect(element('.status').text()).toMatch(/\s200\s/);
  });

  describe('clicking on posts link', function(){
    beforeEach(function() {
      element(".links a:contains('posts')").click();
    });

    it('sets and displays browser location', function() {
      expect(browser().location().url()).toBe('/api/posts');
      expect(element("#href").val()).toEqual('/api/posts')
      expect(repeater('.links tr a').count()).toBe(0);
    });

    it('displays a form when the response contains a template', function() {
      expect(element("form[action='/api/posts']")).toBe()
      expect(element("form input#title")).toBe()
      expect(element("form input#content")).toBe()
      expect(element("form input#category")).toBe()
      expect(element("form button[type=submit]")).toBe()
    });

    it('lists collection items when the form is submitted successfully', function(){
      //TODO: figure out how to test this
      input('field.value').enter('Ruby and Angular')
      input('field.value').enter('Happily ever after')
      input('field.value').enter('ruby')
      //element('#title').attr('value', 'Ruby and Angular')
      //element('#content').attr('value', 'Happily ever after')
      //element('#category').attr('value', 'ruby')

      element("form button[type=submit]").click()

      expect(repeater('ol .item').count()).toBe(1);

      var data = repeater("tr.data")
      //expect(r.row(0)).toEqual(['title', 'Post title', 'Ruby and Angular'])
      //expect(r.row(1)).toEqual(['content', 'Post content', 'Happily ever after'])
      expect(data.row(2)).toEqual(['category', 'Post category', 'ruby'])

      var links = repeater(".links tr")
      expect(links.row(1)).toEqual(['edit-form', 'post', 'Edit post', '/api/posts/1/edit'])
      expect(links.row(2)).toEqual(['comments', 'comments', 'Comments', '/api/posts/1/comments'])
    })
  })

});
