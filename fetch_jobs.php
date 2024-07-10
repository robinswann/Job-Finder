<?php

header('Content-Type: application/json');

require_once 'Careerjet_API.php';

$keywords = isset($_GET['keywords']) ? $_GET['keywords'] : '';
$location = isset($_GET['location']) ? $_GET['location'] : '';

$api = new Careerjet_API('en_GB'); // Use the appropriate locale for your region

$result = $api->search(array(
    'keywords' => $keywords,
    'location' => $location,
    'affid' => '678bdee048',
));

if ($result->type == 'JOBS') {
    echo json_encode(array('jobs' => $result->jobs));
} else if ($result->type == 'LOCATIONS') {
    echo json_encode(array('locations' => $result->solveLocations));
} else {
    echo json_encode(array('error' => 'No results found.'));
}

?>
