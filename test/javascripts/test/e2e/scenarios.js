'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Collection JSON Browser', function() {
  beforeEach(function() {
    browser().navigateTo('/doc');
  });

  it('displays 2 links', function() {
    expect(repeater('.links tr a').count()).toBe(2);
  });

  describe('clicking on sign_in link', function(){
    beforeEach(function() {
      element(".links a:contains('sign_in')").click();
    });

    it('sets and displays browser location', function() {
      expect(browser().location().url()).toBe('/api/sign_in');
      expect(element("#href").val()).toEqual('/api/sign_in')
      expect(repeater('.links tr a').count()).toBe(0);
    });

    it('displays a form when the response contains a template', function() {
      expect(element("form[action='/api/sign_in']")).toBe()
      expect(element("form input#email")).toBe()
      expect(element("form input#password")).toBe()
      expect(element("form input#provider").val()).toEqual('email')
      expect(element("form button[type=submit]")).toBe()
    });

    it('lists collection items when the form is submitted successfully', function(){
      //TODO: figure out how to test this
      //input('field.value').enter('jake@example.com')
      //input('field.value').enter('42')
      element('#email').attr('value', 'jake@example.com')
      element('#password').attr('value', '42')

      element("form button[type=submit]").click()

      expect(repeater('ul .item').count()).toBe(1);

      expect(repeater("tr.data", "data").column('data.name')).toEqual(['token'])
      expect(repeater("tr.data", "data").column('data.prompt')).toEqual(['Token'])
      expect(repeater("tr.data", "data").column('data.value')).toEqual(['1yxS9h8CKxhaeuAUu73g'])
    })
  })

});
