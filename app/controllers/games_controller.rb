class GamesController < ApplicationController
  before_action :check_if_logged_in

  def index
    @games = @current_user.games.where(:completed => false).order(updated_at: :desc)
    @language_select = LANGUAGES
    @language_select = @language_select.invert.reject{|k,v| @current_user.native_language == k}.invert
  end

  def create
    game = Game.create :language => params[:language], :points => params[:points], :lives => params[:lives], :stage => params[:stage], :difficulty_level => params[:difficulty_level]
    @current_user.games << game
    render :json => game
  end

  def show
    @game = Game.find params[:id]
  end

  def start_game
    @questions = set_up_questions # we're expecting a hash
    render :json => @questions
  end

  def end_game
    game = Game.find (params[:id])
    game.update(:points => params[:points], :completed => true)
    render :json => game
  end

  def destroy
    @game = Game.find params[:id]
    @game.destroy
    render :text => 'very wow'
  end

  private

  def set_up_questions
    game = Game.find params[:id]
    questions = {}
    game.answers.sample(10).each do |answer|
      questions[game.translate_game_input(answer)] = answer.downcase
    end
    questions
  end

end