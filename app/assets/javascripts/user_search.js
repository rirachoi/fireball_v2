$(document).ready(function(){

  if ($('#user_search').length == 0) {
    return false;
  }

  $( "#user_search" ).autocomplete({
      source: _.pluck(all_users, 'username'),
      // appendTo: '#friend_results'
    });


});