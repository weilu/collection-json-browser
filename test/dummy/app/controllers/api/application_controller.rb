module Api
  class ApplicationController < ActionController::Base
    def index
      root = {
        collection: {
          version: "1.0",
          href: "/api",
          links: [
            {
              href: "/api/posts",
              rel: "posts",
              name: "posts",
              prompt: "My posts"
            },
            {
              href: "/assets/cat.gif",
              rel: "logo",
              render: "image"
            }
          ]
        }
      }

      render json: root
    end
  end
end
