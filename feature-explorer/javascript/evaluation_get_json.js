// HealthBot json parsing file to get the number of fields and triggers for rules chosen
var col_count = 0;
var total_core = 0;
var total_storage = 0;
var total_ram = 0;
$(function() {
    var data_reciving = 0;

    var playbook_count = 0;
    /////////////added to check ie support
  /*  if (!Element.prototype.closest) {
        if (!Element.prototype.matches) {
            Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
        }
        Element.prototype.closest = function(s) {
            var el = this;
            var ancestor = this;
            if (!document.documentElement.contains(el)) return null;
            do {
                if (ancestor.matches(s)) return ancestor;
                ancestor = ancestor.parentElement;
            } while (ancestor !== null);
            return null;
        };
    }*/
    /////
    $('#btn1').on('click', function(event) {
        var count = 0;
        var fields = 0;
        var triggers = 0;
        var flag = false;
        var selected_playbooks = [];
        $("input:checkbox[name=playbook_selected]:checked").each(function() {
            selected_playbooks.push($(this).val());
            $next = $(this).closest('tr').find("[name='Iagent_count']");
            if ($next.length != 0) {
                if ($next.val() === "") {
                    alert("Entry is empty");
                    flag = true;
                }
                count = count + parseInt($next.val());
            }
        });
        if (flag == true)
            return false;
        if (selected_playbooks.length == 0) {
            alert("At least choose 1 Playbook");
            return false;
        }
        var playbooks = "";

        for (var index = 0; index < selected_playbooks.length - 1; index++) {
            playbooks = playbooks + selected_playbooks[index] + ";"
        }
        playbooks = playbooks + selected_playbooks[selected_playbooks.length - 1];
        playbook_count += selected_playbooks.length;

        var device_count = document.getElementById('device').value;
        if (device_count === "" || device_count <= 0) {
            alert("Fill the Correct No of Devices");
            return false;
        }
        var data = parseFloat(count);
        var playbook_names;
        var selected_rules = [];
        var title_dict;
        var topic_rule_dict = {};
        var conf = [0, 0];

        //index[0->sensor;1->field;trigger->2]
        //o->open-config;i->iAgent;n->native-gbp;s->snmp
        //dictionary to store the parsed value for each rule
        var value_dict = {
            'o': [0, 0, 0],
            'i': [0, 0, 0],
            'n': [0, 0, 0],
            's': [0, 0, 0]
        };
        //union function is used to provide support for union of set for fields
        function union(setA, setB) {
            var _union = new Set(setA);
            for (var elem of setB) {
                _union.add(elem);
            }
            return _union;
        }
        //difference function is used to provide support for difference of set for fields
        function difference(setA, setB) {
            var _difference = new Set(setA);
            for (var elem of setB) {
                _difference.delete(elem);
            }
            return _difference;
        }
        //counting the fields in needed the rule having regex starting with "$"
        function field_count(rule) {
            var regex = /[\$\@][a-zA-Z][a-zA-Z0-9\-\_]*/g;
            var match_fields = JSON.stringify(rule).match(regex);
            return new Set(match_fields);
        }
        
        function sumArray(a, b) {
            var c = [];
            for (var i = 0; i < Math.max(a.length, b.length); i++) {
                c.push((a[i] || 0) + (b[i] || 0));
            }
            return c;
        }
        //evaluating the single rule of selected playbook
        function evaluate_rule(rule) {
            //sensor
            var iAgent_sensor = [];
            var oc_sensor = [];
            var nativegpb_sensor = [];
            var snmp_sensor = [];

            //field
            var constant_fields = new Set();
            var oc_fields = new Set();
            var iagent_fields = new Set();
            var snmp_fields = new Set();
            var native_fields = new Set();
            var formula_fields = new Set();
            var trigger_count = 0;
//            console.log(rule['rule-name']);
            if ('sensor' in rule) {
                for (index = 0; index < rule['sensor'].length; index++) {
                    if ('iAgent' in rule['sensor'][index]) {
                        iAgent_sensor.push(rule['sensor']['sensor-name']);
                    }
                    if ('open-config' in rule['sensor'][index]) {
                        oc_sensor.push(rule['sensor']['sensor-name']);
                    }
                    if ('native-gpb' in rule['sensor'][index]) {
                        nativegpb_sensor.push(rule['sensor']['sensor-name']);
                    }
                    if ('snmp' in rule['sensor'][index]) {
                        snmp_sensor.push(rule['sensor']['sensor-name']);
                    }
                }
            } else {
                oc_sensor.push('Dummy Sensor');
            }
            value_dict['o'][0] += oc_sensor.length;
            value_dict['n'][0] += nativegpb_sensor.length;
            value_dict['s'][0] += snmp_sensor.length;
            value_dict['i'][0] += iAgent_sensor.length;
            if ('field' in rule) {
                for (var index = 0; index < rule['field'].length; index++) {
                    if ('sensor' in rule['field'][index]) {
                        var sensor_name = rule['field'][index]['sensor']['sensor-name'];
                        if (iAgent_sensor.includes(sensor_name))
                            iagent_fields.add('$' + rule['field'][index]['field-name']);
                        else if (oc_sensor.includes(sensor_name))
                            oc_fields.add('$' + rule['field'][index]['field-name']);
                        else if (nativegpb_sensor.includes(sensor_name))
                            native_fields.add('$' + rule['field'][index]['field-name']);
                        else if (snmp_sensor.includes(sensor_name))
                            snmp_fields.add('$' + rule['field'][index]['field-name']);
                    } else if ('constant' in rule['field'][index] || 'reference' in rule['field'][index]) {
                        constant_fields.add('$' + rule['field'][index]['field-name']);
                    } else if ('formula' in rule['field'][index]) {
                        constant_fields.add('$' + rule['field'][index]['field-name']);
                        formula_fields = union(formula_fields, field_count(rule['field'][index]['formula']));
                    }
                }
                iagent_fields = union(iagent_fields, difference(formula_fields, union(union(union(oc_fields, native_fields), snmp_fields), constant_fields)));
            }
//            console.log(constant_fields);
            if ('trigger' in rule) {
                trigger_count = rule['trigger'].length;
                var match_fields = new Set(field_count(rule['trigger']));
                iagent_fields = union(iagent_fields, difference(match_fields, union(union(union(oc_fields, native_fields), snmp_fields), constant_fields)));
            }


            if (oc_fields.size > Math.max(iagent_fields.size, native_fields.size, snmp_fields.size)) {
                oc_fields = union(oc_fields, constant_fields);
                value_dict['o'][2] += trigger_count;
            } else if (iagent_fields.size > Math.max(oc_fields.size, native_fields.size, snmp_fields.size)) {
                iagent_fields = union(iagent_fields, constant_fields);
                value_dict['i'][2] += trigger_count;
            } else if (snmp_fields.size > Math.max(oc_fields.size, native_fields.size, iagent_fields.size)) {
                snmp_fields = union(snmp_fields, constant_fields);
                value_dict['s'][2] += trigger_count;
            } else if (native_fields.size > Math.max(oc_fields.size, snmp_fields.size, iagent_fields.size)) {
                native_fields = union(native_fields, constant_fields);
                value_dict['n'][2] += trigger_count;
            } else if (oc_sensor.length > Math.max(iAgent_sensor.length, nativegpb_sensor.length, snmp_sensor.length)) {
                oc_fields = union(oc_fields, constant_fields);
                value_dict['o'][2] += trigger_count;
            } else if (iAgent_sensor.length > Math.max(oc_sensor.length, nativegpb_sensor.length, snmp_sensor.length)) {
                iagent_fields = union(iagent_fields, constant_fields);
                value_dict['i'][2] += trigger_count;
            } else if (snmp_sensor.length > Math.max(oc_sensor.length, nativegpb_sensor.length, iAgent_sensor.length)) {
                snmp_fields = union(snmp_fields, constant_fields);
                value_dict['s'][2] += trigger_count;
            } else if (nativegpb_sensor.length > Math.max(oc_sensor.length, snmp_sensor.length, iAgent_sensor.length)) {
                native_fields = union(native_fields, constant_fields);
                value_dict['n'][2] += trigger_count;
            } else {
                oc_fields = union(oc_fields, constant_fields);
                value_dict['o'][2] += trigger_count;
            }
            if ('keys' in rule) {
                for (var index = 0; index < rule['keys'].length; index++) {
                    if (oc_fields.has('$' + rule['keys'][index]) || native_fields.has('$' + rule['keys'][index]) || snmp_fields.has('$' + rule['keys'][index]))
                        continue;
                    //                            else if(!iagent_fields.has('$'+rule['keys'][index]))
                    iagent_fields.add('$' + rule['keys'][index]);
                }
            }
            if ('vector' in rule) {
                var match_fields = new Set(field_count(rule['vector']));
                iagent_fields = union(iagent_fields, difference(match_fields, union(union(union(oc_fields, native_fields), snmp_fields), constant_fields)));
            }

            //            console.log(oc_fields.size+"/"+iagent_fields.size+"/"+native_fields.size+"/"+snmp_fields.size);
            value_dict['o'][1] += oc_fields.size;
            value_dict['n'][1] += native_fields.size;
            value_dict['s'][1] += snmp_fields.size;
            value_dict['i'][1] += iagent_fields.size;
            // if no sensor all fields are oc
            //	    console.log(oc_sensor);
            //	console.log(iagent_fields);
            if (oc_sensor.includes('Dummy Sensor')) {
                value_dict['o'][1] = value_dict['o'][1] + value_dict['n'][1] + value_dict['s'][1] + value_dict['i'][1];
                value_dict['n'][1] = 0;
                value_dict['s'][1] = 0;
                value_dict['i'][1] = 0;
            }
            // console.log(value_dict);
            fields += (value_dict['o'][1] + value_dict['i'][1] + value_dict['s'][1] + value_dict['n'][1]);
            triggers += (value_dict['o'][2] + value_dict['i'][2] + value_dict['s'][2] + value_dict['n'][2]);
            var rule_conf_list = calculate(device_count, data / 1000, value_dict);
            conf = sumArray(conf, rule_conf_list);
            //            console.log(rule_conf_list);
            value_dict = {
                'o': [0, 0, 0],
                'i': [0, 0, 0],
                'n': [0, 0, 0],
                's': [0, 0, 0]
            };
        }

        //checking the selected rules in the chosen topic of playbook and calling function evaluate rule
        function get_value_from_rules(all_rules_in_topic, rules_selected) {
            for (var index = 0; index < all_rules_in_topic.length; index++) {
                if (rules_selected.includes(all_rules_in_topic[index]['rule-name'])) {
                    evaluate_rule(all_rules_in_topic[index]);
                }
            }

        }


        //looping to all the topics and checking if the topic is selected or not
        //If selected then sending ti th
        function get_value_from_topic(all_topic, selected_topic_dict) {
            all_topic = all_topic.concat(custom_rules);
            for (var index = 0; index < all_topic.length; index++) {
                if (all_topic[index]['topic-name'] in selected_topic_dict) {
                    get_value_from_rules(all_topic[index]['rule'], selected_topic_dict[all_topic[index]['topic-name']]);
                }
            }
        }


        $.getJSON("full.json", function(json) {
            playbook_names = json['configuration']['iceberg']['playbook'];
            playbook_names = playbook_names.concat(custom_playbooks);
            //            console.log(custom_playbooks);
            var no_of_rules = 0;
            for (var i = 0; i < playbook_names.length; i++) {
                if (selected_playbooks.indexOf(playbook_names[i]['playbook-name']) != -1) {
                    no_of_rules += playbook_names[i]['rules'].length;
                    for (var j = 0; j < playbook_names[i]['rules'].length; j++) {

                        if (!(playbook_names[i]['rules'][j].split('/')[0] in topic_rule_dict))
                            topic_rule_dict[playbook_names[i]['rules'][j].split('/')[0]] = []
                        topic_rule_dict[playbook_names[i]['rules'][j].split('/')[0]].push(playbook_names[i]['rules'][j].split('/')[1]);
                    }
                }
            }
            get_value_from_topic(json['configuration']['iceberg']['topic'], topic_rule_dict);

            total_core = total_core + Math.ceil(conf[0]);
            total_ram = total_ram + parseInt(ram_need(Math.ceil(conf[0])));
            total_storage = total_storage + parseInt(conf[1]);
            var total_device = parseInt(document.querySelector('#total_device').textContent) + parseInt(device_count);
            var total_data = parseInt(document.querySelector('#total_data').textContent) + data;
            //
            document.querySelector('#total_device').textContent = total_device;
            document.querySelector('#total_data').textContent = total_data;
            document.querySelector('#total_core').textContent = Math.max(6, total_core);
            document.querySelector('#average_playbook').textContent = Math.ceil(playbook_count / (col_count + 1));
            document.querySelector('#total_ram').textContent = Math.max(20, total_ram);
            document.querySelector('#total_storage').textContent = Math.max(100, total_storage);
            document.querySelector('#server').textContent = Math.ceil(total_core / 128);
            $('.remove-div').css('display', 'none');
            var counts = no_of_rules + " / " + fields + " / " + triggers;
            var table_entry = "<tr><td style=\"width:9%\">" + (++col_count) + "</td><td style=\"width:6%\">" + device_count + "</td><td style=\"width:9%\">" + data + "</td><td style=\"text-align:left;width:40%\">" + playbooks + "</td><td style=\"width:13%\">" + counts + "</td><td id=\"calculated_result\" style=\"width:5%\">" + Math.ceil(conf[0]) + "</td><td id=\"calculated_result\" style=\"width:9%\">" + parseInt(ram_need(Math.ceil(conf[0]))) + "</td><td id=\"calculated_result\" style=\"width:9%\">" + parseInt(conf[1]) + "</td></tr>";
            var d1 = document.getElementById('conf_table');
            $('#conf_table').append(table_entry);
            $("#summary").css({
                'display': ''
            });
            $("#clear_button").css({
                'display': ''
            });
            $("#export_button").css({
                'display': ''
            });
        });
    });
});