'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('Collection JSON Browser', function() {

  beforeEach(function() {
    browser().navigateTo('/doc');
  });

  it('displays 2 links', function() {
    expect(repeater('.links tr').count()).toBe(2);
  });

  it('clicking on a links sets browser location', function() {
    element('.links a.authentication.email').click();
    expect(browser().location().url()).toBe('/api/sign_in');
    expect(repeater('.links tr').count()).toBe(0);
  });
});
