module ApplicationHelper

  def smartnav

    # links = "<div class='flip-container' ontouchstart=\"this.classList.toggle(\'hover\')\">"
    links = "<div class='flip-container'>"
    links += "<div class='flipper'>"
    links += "<div class='front'>"
    links += link_to(root_path) do
              image_tag('icons/fireball.png', :class => 'thumb')
            end
    links += "</div>"

    links += "<div class='back'>"
    links += link_to('Fireball', root_path)
    links += "</div>"

    if @current_user
      links += "<div>"
      links += link_to(games_path) do
                image_tag('icons/controller.png', :class => 'thumb')
              end
      links += "</div>"

      links += "<div>"
      links += link_to(chats_path) do
               image_tag('icons/chat.png', :class => 'thumb')
             end
      links += "</div>"

      links += "<div>"
      links += link_to (edit_user_path(@current_user.id)) do
                image_tag('icons/bigcog.png', :class => 'settings_tag')
              end
      links +="</div>"


      # links += "<li class='invisible'>" + "You are speaking " + LANGUAGES.invert[@current_user.native_language] + "</li>"


      links += "<div>"
      links += link_to(login_path, :method => :delete) do
                image_tag('icons/logout.png', :class => 'login_tag')
              end
      links +="</div>"
    else
      links += "<div>"
      links += link_to(login_path) do
                image_tag('icons/login.png', :class => 'login_tag')
              end
      links += "</div>"

      links += "<div>"
      links += link_to(new_user_path) do
                image_tag('icons/signup.png', :class => 'thumb')
              end
      links +="</div>"

      links += "</div>"
      links += "</div>"
    end
    links
  end

end
