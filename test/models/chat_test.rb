# == Schema Information
#
# Table name: chats
#
#  id             :integer          not null, primary key
#  user_id        :integer
#  language       :string(255)
#  created_at     :datetime
#  updated_at     :datetime
#  user2_id       :integer
#  user2_language :integer
#

require 'test_helper'

class ChatTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
