class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :user_id
      t.integer :points
      t.string :language
      t.integer :lives
      t.integer :difficulty_level
      t.integer :stage

      t.timestamps
    end
  end
end
