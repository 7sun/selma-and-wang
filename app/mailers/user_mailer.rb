class UserMailer < ApplicationMailer

  def welcome_email(email)

    @email = email
    mail(to: @email.email, subject: 'Welcome to Selma and Wang')
  end

end
