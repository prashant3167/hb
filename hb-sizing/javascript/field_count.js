function field_count(rule)
{
    field_name=[];
    var regex=  /\$[a-zA-Z][a-zA-Z0-9\-\_]+/g;
    if('keys' in rule)
        {
            for(var index=0;index<rule['keys'].length;index++)
                {
                    field_name.push('$'+rule['keys'][index]);
                }
        }
    if('field' in rule)
        {
            for (var index=0;index<rule['field'].length;index++)
            {
                if('sensor' in rule['field'][index] || 'reference' in rule['field'][index] || 'constant' in rule['field'][index])
                   field_name.push('$'+rule['field'][index]['field-name']);
                else if('formula' in rule['field'][index])
                   {
                       field_name.push('$'+rule['field'][index]['field-name']);
                        var match_fields=JSON.stringify(rule['field'][index]).match(regex);
                        field_name=field_name.concat(match_fields);
                   }
            }
        }
    if('trigger' in rule)
        {
            var match_fields=JSON.stringify(rule['trigger']).match(regex);   
            field_name=field_name.concat(match_fields);
        }
//    console.log(field_name);
    var field_Set=new Set(field_name);
   return field_Set.size;
}   