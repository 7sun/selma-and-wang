class UserNotifier < ApplicationMailer
  default :from => 'selmaand@wang.com'

  def send_signup_email(user)
    @user = user
    mail( :to => @user.email,
    :subject => 'Thanks for Signing up!'
  end
end
