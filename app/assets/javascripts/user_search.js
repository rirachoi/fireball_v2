$(document).ready(function(){

  if ($('#user_search').length == 0) {
    return false;
  }

  $("#user_search").autocomplete({
      source: _.pluck(all_users, 'username'),
      // appendTo: '#friend_results'
    });

  var addFriend = function() {
    var friendName = $('#user_search').val;

  };

  $('#add_friend_btn').on('click', addFriend);
  $('#user_search').on('keydown', function(event){
    if (event.which == 13) {
      addFriend();
    }
  });

});