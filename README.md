# HTTP Status Cat App

## Purpose

This project is a personal learning tool to practice unit testing with Vitest. It helps you explore the integration of Vue 3, TypeScript, and Vitest while focusing on implementing and testing various features related to HTTP status codes.

## Features

- **HTTP Status Code Search**: Enter an HTTP status code to fetch and display an image of a cat corresponding to that status code.
- **Warning Message**: Shows a warning message and a placeholder image if an invalid status code is entered.
- **Image Handling**: Updates the image source based on valid HTTP status codes, and displays a placeholder image in case of errors.
- **Screen Shake Animation**: Provides a visual indication of an invalid status code by shaking the screen.
- **Responsive Design**: The app is styled with Tailwind CSS to be responsive and visually appealing on different screen sizes.
- **Read More Link**: Displays a "READ MORE" overlay on the cat image with a link to the HTTP status code documentation.

## Setup

1. **Clone the repository**:

   ```bash
   git clone https://github.com/ChinnaphatLoha/http-status-cat.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd http-status-cat
   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Run the development server**:

   ```bash
   npm run dev
   ```

5. **Run unit tests**:

   ```bash
   npm run test:unit
   ```

## Components

### `App.vue`

- **Template**: Provides the main UI including input field, submit button, and image display.
- **Script**: Contains the logic for handling HTTP status code input, managing state, and triggering the screen shake animation.
- **Styles**: Uses scoped styles for layout and animation effects.

## Acknowledgements

- [Vue 3](https://vuejs.org/) - The framework used for building the user interface.
- [Vitest](https://vitest.dev/) - The testing framework used for unit testing.
- [Tailwind CSS](https://tailwindcss.com/) - The CSS framework used for styling.
- [Placeholder Image](https://via.placeholder.com/) - Used for placeholder content.
