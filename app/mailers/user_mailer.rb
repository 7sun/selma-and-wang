class UserMailer < ApplicationMailer

  def welcome_email(email)

    @email = email
    mail(to: @user.email, subject: 'Welcome to Selma and Wang')
  end

end
