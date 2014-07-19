class ChatsController < ApplicationController

  def index
    @chats = @current_user.chats
  end

  def create
    chat = Chat.create :language => params[:language]
    @current_user.chats << chat
    render :json => chat #send back a json object to the browser
  end

  def new
    @chat = Chat.new
  end

  def edit
    @chat = Chat.find params[:id]
  end

  def show
    @chat = Chat.find params[:id]
  end

  def update
    @message = Message.new
    @chat = Chat.find params[:id]
    @chat.save
  end

  def destroy
    chat = Chat.find params[:id]
    chat.destroy
    render :text => 'okay'
  end
end