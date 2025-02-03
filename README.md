# OptiKart

OptiKart is an e-commerce platform designed to provide an optimum shopping experience. Built with a modern tech stack, the application is fully responsive and offers intuitive features such as product search and seamless navigation. Click on the **"Shop Now"** button to browse our products.

---

## Table of Contents

- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Running Tests](#running-tests)
- [Notable Design & Architectural Decisions](#notable-design--architectural-decisions)
- [License](#license)

---

## Technologies Used

- **Vite**: Bootstrapping the React application
- **React**: Frontend UI library
- **TypeScript**: Static typing for enhanced development experience
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Axios**: Promise-based HTTP client for API interactions
- **Framer Motion**: Animation library for smooth UI transitions
- **React Router DOM**: Routing for single-page application navigation
- **@mui/material**: Material UI components for consistent UI design
- **@mui/icons-material**: Icons library for Material UI
- **React Icons**: Additional icon support

---

## Installation

You can set up and run OptiKart on your local machine by following these steps.

### 1. Clone the Repository

Clone the project from GitHub using one of the methods below:

- **Using Git:**

  ```bash
  git clone https://github.com/chiamaka-uchenna/optikart.git
  cd optikart

Download as ZIP:

Visit github.com/chiamaka-uchenna/optikart and click on the "Code" button, then select "Download ZIP". Extract the contents and navigate to the project directory.

2. Install Project Dependencies
Inside the project directory, run:

bash
Copy code
npm install
This command installs all necessary dependencies, including:

axios
framer-motion
react-router-dom
@mui/material
@mui/icons-material
react-icons
tailwindcss (along with its required PostCSS configurations)
If any packages are missing, you can install them individually:

bash
Copy code
npm install axios framer-motion react-router-dom @mui/material @mui/icons-material react-icons tailwindcss



3. Usage
1. Running the Development Server
Start the development server with:

bash
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000 (or the URL provided in your terminal) to view the application.

2. Building for Production
To create a production-ready build, run:

bash
Copy code
npm run build
After building, you can preview the production build locally with:

bash
Copy code
npm run preview
3. Navigating the App
Home Page:
The homepage features a "Shop Now" button that directs you to the product page.

Product Page:
Explore a range of products and use the search functionality to quickly find specific items.