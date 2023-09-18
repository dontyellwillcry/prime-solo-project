# Let's Cook Together - React App

Welcome to **Let's Cook Together**, a fun and interactive cooking app inspired by *Don't Starve Together*. With this app, you can cook up delicious recipes with friends or by yourself. Here's a quick guide on how to use the app and some information about the technologies used to build it.

## Table of Contents

- [Getting Started](#getting-started)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with Let's Cook Together, follow these simple steps:

1. **Clone the Repository**: Start by cloning this repository to your local machine.

```bash
git clone git@github.com:dontyellwillcry/prime-solo-project.git
```

2. **Install Dependencies**: Navigate to the project directory and install the required dependencies for both the frontend and backend.

```bash
cd lets-cook-together
npm install
cd client
npm install
```

3. **Run the App**: Start the development server for both the frontend and backend.

```bash
# In the project root directory
npm run server
npm run client
```

Now you should be able to access the app by opening your browser and navigating to `http://localhost:3000`.

## Features

- **Ingredient Selection**: After logging in, users can select up to 4 ingredients from a list. These ingredients will be added to a virtual crockpot.

- **Cooking Simulation**: Once ingredients are selected, the crockpot will begin to shake, simulating the cooking process.

- **Recipe Generation**: After a few seconds of shaking, a recipe will be generated based on the selected ingredients and displayed to the user.

- **Favorites**: Users can mark recipes as favorites and save them to their favorites page for future reference.

## Technologies Used

Let's Cook Together is built using the following technologies:

- JavaScript
- React
- React Redux
- Node.js
- Express.js
- Redux Saga

## Installation

If you want to run this app locally, please follow the [Getting Started](#getting-started) section above.

## Usage

1. **User Registration/Login**: Register or log in to your account to get started.

2. **Ingredient Selection**: After logging in, browse the list of ingredients and click up to 4 ingredients you'd like to use for cooking.

3. **Cooking Simulation**: Watch your crockpot shake as it simulates the cooking process based on your ingredient selection.

4. **Recipe Generation**: After the simulation is complete, a recipe will be displayed based on your selected ingredients.

5. **Favorites**: If you liked a recipe, click the favorite button to save it to your favorites page.

6. **Favorites Page**: Visit your favorites page to see all your saved recipes. You can also remove recipes from your favorites list if you change your mind.

## Contributing

Contributions to this project are welcome! If you'd like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.