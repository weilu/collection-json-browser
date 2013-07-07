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
          ],
          items: [
            {
              href: "/api/posts/1",
              rel: "post",
              prompt: "Post",
              data: [
                {
                  name: "title",
                  prompt: "Post title",
                  value: params[:title]
                },
                {
                  name: "content",
                  prompt: "Post content",
                  value: params[:content]
                },
                {
                  name: "category",
                  prompt: "Post category",
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
            },
            {
              href: "/api/posts/2",
              rel: "post",
              prompt: "Post",
              data: [
                {
                  name: "title",
                  prompt: "Post title",
                  value: params[:title]
                },
                {
                  name: "content",
                  prompt: "Post content",
                  value: params[:content]
                },
                {
                  name: "category",
                  prompt: "Post category",
                  value: params[:category]
                }
              ],
              links: [
                {
                  href: "/api/posts/2/edit",
                  rel: "edit-form",
                  name: "post",
                  prompt: "Edit post"
                },
                {
                  href: "/api/posts/2/comments",
                  rel: "comments",
                  name: "comments",
                  prompt: "Comments"
                }
              ]
            }
          ]
        }
      }

      render json: root
    end
  end
end
