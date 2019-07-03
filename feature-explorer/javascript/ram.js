var ram_to_core_ratio=4;

function ram_need(required_core){
    return ram_to_core_ratio*required_core;
}