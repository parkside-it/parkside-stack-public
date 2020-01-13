# Parkside Stack

[![Build status](https://badge.buildkite.com/0bea2c3c6e4a9d08c6df43f9ce0edb8d9a4e26d1455516b02a.svg?branch=master)](https://buildkite.com/parkside-it/parkside-stack) ![license](https://img.shields.io/badge/license-MIT-green)

The main purpose of the Parkside Stack is to be used as a starting point for new responsive web projects. It is based on Angular (UI), NestJS (Backend) using a MySQL database.

## Setup

Make sure you have installed the following:

-   Ruby `brew install ruby` (https://www.ruby-lang.org/en/documentation/installation/)

-   NPM via NVM https://github.com/nvm-sh/nvm#installation-and-update (NVM is the go-to solution for consistently managing Node versions across different local development environments.)

-   Yarn `brew intall yarn` (https://yarnpkg.com/lang/en/docs/install/)

Execute `yarn install` from the root directory

Copy the `.env.defaults` file and rename it to `.env` in the root directory

## Development server

Run `rake up` to build the MySQL and Adminer docker containers and start the API and the frontend locally for development.

Run `rake down` to stop and remove the docker containers.

Navigate to:

-   http://localhost:4200/en or http://localhost:4200/de for frontend (depending on if you built the frontend in EN or DE, default is EN)
-   http://localhost:8080/ for Adminer
-   http://localhost:3333/ for API
-   http://localhost:3333/docs for API documentation

## Other commands

-   Run `rake test` to run API and frontend unit tests
-   Run `rake coverage` to run unit tests and generate a code coverage report. This report can be found under `coverage/apps/(api|frontend)/index.html`
-   Run `rake e2e` to run the UI tests using cypress
-   Run `rake generate_locales` to generate i18n translation files
-   Run `rake lint` to check the code style via lint
-   Run `rake lint_fix` to fix the code style via lint
-   Run `rake prettier` to check the code style via Prettier
-   Run `rake prettier_fix` to fix the code style via Prettier

---

This project was generated using [Nx](https://nx.dev).

🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**

## Quick Start & Documentation

[Nx Documentation](https://nx.dev/angular)

[10-minute video showing all Nx features](https://nx.dev/angular/getting-started/what-is-nx)

[Interactive Tutorial](https://nx.dev/angular/tutorial/01-create-application)

## Build

Run `ng build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Angular i18n (Internationalization)

As Angular’s i18n handling might seem “counter-intuitive” at first sight, here’s a short summary:

1. Angular i18n documentation suggests a separate app **bundle per locale**

    - allows AOT (ahead-of-time) compilation increasing performance (no translation @ runtime)
    - e.g. AT language hosted on /at, proxy delegates to proper AT port

1. Annotate i18n translatable HTML strings with an **“i18n” HTML attribute**
1. Create/update messages.xlf default **XLF locale file** based on all i18n strings:

    - Update command: `ng xi18n --output-path src/locale`

1. Create/update additional **XLF files per local** (e.g. messages.de.xlf)
1. Run non-default i18n settings:

    - With `rake up` running, open another terminal tab and run `ng serve --configuration=de --port=4201`.

## Running unit tests

Run `ng test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `ng e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.

## How to create a new release

1. Verify that the current state of the project folder is what you want to release
1. Update the CHANGELOG.md with new version information.
1. Clone [parkside-stack-public](https://bitbucket.org/parksideit/parkside-stack-public)
1. Run the release script from the project root: `sh ops/publish_tools/create-release.sh <dest>` where `dest` is the path to where you have the public project cloned to.
1. Verify that there are no files in the public folder that disclose Parkside internal information.
1. Create a new commit in the public repo with a new version tag. Make sure to follow the already used versioning scheme of the public repo.
1. Also tag the commit that was used from the private repo with the same version number.

## Further help

Visit the [Nx Documentation](https://nx.dev/angular) to learn more.
