# Runewerk

Runewerk is a modern, responsive website for a software development company. It showcases the company's services, philosophy, and blog using a combination of HTML, CSS (Tailwind), and JavaScript with HTMX for dynamic content loading.

## Project Structure

The project is organized as follows:

- `/docs`: Contains the main website files
  - `index.html`: The main entry point of the website
  - `/components`: Shared header fragment
  - `/css`: Stylesheets
    - `styles.css`: Tailwind CSS source file
    - `output.css`: Compiled and minified CSS
  - `/js`: JavaScript files
    - `darkmode.js`: Dark mode behavior
    - `i18n.js`: Language switching and translations
    - `blog.js`: Markdown blog loader
  - `/blog/posts`: Markdown blog posts
  - `/blog/posts.json`: Generated markdown post manifest
  - `/assets`: Images and other static assets
- `server.js`: A simple Express server for local development
- `/scripts/generate-posts-manifest.js`: Generates `docs/blog/posts.json`
- `tailwind.config.js`: Tailwind CSS configuration
- `package.json`: Project dependencies and scripts

## Features

- Responsive design using Tailwind CSS
- Dark mode toggle with persistent user preference
- Dynamic content loading with HTMX
- Blog section with Markdown rendering
- Optimized for performance with preloading

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Build the site assets:
   ```
   npm run build
   ```
4. Start the development server:
   ```
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000`

## Deployment

The website is configured to be hosted on GitHub Pages. The `/docs` folder serves as the root directory for the deployed site.

## Technologies Used

- HTML5
- Tailwind CSS
- JavaScript
- HTMX
- Express.js (for local development)
- Marked.js (for Markdown rendering in blog posts)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).
