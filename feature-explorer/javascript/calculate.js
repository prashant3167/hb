function calculate(no_of_devices, data_sending, file_data) {
    var no_of_oc_sensors = parseInt(file_data['o'][0]);
    var no_of_iagent_sensors= parseInt(file_data['i'][0]);
    var no_of_native_sensors= parseInt(file_data['n'][0])
    var no_of_snmp_sensors= parseInt(file_data['s'][0]);
    
    
    var no_of_oc_fields =parseFloat(file_data['o'][1]);
    var no_of_iagent_fields = parseFloat(file_data['i'][1]);
    var no_of_snmp_fields = parseFloat(file_data['s'][1]);
    var no_of_native_fields = parseFloat(file_data['n'][1]);
    
    
    var no_of_oc_triggers = parseFloat(file_data['o'][2]);
    var no_of_iagent_triggers = parseFloat(file_data['i'][2]);
    var no_of_snmp_triggers = parseFloat(file_data['s'][2]);
    var no_of_native_triggers = parseFloat(file_data['n'][2]);
    
    data_sending = parseFloat(data_sending);
    no_of_devices = parseInt(no_of_devices);
    
    var cores_needed = cores_oc_need(no_of_devices,
                               no_of_oc_fields,
                               no_of_oc_triggers,
                               no_of_oc_sensors)+
                cores_iagent_need(no_of_devices,
                                no_of_iagent_fields,
                                no_of_iagent_triggers,
                                no_of_iagent_sensors,
                                data_sending)+
                cores_snmp_need(no_of_devices,
                                no_of_snmp_fields,
                                no_of_snmp_triggers,
                                no_of_snmp_sensors,
                                data_sending)+
                cores_nativegpb_need(no_of_devices,
                               no_of_native_fields,
                               no_of_native_triggers,
                               no_of_native_sensors);

    var storage_needed = storage_needed_oc(no_of_devices,
                                    no_of_oc_fields,
                                    no_of_oc_triggers,
                                    no_of_oc_sensors)
                +storage_needed_iagent(no_of_devices,
                                    no_of_iagent_fields,
                                    no_of_iagent_triggers,
                                    no_of_iagent_sensors)
                +storage_needed_native(no_of_devices,
                                    no_of_native_fields,
                                    no_of_native_triggers,
                                    no_of_native_sensors)
                +storage_needed_snmp(no_of_devices,
                                    no_of_snmp_fields,
                                    no_of_snmp_triggers,
                                    no_of_snmp_sensors);
//    console.log(cores_needed);
    return [cores_needed,storage_needed];
}
