# BenSalman

## Pages 📃

| Page              | Path       |
| ----------------- | ---------- |
| 403               | `*`        |
| 404               | `*`        |
| Cart              | `/cart`    |
| Chair Reservation | `/chair`   |
| Kitchen           | `/kitchen` |
| Menu              | `/menu`    |
| Sign In           | `/login`   |
| Success           | `/success` |

## TODO

- [ ] Improve page title to be dynamic

## Features 🎮

- Modern and responsive layout
- Written in TypeScript with predictable static types.
- Use Redux with redux-toolkit Store
- Integration with Axios for API requests
- Lint using Eslint
- Internationalization with i18next
- Minimal need for any custom CSS using Sass.
- Using Tailwindcss as class base utils
- UI Components from Ant Design
- Integration of Swiper library

## Get Start 🚀

These instructions will help you set up and run the project on your local machine for development and testing purposes.

### Prerequisites

Make sure you have the following software installed on your system:

- Node.js (v14 or higher)
- npm (v6 or higher)

### Using Git (recommended)

```shell
# clone it with git version control:
git clone https://github.com/Mohammed-Taysser/bensalman.git

# change directory:
cd bensalman

# Install dependencies:
npm install
```

### Using manual download ZIP

1. Download repository from [Here](https://minhaskamal.github.io/DownGit/#/home?url=https://github.com/Mohammed-Taysser/bensalman)
2. Uncompressed to your desired directory

## Available Scripts 🤖

### Development

```shell
# To start the development server:
# The application will be available at
# http://localhost:5173/
npm run dev
```

### Linting

```shell
# To run ESLint for code linting:
npm run lint
```

## Built With 🧰

- **React**: A JavaScript library for building user interfaces.
- **TypeScript**: A statically-typed superset of JavaScript that compiles to plain JavaScript.
- **Redux Toolkit**: A tool-set for managing state in React applications.
- **Axios**: A promise-based HTTP client for making API requests.
- **React Icons**: A collection of popular icon libraries for React.
- **React Router Dom**: A routing library for React applications.
- **Ant Design**: A UI library with a set of high-quality React components.
- **i18next**: A internationalization library for translating applications.
- **Sass**: A CSS extension language that adds power and elegance to the basic language.
- **Tailwind CSS**: A utility-first CSS framework for rapidly building custom user interfaces.
- **Swiper**: is a modern touch slider and carousel library for mobile and desktop browsers.

## Docs

### Local Storage

This class provides static methods for interacting with the browser's local storage.

> The `LocalStorage` class imports `Local_Storage_Keys` from the **config** file. This import suggests that `Local_Storage_Keys` is an object containing key-value pairs for local storage keys.

The LocalStorage class includes three static methods:

- **set**: This method sets a value in the local storage by accepting a key and a value as parameters. It checks if the key exists in `Local_Storage_Keys`, and if so, it store the value as a JSON string.

- **get**: This method retrieves a value from the local storage based on a given key. If the key exists in `Local_Storage_Keys`, it retrieve the value. If the value is null, it returns the defaultValue (if provided), otherwise it returns **null**. It also handles parsing errors and logs them to the console.

- **remove**: This method removes an item from the local storage based on a given key. It checks if the key exists in `Local_Storage_Keys` and remove the corresponding item.

This codebase provides a convenient way to interact with the browser's local storage by encapsulating the logic within a class and providing static methods for common operations like setting, getting, and removing values from the local storage.

### API

This class encapsulates an Axios instance for making API requests to a server using the Axios library.

> The `axios` module and `AxiosInstance` type are imported from the 'axios' package. The `SERVER_URL` constant is imported from the 'config' file. The `LOCAL_STORAGE` object is imported from the 'localStorage' file, and the `routes` object is imported from the 'routes' file.

The class includes several methods for making specific API requests. These methods use the Axios instance to send requests and return the response data. The methods are named after the corresponding API endpoints and accept optional request bodies or query parameters.

## Resources ☁️

- <https://themes.themegoods.com/grandrestaurantv6/home-6/>
- <https://preview.themeforest.net/item/pizza-restaurant-fast-food-cafe-restaurant-wordpress-theme/full_screen_preview/17997095>
- <https://preview.themeforest.net/item/restika-restaurant-html-template/full_screen_preview/48814938>
- <https://preview.themeforest.net/item/benoit-restaurants-cafes-wordpress-theme/full_screen_preview/31676266>
- <https://iconscout.com/free-lottie-animation/buy-online-8153716>
- <https://fooddesk.dexignlab.com/react/demo/login>
