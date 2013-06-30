module Api
  class SessionsController < ApplicationController
    def new
      sign_in = {
        collection: {
          version: "1.0",
          href: "/api/sign_in",
          template: {
            data: [
              {
                name: "email",
                value: ""
              },
              {
                name: "password",
                value: ""
              },
              {
                name: "provider",
                value: "email"
              }
            ]
          }
        }
      }
      render json: sign_in
    end

    def create
    end
  end
end
