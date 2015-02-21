require 'rails_helper'

RSpec.feature "UserSeesSignupPage", type: :feature do
  scenario "users sees signup page" do
    visit '/signup'
    expect(page).to have_content("Join the adventure")
  end

end
