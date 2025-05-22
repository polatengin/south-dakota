# Playwright Testing Example

This repository demonstrates how to use [Playwright](https://playwright.dev/) to automate browser actions and test the [JSONBin](https://jsonbin.io/) APIs.

## Features

- **Automated login** to JSONBin and retrieval of the API key.
- **API tests** for creating bins using the retrieved API key.
- **Cross-browser testing** setup with Playwright.
- **Demo UI tests** for Playwright's own website and a sample TodoMVC app.

## Project Structure

```sh
tests/
  jsonbin.setup.spec.ts     # Logs in and saves the API key from JSONBin
  jsonbin.spec.ts           # Uses the API key to test JSONBin APIs
  playwrightdemo.spec.ts    # Example UI tests for playwright.dev and TodoMVC
playwright-state/.auth/     # Stores the API key after login
```

## Prerequisites

- [Node.js](https://nodejs.org/) (v16+ recommended)
- [npm](https://www.npmjs.com/)
- JSONBin account credentials

## Setup

1. **Install dependencies:**

   ```sh
   npm install
   ```

2. **Set environment variables:**

   Create a `.env` file or export these variables in your shell:

   ```sh
   JSONBIN_EMAIL=your-email@example.com
   JSONBIN_PASSWORD=your-password
   ```

## Running the Tests

To run all tests:

```sh
npm test
```

Or run individual test files:

```sh
npx playwright test tests/jsonbin.setup.spec.ts
npx playwright test tests/jsonbin.spec.ts
npx playwright test tests/playwrightdemo.spec.ts
```

## Test Descriptions

- **jsonbin.setup.spec.ts**  
  Automates login to JSONBin, navigates to the API Keys page, and saves your API key to `playwright-state/.auth/key.json`.

- **jsonbin.spec.ts**  
  Uses the saved API key to make API requests to JSONBin, such as creating a new bin and verifying the response.

- **playwrightdemo.spec.ts**  
  Contains example UI tests for:
  - [Playwright.dev](https://playwright.dev/): Checks the page title and navigation.
  - [TodoMVC Demo](https://demo.playwright.dev/todomvc): Demonstrates advanced UI testing, including adding, editing, completing, and filtering todo items, as well as verifying persistence and routing.

## Notes

- The setup test (`jsonbin.setup.spec.ts`) must be run before the API tests to ensure the API key is available.
- Test results and reports are saved in the `test-results/` and `playwright-report/` directories.
- You can customize the test configurations in the `playwright.config.ts` file.
- For more advanced usage and configurations, refer to the [Playwright documentation](https://playwright.dev/docs/intro).
