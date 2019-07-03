var custom_playbooks=[];
var custom_rules=[];
function process_playbook(json){
    var topic_list=json['configuration']['iceberg']['topic'];
    	if (typeof topic_list !== 'undefined' && topic_list.length > 0){
	custom_rules=custom_rules.concat(topic_list);
}
    var playbook_names=json['configuration']['iceberg']['playbook'];
if (typeof playbook_names !== 'undefined' && playbook_names.length > 0){ 
   custom_playbooks=custom_playbooks.concat(playbook_names);
}
    if (typeof topic_list !== 'undefined' && topic_list.length > 0){
    for (var index=0;index<topic_list.length;index++)
        {
            var topic=topic_list[index]['topic-name'];
                for(var index2=0;index2<topic_list[index]['rule'].length;index2++)
                    {
                        var Iagent_count=0;
                        full_topic_name=topic+"/"+topic_list[index]['rule'][index2]['rule-name'];
                        if('sensor' in topic_list[index]['rule'][index2]){
                        for(var index3=0;index3<topic_list[index]['rule'][index2]['sensor'].length;index3++)
                            {
                                if('iAgent' in topic_list[index]['rule'][index2]['sensor'][index3])
                                    {
                                        Iagent_count++;
                                    }
                            }
                        }
                        topic_dict[full_topic_name]=Iagent_count;
                    }
        }
}
    if (typeof playbook_names !== 'undefined' && playbook_names.length > 0){
	$('.remove-custom-div').css('display', 'none');
      for(var index=0;index<playbook_names.length;index++)
        {
            var count_of_iagent=0;
            for(index2=0;index2<playbook_names[index]['rules'].length;index2++)
                {
                    count_of_iagent+=parseInt(topic_dict[playbook_names[index]['rules'][index2]]);
                }
            count_of_iagent=parseInt(count_of_iagent)*100;
            var option_table_entry;
            if(count_of_iagent!=0)
                {
        option_table_entry="<tr style=\"vertical-align: middle;width: 100%\"><td style=\"width: 15%;text-align:center;vertical-align: middle;\"><input type=\"checkbox\"  name=\"playbook_selected\"       id=\"option_cus"+playbook_names[index]['playbook-name']+"\" value="+playbook_names[index]['playbook-name']+" /></td><td style=\"width: 60%;text-align:left;\"><label for=\"option_cus"+playbook_names[index]['playbook-name']+"\">"+playbook_names[index]['playbook-name']+"</label></td><td style=\"width: 25%;text-align: center\">"
        +"<input type=\"text\" name=\"Iagent_count\"  value=\""+count_of_iagent+"\" size=\"6\"></td></tr>";
                }
            else{
                  option_table_entry="<tr style=\"vertical-align: middle;width: 100%\"><td style=\"width: 15%;text-align:center;\"><input type=\"checkbox\"  name=\"playbook_selected\"       id=\"option_cus"+playbook_names[index]['playbook-name']+"\" value="+playbook_names[index]['playbook-name']+" /></td><td style=\"width: 60%;text-align:left;\"><label for=\"option_cus"+playbook_names[index]['playbook-name']+"\">"+playbook_names[index]['playbook-name']+"</label></td><td style=\"width: 25%;text-align: center\"></td></tr>";
                }
            
            $(".option_div").css({ 'display' : ''});
var tableRef = document.getElementById('custom_table').getElementsByTagName('tbody')[0];
tableRef.insertAdjacentHTML('beforeend', option_table_entry);// 
   $("input[name='Iagent_count']").prop('disabled', 'true');
    $("input[name='playbook_selected']").change(function(){
        $next = $(this).closest('tr').find("[name='Iagent_count']");
        $next.prop('disabled', !this.checked);
        });
        }}
    
}   






function readmultifiles(e) {
  const files = e.currentTarget.files;
  Object.keys(files).forEach(i => {
   const file = files[i];
    const reader = new FileReader();
    reader.onload = (e) => {
    var parts = file.name.split('.');
        var file_content;
        var file_json;
        if(parts.length!=2 || (parts[1]!="json" && parts[1]!="playbook" && parts[1]!="rule"))
            {
                alert("There is some error in "+file.name);
                return false;
            }
        else if(parts[1]=="json")
            {
                file_content=e.target.result;
                file_json=JSON.parse(file_content);
		process_playbook(file_json);
            }
        else 
            {
                file_content=e.target.result;
                 $.ajax({
                 url : "convert_to_json.php",
                 type : "post",
                 data  : {"file_content" : file_content},
                 success: function(json_data){
	             file_json=JSON.parse(json_data);
		      process_playbook(file_json);
		     //console.log(file_json);
                 }
             });  
            }
    }
    reader.readAsBinaryString(file);
  })
};


    document.getElementById('files').addEventListener('change', readmultifiles, false);
