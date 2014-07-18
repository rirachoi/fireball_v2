class CreateMessages < ActiveRecord::Migration
  def change
    create_table :messages do |t|
      t.string :user_id
      t.string :image
      t.string :language_from
      t.string :language_to
      t.string :input_text
      t.string :translation
      t.string :pronounciation
      t.string :sound

      t.timestamps
    end
  end
end
