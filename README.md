# README

## Folder Structure
- The `page object` folder contains the definitions for elements and methods.
- The `test` folder includes all the test cases.
- All test cases are implemented using the Page Object Model (POM) design pattern.
- To execute the scripts, install Playwright and run the following command:
    ```
    npx browserstack-node-sdk playwright test --grep "@bsm" --browserstack.config "browserstack.yml"
    ```

