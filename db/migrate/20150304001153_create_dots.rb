class CreateDots < ActiveRecord::Migration
  def change
    create_table :dots do |t|
      t.integer :count

      t.timestamps null: false
    end
  end
end
