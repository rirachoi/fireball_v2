class GamesController < ApplicationController

  def index
    @games = @current_user.games
  end

  def create
    @game = Game.create
    @current_user.games << @game
    redirect_to games_path
  end

  def new
    @game = Game.new
  end

  def edit
    @game = Game.find params[:id]
  end

  def show
    @game = Game.find params[:id]
  end

  def update # NEEDS MORE THINGS!!!!!
    @game = Game.new
    @game = Game.find params[:id]
    @game.save
    redirect_to games_path
  end

  def destroy
    @game = Game.find params[:id]
    @game.destroy
    redirect_to games_path
  end
end