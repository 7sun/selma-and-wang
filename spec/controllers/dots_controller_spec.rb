require 'rails_helper'

RSpec.describe DotsController, type: :controller do

  describe "GET #counter" do
    it "returns http success" do
      get :counter
      expect(response).to have_http_status(:success)
    end
  end

end
