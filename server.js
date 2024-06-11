const express = require("express");
const path = require("node:path");

const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the "docs" directory
app.use(express.static(path.join(__dirname, "docs")));

// Start the server
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});