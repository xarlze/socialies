class AuthenticationController < ApplicationController

    # POST /auth/login
    def login
      @user = User.find_by_email(params[:email])
      if @user.authenticate(params[:password]) #authenticate method provided by Bcrypt and 'has_secure_password'
        token = JsonWebToken.encode(id: @user.id, user_id: @user.id, email:@user.email, first_name: @user.first_name, last_name: @user.last_name, description: @user.description, picture_url: @user.picture_url, gender: @user.gender)
        render json: { token: token }, status: :ok
      else
        render json: { error: 'unauthorized' }, status: :unauthorized
      end
    end
  
    private
  
    def login_params
      params.permit(:email, :password)
    end
  end