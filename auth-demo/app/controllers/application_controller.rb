class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def after_sign_in_path_for(resource)
    if request.env["PATH_INFO"].include? "callback"
      t = Time.now.to_i.to_s

      "http://localhost:8080/callback.html?email=#{resource.email}&token=#{resource.token}&t=#{t}"
    else
      stored_location_for(resource) || root_path
    end
  end

  private

    def authenticate_user!(params = {})
      authenticate_with_http_token do |token, options|
        user_email = options['email'].presence
        user       = user_email && User.find_by_email(user_email)

        if user && Devise.secure_compare(user.authentication_token, token)
          sign_in user, store: false
        end
      end
    end
end
