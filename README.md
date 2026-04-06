# ServeRest Cypress Challenge

Cypress + JavaScript automation for ServeRest frontend and API.

## Stack

- Cypress
- JavaScript
- Node.js

## Installation

```bash
npm install
```

No `.env` file was added because this project does not use secrets or environment-specific credentials. The target URLs are fixed in `cypress.config.js`.

## Running the tests

Run the full suite:

```bash
npm run cy:run
```

Open Cypress in interactive mode:

```bash
npm run cy:open
```

Run only frontend coverage:

```bash
npm run test:frontend
```

Run only API coverage:

```bash
npm run test:api
```

## Frontend scenarios

- Public registration ends in an authenticated state
- Admin user logs in and creates a product through the UI
- Regular user adds a product to the shopping list and increases quantity from `1` to `2`

## API scenarios

- Create a regular user successfully
- Authenticate a valid user successfully
- Create a product with admin authorization and validate retrieval

## Technical decisions

- Thin API helpers for reusable `cy.request()` calls
- Lightweight factories for unique test data
- Small custom commands only where reuse improved readability
- Specs kept explicit and scenario-oriented

## Test data

Emails and product names are unique on each run, and tests clean up created users and products whenever possible.
