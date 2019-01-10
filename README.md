Small POC that performs an offer request and dislpay JSON response in html.
It uses customeElements v1 (aka web component) to expose the facade. Internally it uses preact and fetch.

Test suites are built in jest.

### OG FE premises

- move from jasmine to jest
- jest --coverage should reach 95% coverage
- use a hook model (npm tapable)
- babel es7, webpack, polyfills
- preact, preact-custom-element

#### Related
- https://github.com/bspaulding/preact-shadow-dom
