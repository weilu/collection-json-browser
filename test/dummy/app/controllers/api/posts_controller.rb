module Api
  class PostsController < ApplicationController
    def index
      render json: new_post
    end

    def create
      status = success? ? post_create_success : post_create_failure
      render json: status
    end

    private

    def new_post
      {
        collection: {
          version: "1.0",
          href: "/api/posts",
          template: {
            data: [
              {
                name: "title",
                value: ""
              },
              {
                name: "content",
                value: ""
              },
              {
                name: "category",
                value: "",
                options: ['ruby', 'javascript']
              }
            ]
          }
        }
      }
    end

    def post_create_success
      {
        collection: {
          href: "/api/posts",
          items: [
            {
              href: "/api/posts/1",
              rel: "post",
              prompt: "Post",
              data: [
                {
                  name: "title",
                  value: params[:title]
                },
                {
                  name: "content",
                  value: params[:content]
                },
                {
                  name: "category",
                  value: params[:category]
                }
              ],
              links: [
                {
                  href: "/api/posts/1/edit",
                  rel: "edit-form",
                  name: "post",
                  prompt: "Edit post"
                },
                {
                  href: "/api/posts/1/comments",
                  rel: "comments",
                  name: "comments",
                  prompt: "Comments"
                }
              ]
            }
          ],
            version: "1.0"
        }
      }
    end

    def post_create_failure
      {
        collection: {
          errors: {
            base: [
              {
                message: "Invalid category"
              }
            ]
          },
          href: "/api/posts",
          version: "1.0"
        }
      }
    end

    def success?
      ['ruby', 'javascript'].include? params[:category]
    end
  end
end
