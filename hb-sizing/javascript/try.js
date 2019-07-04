$(document).ready(function(){
  $('.Try_Button').click(function(){
     var dummy_device=Math.floor((Math.random() * 20) + 10);
  $('input[name="device"]').val(dummy_device);
      document.my_form.playbook_selected[1].checked =true;
      document.my_form.playbook_selected[4].checked =true;
      $next=(document.my_form.playbook_selected[4]).closest('tr').children[2].firstElementChild;
      if($next!=null)
          $next.disabled=false;
      document.my_form.playbook_selected[6].checked =true;
      $("#btn1").click();
   });

});


$(document).ready(function(){
  $('#clear_button').click(function(){
    document.querySelector('#conf_table').textContent="";
      col_count=0;
      document.querySelector('#total_device').textContent="0";
              document.querySelector('#total_data').textContent="0";
//              document.querySelector('#total_core').textContent=0;
      total_core=0;
              document.querySelector('#average_playbook').textContent=0 ;
      total_ram=0;
//              document.querySelector('#total_ram').textContent=0;
      total_storage=0;
//              document.querySelector('#total_storage').textContent=0;
            document.querySelector('#server').textContent=0;
        $("#summary").css({ 'display' : 'none'});
	$('.remove-div').css('display', 'block');
	$("#clear_button").css({ 'display' : 'none'});
         $("#export_button").css({ 'display' : 'none'});
   });

});
$(document).ready(function(){
  $('.Reset_Button').click(function(){
 $("#my_form").trigger('reset');
      $(".my_form").trigger('reset');
      $('input[name="Iagent_count"]').attr("disabled","disabled"); //disable all text fields.
   });

});

$("#export_button").click(function(){
  $(".size_table").table2csv();
});
