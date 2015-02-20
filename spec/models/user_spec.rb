require 'rails_helper'

RSpec.describe User, type: :model do
  it "has a valid facory" do
    expect(build(:user)).to be_valid
  end

  it "is invalid without an email" do
    user = build(:user)
    user.email = nil;
    expect(user).to be_invalid
  end

  it "is invalid without properly formatted email" do
    user = build(:user)
    user.email = 'email'
    expect(user).to be_invalid

    user.email = 'email.com'
    expect(user).to be_invalid

    user.email = 'email@domain'
    expect(user).to be_invalid

    user.email = 'email@domain..com'
    expect(user).to be_invalid

    user.email = 'email@string@domain.com'
    expect(user).to be_invalid
  end

  it "is invalid if email is not unique" do
    user = create(:user)
    user2 = build(:user)
    user2.email = user.email
    expect(user2).to be_invalid
  end

end
