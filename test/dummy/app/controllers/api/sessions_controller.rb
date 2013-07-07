module Api
  class SessionsController < ApplicationController
    def new
      render json: sign_in
    end

    def create
      status = authenticate? ? sign_in_success : sign_in_failure
      render json: status
    end

    private

    def sign_in
      {
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
    end

    def sign_in_success
      {
        collection: {
          href: "/api/sign_in",
          items: [
            {
              data: [
                {
                  name: "token",
                  prompt: "Token",
                  value: "1yxS9h8CKxhaeuAUu73g"
                }
              ]
            }
          ],
            version: "1.0"
        }
      }
    end

    def sign_in_failure
      {
        collection: {
          errors: {
            base: [
              {
                message: "Invalid email or password."
              }
            ]
          },
          href: "/api/sign_in",
          version: "1.0"
        }
      }
    end

    def authenticate?
      params[:email].present? && params[:password] == '42' && params[:provider] == 'email'
    end
  end
end
