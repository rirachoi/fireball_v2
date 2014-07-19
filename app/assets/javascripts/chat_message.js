$(document).ready(function(){

  var $inputText = $('#input_text').val();

    var createChatMessage = function() {
      $.ajax({
        url: '/chats',
        method: 'post',
        dataType: 'json',
        data: {
          // language: $chatLanguage,
          // user_id: null,
          // chat_id:,
          // image:,
          // language_from:,
          // language_to:,
          // input_text:,
          // translation:,
          // pronounciation_text:,
          // sound:
        },
        success: function (response) {
          console.log(response); // update the page with the response somehow
        }
      });

    };

  // $('#speak').on('click', createChatMessage);

});

