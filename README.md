# svelte4 + electron

## Overview

This project is a template for building desktop applications using Svelte 4 and Electron. It combines the reactive UI capabilities of Svelte with the powerful desktop application framework Electron.

## Features

- **Svelte 4**: A modern JavaScript framework for building fast and reactive user interfaces.
- **Electron**: A framework for building cross-platform desktop applications with web technologies.
- **Vite**: A fast build tool and development server for modern web projects.
- **TypeScript**: Strongly typed programming language that builds on JavaScript.

... and tailwind

## Usage

### Prerequisites

- Node.js (version 14 or higher)
- npm (version 6 or higher)

### Installation

#### To use GitHub template

1. Click the "Use this template" button on the GitHub repository page.
2. Enter the repository name and click the "Create repository from template" button.
3. Clone the repository to your local machine.
4. Install the dependencies by running `npm install`.

#### To clone the repository

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/svelte4-electron-app.git
   cd svelte4-electron-app
    ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Development

To start the development server, run:
```sh
npm run dev
```

This will start the Vite development server and open the Electron application window.

### Building

To build the application, run:
```sh
npm run build
```

This will build the Svelte application and package it into an Electron application.

## Scripts

* `dev`: Starts the development server and Electron application.
* `build`: Builds the Svelte application for production.
* `build:win`: Builds the application for Windows.
* `build:mac`: Builds the application for macOS.
* `build:linux`: Builds the application for Linux.
* `build:all`: Builds the application for both Windows and macOS.
* `preview`: Previews the production build.
* `check`: Runs type checking and linting.
* `check:watch`: Runs type checking and linting in watch mode.
* `format`: Formats the code using Prettier.
* `lint`: Lints the code using ESLint.

## Change to Yours

1. Change the package name, description, author, and repository in `package.json`.
2. Change the application name in `build.config.json`.
3. Change the license in `LICENSE`.
4. Change the awesome app in your hand !!!