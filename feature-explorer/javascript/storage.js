
function storage_needed_oc(devices,field,trigger,oc_sensors){
    //benchmark no of devices for open_config
    var benchmark_no_of_devices_oc=2900
    //approximate data send by a trigger and field in a week
    var data_recived=0.5; //in GB
    //data send by a benchmark no of devices with 1 field and 1 triggers with 1 sensor
    var benchmark_data=98; //in GB
    // data send by a benchmark no of devices with f number of field and t number of triggers with 1 sensor
    // data_needed=98+(f-1)*0.5+(t-1)*0.5
    var data_needed_for_oc_sensors=(devices/benchmark_no_of_devices_oc)*(benchmark_data+(field-1)*0.5+(trigger-1)*0.5)*oc_sensors;
    return data_needed_for_oc_sensors;
}


function storage_needed_iagent(devices,field,trigger,iagent_sensors){

    var benchmark_no_of_devices_iagent=1140;
    var data_recived=0.5; //in GB
    //data send by a benchmark no of devices with 1 field and 1 triggers with 1 sensor
    var benchmark_data=98; //in GB
    // data send by a benchmark no of devices with f number of field and t number of triggers with 1 sensor
    // data_needed=98+(f-1)*0.5+(t-1)*0.5

    var data_needed_for_iagent_sensors=(devices/benchmark_no_of_devices_iagent)*(benchmark_data+(field-1)*0.5+(trigger-1)*0.5)*iagent_sensors;
//console.log(data_needed_for_iagent_sensors);
    return data_needed_for_iagent_sensors;

}



function storage_needed_native(devices,field,trigger,native_sensors){
    //benchmark no of devices for native-gpb
    var benchmark_no_of_devices_native=2900
    //approximate data send by a trigger and field in a week
    var data_recived=0.5; //in GB
    //data send by a benchmark no of devices with 1 field and 1 triggers with 1 sensor
    var benchmark_data=98; //in GB
    // data send by a benchmark no of devices with f number of field and t number of triggers with 1 sensor
    // data_needed=98+(f-1)*0.5+(t-1)*0.5
    var data_needed_for_native_sensors=(devices/benchmark_no_of_devices_native)*(benchmark_data+(field-1)*0.5+(trigger-1)*0.5)*native_sensors;
    return data_needed_for_native_sensors;
}


function storage_needed_snmp(devices,field,trigger,snmp_sensors){

    var benchmark_no_of_devices_snmp=1140;
    var data_recived=0.5; //in GB
    //data send by a benchmark no of devices with 1 field and 1 triggers with 1 sensor
    var benchmark_data=98; //in GB
    // data send by a benchmark no of devices with f number of field and t number of triggers with 1 sensor
    // data_needed=98+(f-1)*0.5+(t-1)*0.5
    var data_needed_for_snmp_sensors=(devices/benchmark_no_of_devices_snmp)*(benchmark_data+(field-1)*0.5+(trigger-1)*0.5)*snmp_sensors;
    return data_needed_for_snmp_sensors;

}
