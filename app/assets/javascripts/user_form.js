$(document).ready(function(){
    $('input, textarea').each(function(){
      $(this).on('focus', function(){
        $(this).parent().find('label').addClass('active');
        $(this).parent().find('input').addClass('active');
      });
      $(this).on('blur', function(){
        $(this).parent().find('input').removeClass('active');
        $(this).parent().find('label').removeClass('active');
      });
  });

    $('input').on('focus', function(){
      var val = $(this).val();
      $(this).val(val);
    });

    $('input').on('keydown', function(event){
      if (event.which == 40 && $(this) != $(':input')){
        console.log('down key pressed');
        $(':input:eq(' + ($(':input').index(this) + 1) + ')').focus();
      } else if (event.which == 38 && $(this) != $(':input').first()){
        console.log("upkey pressed");
        $(':input:eq(' + ($(':input').index(this) - 1) + ')').focus();
      };
    });
});