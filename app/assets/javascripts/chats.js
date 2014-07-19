$(document).ready(function(){

    var createChat = function() {

      var $chatLanguage = $('#chat_language').val();
        $.ajax({
        url: '/chats',
        method: 'post',
        dataType: 'json',
        data: {
          language: $chatLanguage
        },
        success: function (response) {
          var $chat = $('<li/>'); // update the page with the response somehow
          var $chatLink = $('<a>');
          $chatLink.href = "/chats/" + response.id
          $chatLink.innerHTML = "LEL";
          $chat.append($chatLink);
          $('#my_chats').prepend($chat);
          console.log($chat);
          console.log($chatLink);
          console.log(response);
        }
        });

    };

  $('#create_new_chat').on('click', createChat)

});

