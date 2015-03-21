class EmailsController < ApplicationController
  def create 
    @email = Email.new(params.require(:email).permit(:email))
    if @email.save
      UserMailer.welcome_email(@email).deliver_now
      redirect_to root_path
    end
  end
end
