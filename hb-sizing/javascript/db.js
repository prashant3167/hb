$("input[name='Iagent_count']").prop('disabled', 'true');
$("input[name='playbook_selected']").change(function(){
        $next = $(this).closest('tr').find("[name='Iagent_count']");
        $next.prop('disabled', !this.checked);
        });
