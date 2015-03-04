class DotsController < ApplicationController
  def counter
    if Dot.find_by(dotid: params[:param1]) === nil
      @dot = Dot.new
      @dot.dotid = (params[:param1]) 
      @dot.count = 1
      @dot.save
      
    else
      @dot = Dot.find_by(dotid: params[:param1])
      @dot.count += 1
      @dot.save
     
    end
  end
end
