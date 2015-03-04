class DotsController < ApplicationController
  def counter
    @dot = Dot.new
    @dot.count = (params[:param1]) 
    @dot.save
  end
end
