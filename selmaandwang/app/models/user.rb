class User < ActiveRecord::Base
  has_secure_password

  validates :email, presence: true, uniqueness: true, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i, on: :create }
  validates :password_confirmation, presence: true

  def self.find_or_create_from_auth_hash(auth)
      where(provider: auth.provider, uid: auth.uid).first_or_create do |user|
        user.provider               = auth.provider 
        user.uid                    = auth.uid
        user.email                  = auth.info.email
        user.first_name             = auth.info.first_name
        user.last_name              = auth.info.last_name
        user.image                  = auth.info.image
        user.token                  = auth.credentials.token
        user.expires_at             = Time.at(auth.credentials.expires_at)
        user.password               = rand(10**20).to_s
        user.password_confirmation  = user.password
        user.save!
      end
  end

end
