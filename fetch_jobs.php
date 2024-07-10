<?php

require_once "Careerjet_API.php";

$api = new Careerjet_API('en_GB');
$page = isset($_GET['page']) ? intval($_GET['page']) : 1;
$keywords = isset($_GET['keywords']) ? $_GET['keywords'] : '';
$location = isset($_GET['location']) ? $_GET['location'] : '';

$result = $api->search(array(
    'keywords' => $keywords,
    'location' => $location,
    'page' => $page,
    'affid' => '678bdee048',
));

header('Content-Type: application/json');
echo json_encode($result);

?>
