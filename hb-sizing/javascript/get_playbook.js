var topic_dict={};
function check_compatibility(){
    // Internet Explorer 6-11
    var isIE = /*@cc_on!@*/false || !!document.documentMode;
    if(isIE)
    {
        var rowElem = document.querySelector(".row");
        rowElem.innerHTML="<div class=\"browser_Support\"><h2>Internet Explorer is not supported! Please try a different browser.</h2></div>"
    }
    return;
}
function get_playbooks(){
    check_compatibility();
    var check_flag=false;
$.getJSON( "full.json", function( json ) {
    var topic_list=json['configuration']['iceberg']['topic'];
    var playbook_names=json['configuration']['iceberg']['playbook'];
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
        option_table_entry="<tr style=\"vertical-align: middle;\"><td style=\"width: 15%;text-align:center;vertical-align: middle;\"><input type=\"checkbox\"  name=\"playbook_selected\"       id=\"option"+playbook_names[index]['playbook-name']+"\" value="+playbook_names[index]['playbook-name']+" /></td><td style=\"width: 60%;text-align:left;\"><label for=\"option"+playbook_names[index]['playbook-name']+"\">"+playbook_names[index]['playbook-name']+"</label></td><td style=\"width: 25%;text-align: center\">"
        +"<input type=\"text\" name=\"Iagent_count\"  value=\""+count_of_iagent+"\" size=\"6\"></td></tr>";
                }
            else{
                  option_table_entry="<tr style=\"vertical-align: middle;\"><td style=\"width: 15%;text-align:center;\"><input type=\"checkbox\"  name=\"playbook_selected\"       id=\"option"+playbook_names[index]['playbook-name']+"\" value="+playbook_names[index]['playbook-name']+" /></td><td style=\"width: 60%;text-align:left;\"><label for=\"option"+playbook_names[index]['playbook-name']+"\">"+playbook_names[index]['playbook-name']+"</label></td><td style=\"width: 25%;text-align: center\"></td></tr>";
                }

var tableRef = document.getElementById('option_table').getElementsByTagName('tbody')[0];
tableRef.insertAdjacentHTML('beforeend', option_table_entry);//
   $("input[name='Iagent_count']").prop('disabled', 'true');
    $("input[name='playbook_selected']").change(function(){
        $next = $(this).closest('tr').find("[name='Iagent_count']");
        $next.prop('disabled', !this.checked);
        });

        }

    $('#myform input[type="checkbox"]').change(function(){
        var countCheckedCheckboxes = $('#myform input[type="checkbox"]').filter(':checked').length;
        if(countCheckedCheckboxes===8 && check_flag==false)
            {
                check_flag=true;
            alert("You are selecting more than 8 playbooks per device. Are you sure?");
            }
    });

});
}
