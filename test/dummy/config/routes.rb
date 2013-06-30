Rails.application.routes.draw do
  mount CollectionJsonBrowser::Engine => "/doc"

  namespace :api do
    get '/', to: 'application#index'
    get 'sign_in', to: 'sessions#new'
    post 'sign_in', to: 'sessions#create'
  end
end
