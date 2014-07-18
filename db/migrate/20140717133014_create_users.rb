class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :avatar
      t.string :default_language
      t.integer :skill_level

      t.timestamps
    end
  end
end
