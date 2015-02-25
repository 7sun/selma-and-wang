require 'rails_helper'

RSpec.describe UsersController, type: :controller do

  describe 'GET index' do
    let(:user1) { create(:user) }
    let(:user2) { create(:user, email: "seconduser@email.com") }

    before(:each) { 
      get :index
    }

    it "is successful" do
      expect( response ).to be_success # 200
    end

    it "assigns all the users to be included in users" do
      expect( assigns(:users) ).to include(user1, user2)
    end

    it "renders the index view file" do
      expect(response).to render_template(:index)
    end
  end

  describe 'GET new' do

    before(:each) { 
      get :new
    }

    it "is successful" do
      expect( response ).to be_success # 200
    end

    it "renders the new view file" do
      expect( response ).to render_template(:new)
    end

    it "assigns a new user to variable user" do
      expect( assigns(:user) ).to be_a(User)
    end

    it "does not save a new user record" do
      expect{ get :new }.to change(User, :count).by(0)
    end
  end

end
