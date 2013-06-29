CollectionJsonBrowser::Engine.routes.draw do
  get '/', to: "home#index", as: :root
end
