<?php
if ($_POST['data']) {
	$data = json_decode($_POST['data']);
	$img = $data->{'img'};
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	// base64 to binary
	$data = base64_decode($img);
	// create file from binary
	$file = './image.png'; 
	$success = file_put_contents($file, $data);
	error_log($img);

	if ($success) {
		error_log("success");

		$output = null;
		exec("tesseract " . $file . " /tmp/out nobatch /usr/share/tesseract-ocr/tessdata/configs/alpha; cat /tmp/out.txt", $output);
		error_log($output);
		if (count($output) > 1) {
			for ($i=1; $i < count($output); $i++) {
				if ($i == count($output)-1)
					echo $output[$i];
				else
					echo $output[$i] . "\n";
			}
		}
		unset($output);
	}
}
?>
