class ChatsController < ApplicationController

  def index
    @chats = @current_user.chats
  end

  def create
    @chat = Chat.create
    @current_user.chats << @chat
    redirect_to chats_path
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
    @chat = Chat.find params[:id]
    @chat.destroy
    redirect_to chats_path
  end
end