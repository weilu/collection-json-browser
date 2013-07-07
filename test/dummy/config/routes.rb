Rails.application.routes.draw do
  mount CollectionJsonBrowser::Engine => "/doc"

  namespace :api do
    get '/', to: 'application#index'
    resources :posts
  end
end
