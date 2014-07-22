$(document).ready(function(){

    var createGame = function() {

      var $gameLanguage = $('#game_language').val();
      var $gameLanguageText = $("#game_language option:selected").text();
        $.ajax({
          url: '/games',
          method: 'post',
          dataType: 'json',
          data: {
            language: $gameLanguage,
            points: 0,
            lives: 3,
            stage: 1,
            difficulty_level: 1
          },
          success: function (response) {
            var $game = $('<li/>');         // Add li for the new game
            var $gameLink = $('<a/>');      // Add link for the new game
            $gameLink.attr("href","/games/" + response.id);
            $gameLink.text($gameLanguageText);
            $game.append($gameLink);

            var $form = $('<form/>');
            $form.attr('action', "/chats/" + response.id)

            var $button = $('<button/>');
            $button.text('x');
            $button.addClass('show_delete_chat');

            $form.append($button);
            $game.append($form);
            $('#my_games ul').prepend($game);
          }
        });

    };

    var deleteGame = function(event) {
      event.preventDefault();
      var $this = $(this);
      $this.closest('li').remove(); // removes the li from the page of the remove link you click

      $.ajax({
        url: $this.closest('form').attr('action'),
        method: 'post',
        dataType: 'json',
        data: {
          "_method":"delete",
        },
        success: function (response) {
          // GREAT SUCCESS
        }
      });
      return false;
    };


  $('#create_new_game').on('click', createGame);
  $('#my_games').on('click', '.show_delete_chat', deleteGame);

});