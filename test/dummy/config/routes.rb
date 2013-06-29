Rails.application.routes.draw do
  mount CollectionJsonBrowser::Engine => "/doc"
end
