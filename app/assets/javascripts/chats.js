$(document).ready(function(){

  var $chatLanguage = $('#chat_language').val();

    var createChat = function() {
        $.ajax({
        url: '/chats',
        method: 'post',
        dataType: 'json',
        data: {
          language: $chatLanguage
        },
        success: function (response) {
          console.log(response); // update the page with the response somehow
        }
        });

    }



});

