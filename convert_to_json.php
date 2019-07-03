<?php
   $file_content=$_REQUEST['file_content'];
   #echo $file_content;
    $file = "rule_file.conf";
    $myfile = fopen($file, "w") or die("Unable to open file!");
    fwrite($myfile, $file_content);
    fclose($myfile);
    $a = 'docker exec -t 11bc166b7be8 cli -c "edit;rollback;load override /config1/rule_file.conf;show | display json| no-more |save /config1/json_result.txt"';
    shell_exec($a);
    shell_exec('echo prashant');
    $json_file="json_result.txt";
    $myfile=fopen($json_file,"r") or die("Unable to read file!");
    echo fread($myfile,filesize($json_file));
    fclose($myfile);
	//echo substr($json_data,strpos($json_data,'{'));
?>
