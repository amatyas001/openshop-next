Serverless React template for e-commerce web applications with integrated payment processing, built on top of [Vercel's Next Framework](https://nextjs.org) to achieve great SEO experience and short loading times by the build time static site generation and server side rendered dynamic pages.

## Technology Architecture

### Framework

**[React](https://reactjs.org)** - _Open-source JavaScript library for building user interfaces._

> Core application framework.

**[Next](https://nextjs.org/)** - _React framework offering server-side rendering, automatic code-splitting, static exporting._

> Wrapper for React to implement JAM stack.

**[Redux](https://redux.js.org)** - _Predictable state container._

> Global application state management.

**[Chakra UI](https://chakra-ui.com)** - _Simple, modular and accessible component library._

> Core UI element composition.

**[Stripe](https://stripe.com)** - _Online payment processing for internet businesses._

> Perform business actions.

### Testing

**[Jest](https://jestjs.org)** - _Delightful javascript testing framework with a focus on simplicity._

> Functional testing for components.

**[Styleguidist](https://react-styleguidist.js.org/)** - _Isolated React component development environment with a living style guide._

> Manual testing and documentation.

### Pipeline

**[Circle CI](https://circleci.com)** - _Continuous integration platform in the cloud._

**[Netlify](https://netlify.com)** - _Builds, deploys and hosts your front-end._

## Usage

As payment is processed by Stripe, for the first step **Stripe API Keys** must be set in `.env.local` to populate them to the application _(see: `.env.local.example`)_. API keys can be obtained from [Stripe's Official Website](#https://stripe.com). Use the received **test keys** in the environment file and visit the Stripe Dashboard to review API events.

### Development

- **`npm run dev`**

> Run the default NextJS development server to work in live environment.

- **`npm run debug`**

> Run debug server which is configured to VSCode by default and Chrome DevTools can be attached to it.

- **`npm run start:lambda`**

> Run _dedicated lambda functions_ from `lib/lambda` directory. This is **neccessary to perform payment actions**. Execute it parallel with the `npm run dev` command _(in a new terminal tab or use `npm-run-all` package or similar)_.

- **`npm run test`**

> Run Jest and Cypress test suites on the application.

- **`npm run test:watch`**

> Execute Jest test suites in watch mode. Run `npm run test:unit` to execute the default `jest` command.
> _Coverage can be generated with `npx jest --coverage` which will overwrite the reports in the `docs` folder._

- **`npm run docs:server`**

> Run _React Styleguidist_ in development live environment.

### Production

- **`npm run build`**

> Create production ready build from the Next application

- **`npm run export`**

> Export built Next application to `out` folder

- **`npm run build:lambda`**

> Transpile lambda functions from `libs/lambda` into `lambda-build` used by Netlify Functions

- **`npm run docs:build`**

> Create a production build from React Styleguidist and Jest coverage into `docs` direrctory

## License

_The project is licensed under **[The MIT License](https://opensource.org/licenses/MIT)** &copy; Copyright 2020 Mátyás Angyal_

> Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
>
> The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
>
> THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
