class UsersController < ApplicationController

  def index
    # Should only be visible by admin.
    @users = User.all
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)
    if @user.valid?
      if @user.save
        # temporary path until landing page is built
        redirect_to root_path
      else
        render :new
      end
    end
  end

  def show
    @user = User.find(:id)
  end

private

  def user_params
    params.require(:user).permit(:email, :password, :password_confirmation)
  end

end