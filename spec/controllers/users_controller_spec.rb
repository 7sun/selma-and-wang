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

  describe "POST create" do
    context "when form is valid" do
      let!(:valid_attrs) { attributes_for(:user) }

      it "adds a new user record" do
        expect{ post :create, user: valid_attrs}.to change(User, :count).by(1)
      end

      it "redirects to index" do
        post :create, user: valid_attrs
        expect( response).to redirect_to root_path
      end
    end

    context "when form is invalid" do
      let!(:evil_attrs) do
       { first_name: nil, last_name: nil, email: nil, password: nil, password_confirmation: nil }
      end

      it "does not add a new user record" do
        expect{ post :create, user: evil_attrs}.to change(User, :count).by(0)
      end

      it "renders new template" do
        post :create, user: evil_attrs
        expect( response).to render_template(:new)
      end
    end
  end

  describe "GET show" do
    let!(:user) { create(:user) }

    before(:each) { 
      get :show, id: user.id
    }

    it "is successful" do
      expect( response ).to be_success
    end

    it "renders the show view file" do
      expect( response ).to render_template(:show)
    end

    it "assigns the requested user to a variable user" do
      expect( assigns(:user) ).to eq(user)
    end
  end


end
