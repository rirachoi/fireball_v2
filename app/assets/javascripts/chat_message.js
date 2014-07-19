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
          $('#chat_messages').append($newMsg);
          $('#input_text').val('');
        }
      });

    };

  $('#speak').on('click', createChatMessage);

});

