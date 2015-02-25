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

  # describe 'GET show' do
  #   let!(:yogurt) { Yogurt.create!(flavor: 'ny cheese cake', topping: 'strawberries', quantity: 11.9) }
  #   let!(:not_the_yogurt) { Yogurt.create!(flavor: 'not ny cheese cake', topping: 'coal', quantity: 1.0) }

  #   before(:each) {
  #     get :show, id: yogurt.id
  #   }

  #   it "is successful" do
  #     expect( response ).to be_success # 200
  #   end

  #   it "renders the show view file" do
  #     expect( response ).to render_template(:show)
  #   end

  #   it "assigns the requested yogurt to a variable yogurt" do
  #     expect( assigns(:yogurt) ).to eq(yogurt)
  #   end
  # end

end
