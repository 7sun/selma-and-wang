class UserMailer < ApplicationMailer

  # Send a welcome email
  # UserMailer.welcome_email(user).deliver_now
  def welcome_email(user)
    @user = user
    @url = 'http://www.selmaandwang.com'
    mail(to: @user.email, subject: 'Welcome to Selma and Wang')
  end

end
