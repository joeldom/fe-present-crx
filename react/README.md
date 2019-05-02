![logo](src/img/Vertex_GPS_logo.svg)

# Vertex Hub UI

## Before you start

- Install [Node.js](https://nodejs.org/).
- Install [NPM](https://www.npmjs.com/get-npm).
- Ensure that your IDE of choice is setup to read the linting on the project. This includes `.eslintrc` and `.prettierrc`. For Visual Studio Code, this includes [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) and [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode).
  - `.eslintrc` ensures that the project's script style pattern is adhered to.
  - `.prettierrc` enforces both of the above in the IDE on save and on commit.

## Installation

After each major feature deploy it is recommneded to do a fresh install to pull any new project dependencies added to the `package.json` file.

- Install everything with the command `npm install`.

## Configuration

Prior to starting the **App** check your local `.env` file `.env.development` to see that there are connections pointing to the external services that allow for the **App** to function.

**example** `.env.development` file with default connections

```
REACT_APP_AUTH_SERVER=https://authenticationhubalpha.bihub.us/connect/token
REACT_APP_API_SERVER=https://vertex-vertexapi-qa.careform.us/api/v1
REACT_APP_EPA_PORTAL=https://paportalalpha.bihub.us/login
REACT_APP_CLIENT_ID=9C9334CE-1598-4F07-9DC1-E6D920C51FFD
REACT_APP_GOOGLE_ANALYTICS_TRACKING_ID=
```

## How to Run

- Run the app with `npm start`.
- Test the app with `npm test`.
- Build a production ready bundle of the app with `npm run build`.

## Third-Party React Components

This section provides more information and context about third party react packages that this project uses.

- [Reactstrap](https://reactstrap.github.io/)

## Stylesheets

_need to add how components are styled_
