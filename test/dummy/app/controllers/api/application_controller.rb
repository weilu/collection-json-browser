module Api
  class ApplicationController < ActionController::Base
    def index
      root = {
        collection: {
          version: "1.0",
          href: "/api",
          links: [
            {
              href: "/api/sign_in",
              rel: "authentication",
              name: "email",
              prompt: "Sign in with email"
            },
            {
              href: "/api/sign_up",
              rel: "registration",
              name: "email",
              prompt: "Sign up with email"
            }
          ]
        }
      }

      render json: root
    end
  end
end
