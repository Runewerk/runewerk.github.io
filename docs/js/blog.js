const BLOG_SECTION_SELECTOR = "#blog";
const BLOG_POST_LIST_SELECTOR = "#blog-post-list";
const BLOG_CONTENT_SELECTOR = "#blog-content";
const BLOG_MANIFEST_URL = "./blog/posts.json";
const BLOG_POSTS_BASE_PATH = "./blog/posts/";

let blogPosts = null;
let activeBlogFile = null;
const blogContentCache = {};

async function fetchBlogPosts() {
	if (blogPosts) {
		return blogPosts;
	}

	try {
		const response = await fetch(BLOG_MANIFEST_URL);
		if (!response.ok) {
			throw new Error(`HTTP ${response.status}`);
		}

		const manifest = await response.json();
		const files = normalizeManifest(manifest);

		blogPosts = await Promise.all(
			files.map(async (file) => {
				const markdown = await fetchMarkdown(file);
				const title = getMarkdownTitle(markdown, file);
				blogContentCache[file] = markdown;
				return { file, title };
			}),
		);
	} catch (error) {
		console.error("Failed to load blog posts:", error);
		blogPosts = [];
	}

	return blogPosts;
}

function normalizeManifest(manifest) {
	if (!Array.isArray(manifest)) {
		return [];
	}

	return manifest
		.map((item) => {
			if (typeof item === "string") {
				return item;
			}

			if (item && typeof item === "object" && typeof item.file === "string") {
				return item.file;
			}

			return null;
		})
		.filter(Boolean);
}

async function fetchMarkdown(file) {
	const response = await fetch(`${BLOG_POSTS_BASE_PATH}${file}`);
	if (!response.ok) {
		throw new Error(`HTTP ${response.status}`);
	}

	return response.text();
}

function getMarkdownTitle(markdown, file) {
	const match = markdown.match(/^#\s+(.+)$/m);
	if (match && match[1]) {
		return match[1].trim();
	}

	const fileName = file.split("/").pop() || file;
	return fileName.replace(/\.md$/i, "");
}

function getBlogElements() {
	const section = document.querySelector(BLOG_SECTION_SELECTOR);
	if (!section) {
		return null;
	}

	const list = section.querySelector(BLOG_POST_LIST_SELECTOR);
	const content = section.querySelector(BLOG_CONTENT_SELECTOR);
	if (!list || !content) {
		return null;
	}

	return { list, content };
}

function updateActiveBlogLink() {
	document.querySelectorAll("[data-blog-file]").forEach((link) => {
		const isActive = link.getAttribute("data-blog-file") === activeBlogFile;
		link.classList.toggle("text-gray-500", isActive);
	});
}

function escapeHtml(value) {
	return value
		.replaceAll("&", "&amp;")
		.replaceAll("<", "&lt;")
		.replaceAll(">", "&gt;");
}

async function renderBlogPost(file) {
	const elements = getBlogElements();
	if (!elements) {
		return;
	}

	try {
		const markdown = blogContentCache[file] || (await fetchMarkdown(file));
		blogContentCache[file] = markdown;
		elements.content.innerHTML =
			typeof marked === "undefined"
				? `<pre>${escapeHtml(markdown)}</pre>`
				: marked.parse(markdown);
		activeBlogFile = file;
		updateActiveBlogLink();
	} catch (error) {
		console.error(`Failed to load post "${file}":`, error);
		elements.content.innerHTML = "<p>Could not load this post.</p>";
	}
}

function buildPostList(posts) {
	return posts
		.map((post) => {
			return `<li><a href="#" data-blog-file="${post.file}" class="hover:text-gray-500">${post.title}</a></li>`;
		})
		.join("");
}

async function renderBlog() {
	const elements = getBlogElements();
	if (!elements) {
		return;
	}

	const posts = await fetchBlogPosts();
	if (!posts.length) {
		elements.list.innerHTML = "<li>No posts available.</li>";
		elements.content.innerHTML = "<p>No posts available.</p>";
		return;
	}

	elements.list.innerHTML = buildPostList(posts);

	const fallbackPost = posts[0].file;
	const initialPost =
		activeBlogFile && posts.some((post) => post.file === activeBlogFile)
			? activeBlogFile
			: fallbackPost;

	await renderBlogPost(initialPost);
}

function handleBlogPostClick(event) {
	if (!(event.target instanceof Element)) {
		return;
	}

	const postLink = event.target.closest("[data-blog-file]");
	if (!postLink) {
		return;
	}

	event.preventDefault();
	const file = postLink.getAttribute("data-blog-file");
	if (!file) {
		return;
	}

	renderBlogPost(file);
}

document.addEventListener("DOMContentLoaded", renderBlog);
document.addEventListener("htmx:afterSwap", renderBlog);
document.addEventListener("click", handleBlogPostClick);
