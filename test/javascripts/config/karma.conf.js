basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  '../../app/assets/javascripts/collection_json_browser/angular.min.js',
  'test/lib/angular/angular-mocks.js',
  '../../app/assets/javascripts/collection_json_browser/angular/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Chrome'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
