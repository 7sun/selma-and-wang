class NotesController < ApplicationController
  def index
    @note = Note.all.order(created_at: :desc)
  end

  def new
    @note = Note.new
  end

  def create
    @note = Note.new(params.require(:note).permit(:name, :text))
    if @note.save
      redirect_to notes_path
    end
  end
end
