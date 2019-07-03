function cores_oc_need(no_of_devices,fields,triggers,oc_sensors){
    // constant benchmarked values
//    alert(no_of_devices+"fields"+fields+"trigger"+triggers+"oc_sensors"+oc_sensors);
// open_config benchmark for core calculation
    var benchmark_no_of_device_oc=2900;
    var cost_in_device_for_1_field_oc=200;
    var cost_in_device_for_1_trigger_oc=525;
    
    var no_of_cores_for_benchmark_oc=64;
//    alert("no_of_devices:"+no_of_devices);
//    alert(arguments);
//core constant
    //for oc
//    alert(" Ia am called");
    var core_constant_oc=(no_of_cores_for_benchmark_oc/benchmark_no_of_device_oc);
    
    var device_to_benchmark_ratio=no_of_devices/benchmark_no_of_device_oc;
    
//    var core_for_oc=(no_of_devices+((fields-1)*(device_to_benchmark_ratio*cost_in_device_for_1_field_oc))+
//    ((triggers-1)*device_to_benchmark_ratio*cost_in_device_for_1_trigger_oc))*core_constant_oc*oc_sensors;
   var core_for_oc=(no_of_devices+
                 ((fields-1)*device_to_benchmark_ratio*cost_in_device_for_1_field_oc)+
                 ((triggers-1)*device_to_benchmark_ratio*cost_in_device_for_1_trigger_oc))*core_constant_oc*oc_sensors;
//   alert("core_oc"+core_for_oc);
    return core_for_oc;
}



function cores_iagent_need(no_of_devices,fields,triggers,iagent_sensors,data){
        // constant benchmarked values
    // Iagent benchmark for core calculation
    var benchmark_no_of_device_iagent=29640;
    var cost_in_device_for_1_field_iagent=1820;
    var cost_in_device_for_1_trigger_iagent=3250;
    var no_of_cores_for_benchmark_iagent=64;
    
//core constant
//    alert("iagent-data"+data);
    //for Iagent
var core_constant_iagent=(no_of_cores_for_benchmark_iagent/benchmark_no_of_device_iagent);
    
    var device_to_benchmark_ratio=(no_of_devices/benchmark_no_of_device_iagent);
    
    var core_for_iagent=(no_of_devices+((fields-1)*device_to_benchmark_ratio*cost_in_device_for_1_field_iagent)+((triggers-1)*device_to_benchmark_ratio*cost_in_device_for_1_trigger_iagent))*core_constant_iagent*iagent_sensors*data;
//        alert("core_iagent"+core_for_iagent/1000);
    return core_for_iagent;
}



function cores_nativegpb_need(no_of_devices,fields,triggers,native_sensors){
    // constant benchmarked values
//    alert(no_of_devices+"fields"+fields+"trigger"+triggers+"oc_sensors"+oc_sensors);
// open_config benchmark for core calculation
    var benchmark_no_of_device_native=2900;
    var cost_in_device_for_1_field_native=200;
    var cost_in_device_for_1_trigger_native=525;
    
    var no_of_cores_for_benchmark_native=64;
//    alert("no_of_devices:"+no_of_devices);
//    alert(arguments);
//core constant
    //for oc
//    alert(" Ia am called");
    var core_constant_native=(no_of_cores_for_benchmark_native/benchmark_no_of_device_native);
    
    var device_to_benchmark_ratio=no_of_devices/benchmark_no_of_device_native;
    
//    var core_for_oc=(no_of_devices+((fields-1)*(device_to_benchmark_ratio*cost_in_device_for_1_field_oc))+
//    ((triggers-1)*device_to_benchmark_ratio*cost_in_device_for_1_trigger_oc))*core_constant_oc*oc_sensors;
   var core_for_native=(no_of_devices+
                 ((fields-1)*device_to_benchmark_ratio*cost_in_device_for_1_field_native)+
                 ((triggers-1)*device_to_benchmark_ratio*cost_in_device_for_1_trigger_native))*core_constant_native*native_sensors;
//   alert("core_oc"+core_for_oc);
    
    return core_for_native;
}


function cores_snmp_need(no_of_devices,fields,triggers,snmp_sensors,data){
        // constant benchmarked values
    // Iagent benchmark for core calculation
    var benchmark_no_of_device_snmp=29640;
    var cost_in_device_for_1_field_snmp=1820;
    var cost_in_device_for_1_trigger_snmp=3250;
    var no_of_cores_for_benchmark_snmp=64;
    
//core constant
//    alert("iagent-data"+data);
    //for Iagent
var core_constant_snmp=(no_of_cores_for_benchmark_snmp/benchmark_no_of_device_snmp);
    
    var device_to_benchmark_ratio=(no_of_devices/benchmark_no_of_device_snmp);
    
    var core_for_snmp=(no_of_devices+((fields-1)*device_to_benchmark_ratio*cost_in_device_for_1_field_snmp)+((triggers-1)*device_to_benchmark_ratio*cost_in_device_for_1_trigger_snmp))*core_constant_snmp*snmp_sensors*data;
//        alert("core_iagent"+core_for_iagent/1000);
    return core_for_snmp;
}