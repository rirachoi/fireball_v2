# == Schema Information
#
# Table name: messages
#
#  id             :integer          not null, primary key
#  user_id        :string(255)
#  image          :string(255)
#  language_from  :string(255)
#  language_to    :string(255)
#  input_text     :string(255)
#  translation    :string(255)
#  pronounciation :string(255)
#  sound          :string(255)
#  created_at     :datetime
#  updated_at     :datetime
#

require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
