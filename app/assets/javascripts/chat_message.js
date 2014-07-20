$(document).ready(function(){
  var $currentChatId = $('#chat_id').text();

    var createChatMessage = function(event) {
      event.preventDefault();
      var $inputText = $('#input_text').val();
      $.ajax({
        url: '/chats/' + $currentChatId + '/messages',
        method: 'post',
        dataType: 'json',
        data: {
          input_text: $inputText,
        },
        success: function (response) {
          console.log(response);// update the page with the response somehow
        
          var $newMsg = $('<li/>');
          $newMsg.text(response.created_at + ": "+ response.input_text);
          var $newTranslation = $('<li/>');
          $newTranslation.text(response.translation);
          $('#chat_messages').append($newMsg);
          $('#chat_messages').append($newTranslation);
          $('#input_text').val('');
        }
      });
    };

  $('#speak').on('click', createChatMessage);
  $('#chat_id').on('keyup', function(event) {
    if (event.which == 13) {
      createChatMessage();
    }
  });

});

