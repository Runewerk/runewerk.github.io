const fs = require("node:fs/promises");
const path = require("node:path");

const postsDir = path.join(__dirname, "..", "docs", "blog", "posts");
const manifestPath = path.join(__dirname, "..", "docs", "blog", "posts.json");

async function generateManifest() {
	let entries = [];

	try {
		entries = await fs.readdir(postsDir, { withFileTypes: true });
	} catch {
		entries = [];
	}

	const files = entries
		.filter((entry) => entry.isFile() && entry.name.toLowerCase().endsWith(".md"))
		.map((entry) => entry.name)
		.sort((a, b) => a.localeCompare(b));

	await fs.writeFile(manifestPath, `${JSON.stringify(files, null, 2)}\n`);
	console.log(`Generated ${path.relative(process.cwd(), manifestPath)} with ${files.length} post(s).`);
}

generateManifest().catch((error) => {
	console.error("Failed to generate blog posts manifest:", error);
	process.exitCode = 1;
});
