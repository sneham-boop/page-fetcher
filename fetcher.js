const args = process.argv.slice(2);
const request = require("request");
const fs = require("fs");

const url = args[0];
const filePath = args[1];

// get file
request(url, (error, response, body) => {
  console.log("error:", error); // Print the error
  console.log("statusCode:", response && response.statusCode); // Print the response status code
  if (body) console.log("Page was found.");

  //check if file exists
  try {
    if (fs.existsSync(filePath)) {
      console.log("This file already exists!! Pick a new name.");
      return;
    }
  } catch (err) {
    console.error(err);
  }

  // write to file
  fs.writeFile(filePath, body, (error) => {
    if (error) {
      console.log(error);
      return;
    }

    const bytes = body.length;
    const result = `Downloaded and saved ${bytes} bytes to ${filePath}`;
    console.log(result);
  });
});
