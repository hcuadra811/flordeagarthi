# Flor de Agarthi Corcovado - Property Showcase Website

A modern, responsive website for showcasing a unique property in Corcovado, Costa Rica. Built with React, Tailwind CSS, and enhanced with Framer Motion animations.

![Flor de Agarthi Corcovado](public/resources/images/20231121_090647.jpg)

## Features

- **Bilingual Support**: Full Spanish and English language support with URL-based routing
- **Modern UI/UX**: Clean, responsive design with subtle animations and transitions
- **Interactive Components**:
  - Masonry gallery with lightbox
  - Video section with custom controls
  - Interactive maps
  - Animated text and elements
  - Parallax scrolling effects
- **Contact Forms**: Integrated with EmailJS for serverless email functionality
- **Optimized Media**: Responsive images and videos with lazy loading
- **Accessibility**: ARIA attributes and keyboard navigation support

## Technologies Used

- **React**: Frontend library for building the user interface
- **React Router**: For language-based routing
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Framer Motion**: Animation library for smooth transitions and effects
- **EmailJS**: For sending emails directly from the frontend
- **React Icons**: For high-quality icons

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/flordeagarthicorcovado.git
   cd flordeagarthicorcovado
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure EmailJS:
   - Create an account at [EmailJS](https://www.emailjs.com/)
   - Create a service and email template
   - Update the following files with your EmailJS credentials:
     - `src/ContactSection.js`
     - `src/App.js`

4. Start the development server:
   ```bash
   npm start
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
flordeagarthi/
├── public/
│   ├── resources/
│   │   ├── images/
│   │   └── videos/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── AnimatedElement.js
│   │   ├── AnimatedText.js
│   │   ├── ParallaxSection.js
│   │   └── StaggerContainer.js
│   ├── AboutSection.js
│   ├── App.js
│   ├── ContactSection.js
│   ├── content.js
│   ├── Footer.js
│   ├── GallerySection.js
│   ├── Header.js
│   ├── index.css
│   ├── index.js
│   ├── PropertyDetails.js
│   └── VideoSection.js
└── package.json
```

## Animation Components

The project includes several reusable animation components:

- **AnimatedElement**: Wrapper component for various animation types (fade, slide, scale)
- **AnimatedText**: Text animation component for words or characters
- **StaggerContainer**: Container for staggered animations of child elements
- **ParallaxSection**: Component for parallax scrolling effects

## EmailJS Integration

To set up email functionality:

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a service (e.g., Gmail, Outlook)
3. Create an email template with variables like `{{from_name}}`, `{{from_email}}`, etc.
4. Replace the placeholder values in the code:
   ```javascript
   const serviceId = 'YOUR_SERVICE_ID';
   const templateId = 'YOUR_TEMPLATE_ID';
   const userId = 'YOUR_USER_ID';
   ```

## Customization

- **Content**: Edit the `content.js` file to update text in both languages
- **Colors**: Modify Tailwind classes in the components
- **Images/Videos**: Replace files in the `public/resources` directory

## Deployment

### GitHub Pages + Custom Domain (recommended)

The site is live on the custom domain:

**https://flordeagarthicorcovado.com**

#### How it works
- Deployment is handled by GitHub Actions (see `.github/workflows/deploy.yml`).
- Custom domain `flordeagarthicorcovado.com` is configured in the repo under **Settings → Pages**.
- DNS uses 4 A records for the apex + a CNAME for `www`.

**Live site:** https://flordeagarthicorcovado.com

#### Re-deploy
Just push to `main`. The workflow will automatically build and deploy.

You can also manually trigger the workflow from the Actions tab.

#### Alternative (manual)
```bash
npm run deploy
```
(Uses the `gh-pages` package — not needed if using the Actions workflow.)

#### Technical details
- `homepage` in `package.json` is set to the custom domain so assets load from the root.
- `BrowserRouter` uses `basename={process.env.PUBLIC_URL}`.
- During build we generate a `404.html` copy of `index.html` for proper SPA routing (`/es`, `/en`, etc.) on GitHub Pages.

### Other platforms
This project can also be deployed to Netlify, Vercel, etc. (they usually auto-detect CRA).

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- National Geographic for the Corcovado quote
- Tailwind CSS for the styling framework
- Framer Motion for the animation capabilities 