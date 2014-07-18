class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.integer :user_id
      t.integer :game_id
      t.integer :chat_id
      t.string :image
      t.string :language_from
      t.string :language_to
      t.string :input_text
      t.string :translation
      t.string :pronounciation_text
      t.string :sound

      t.timestamps
    end
  end
end
