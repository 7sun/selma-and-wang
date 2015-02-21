class SessionsController < ApplicationController

  def create
    user = User.find_by(email: params[:user][:email])
    # checks that user exists and password matches user's account
    if user && user.authenticate(params[:user][:password])
      # shows user welcome message
      flash[:success] = 'Welcome back!'
      # Creates a session 'user_id' that matches the current user's id
      session[:user_id] = user.id.to_s
      # Redirect to /
      redirect_to root_path
    else
      # Show user login failure message
      flash[:danger] = 'Your username and password do not match our records :('
      #  Redirect to login page to attempt login again
      redirect_to login_path
    end
  end

  def destroy
    session[:user_id] = nil
    redirect_to login_path
  end


end