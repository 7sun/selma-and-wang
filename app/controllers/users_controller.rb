class UsersController < ApplicationController

  def index
    # Should only be visible by admin. Need to update
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      if @user.save
        session[:user_id] = @user.id.to_s
        flash[:info] = "Welcome to the world of Selma and Wang!"
        UserMailer.welcome_email(@user).deliver
        redirect_to root_path
      end
    else
      # Need to add forgot password function and link
      flash[:error] = "You are already registered. Please login instead."
      render :new
    end
  end

  def show
    @user = User.find(params[:id])
  end

private

  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation)
  end

end