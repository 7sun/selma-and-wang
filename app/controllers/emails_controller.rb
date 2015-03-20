class EmailsController < ApplicationController
  def create 
    @email = Email.new(params.require(:email).permit(:email))
    if @email.save
      redirect_to root_path
    end
  end
end
