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
          },
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
