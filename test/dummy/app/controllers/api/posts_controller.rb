module Api
  class PostsController < ApplicationController
    def index
      render json: new_post
    end

    def show
      id = params[:id].to_i
      render json: new_post(title: "title #{id}",
                            content: "content #{id}",
                            category: ['ruby', 'javascript'][id-1])
    end

    def create
      status = success? ? post_create_success : post_create_failure
      render json: status
    end

    def update
      puts "in update =====================>"
      render json: post_create_success
    end

    private

    def template options = {}
      {
        data: [ {
          name: "title",
          value: options[:title]
        },
        {
          name: "content",
          value: options[:content]
        },
        {
          name: "category",
          value: options[:category],
          array: ['ruby', 'javascript']
        } ]
      }
    end

    def new_post template_options = {}
      {
        collection: {
          version: "1.0",
          href: "/api/posts",
          template: template(template_options),
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
