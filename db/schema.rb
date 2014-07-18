# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140718002515) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "chats", force: true do |t|
    t.integer  "user_id"
    t.string   "language"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "games", force: true do |t|
    t.integer  "user_id"
    t.integer  "points"
    t.string   "language"
    t.integer  "lives"
    t.integer  "difficulty_level"
    t.integer  "stage"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "messages", force: true do |t|
    t.integer  "user_id"
    t.integer  "game_id"
    t.integer  "chat_id"
    t.string   "image"
    t.string   "language_from"
    t.string   "language_to"
    t.string   "input_text"
    t.string   "translation"
    t.string   "pronounciation_text"
    t.string   "sound"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "username"
    t.string   "email"
    t.string   "password_digest"
    t.string   "avatar"
    t.string   "native_language", default: "en"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
