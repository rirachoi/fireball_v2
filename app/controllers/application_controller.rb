class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  before_action :authenticate_user # does the method named this before any other action

  private

  def authenticate_user
    if session[:user_id].present? #instead of comparing .nil? and == "". only for rails
      @current_user = User.where(:id => session[:user_id]).first # .find throws fatal error if nothing, .where will return nil if nothing else returns array
    end

    if @current_user.nil?
      session[:user_id] = nil
    end
  end

  def check_if_logged_in
    if @current_user.nil?
      redirect_to about_path
    end
  end
end
