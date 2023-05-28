<?php
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST["name"];
    $mobile = $_POST["mobile"];
    $email = $_POST["email"];
    $location = $_POST["location"];
    $suggestion = $_POST["suggestion"];

    // Save data to Excel file
    $file = fopen("suggestions.csv", "a");

    // Format the data as a comma-separated line
    $line = "$name,$mobile,$email,$location,$suggestion";

    // Write the line to the Excel file
    fwrite($file, $line . "\n");

    // Close the file
    fclose($file);

    // Redirect the user to a thank you page or display a success message
    header("Location: thank_you.html");
    exit();
  }
?>