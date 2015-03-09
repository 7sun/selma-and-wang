class DotsController < ApplicationController
  #to keep track of clicks per dot
  def counter
  # if the dot color doesn't exist create a row in the db for it and add one
    if Dot.find_by(dotid: params[:param1]) === nil
      @dot = Dot.new
      @dot.dotid = (params[:param1]) 
      @dot.count = 1
      @dot.save
      
    else
  # if the dot exists add one to the count
      @dot = Dot.find_by(dotid: params[:param1])
      @dot.count += 1
      @dot.save
     
    end
  end
end
