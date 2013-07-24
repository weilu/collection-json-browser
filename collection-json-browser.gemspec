$:.push File.expand_path("../lib", __FILE__)

# Maintain your gem's version:
require "collection-json-browser/version"

# Describe your gem and declare its dependencies:
Gem::Specification.new do |s|
  s.name        = "collection-json-browser"
  s.version     = CollectionJsonBrowser::VERSION
  s.authors     = ["Wei Lu"]
  s.email       = ["luwei.here@gmail.com"]
  s.homepage    = "https://github.com/weilu/collection-json-browser"
  s.summary     = "A rails plugin for browsing a collection json API"
  s.description = "It looks for APIs under /api. This will be configureable in the future."
  s.license     = "MIT"

  s.files = Dir["{app,config,db,lib}/**/*"] + ["MIT-LICENSE", "Rakefile", "README.rdoc"]
  s.test_files = Dir["test/**/*"]

  s.add_dependency "rails", "~> 3.2.13"

  s.add_development_dependency "sqlite3"
end
