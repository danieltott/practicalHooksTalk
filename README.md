# Example App from my Practical Hooks talk

In my [hooks talk for the Cleveland React Meetup](https://www.meetup.com/Cleveland-React/events/261043210/), I live-coded a conversion from a class-based app to one using [hooks](https://reactjs.org/docs/hooks-intro.html).

This repo has branches containing each step along the way, from the [basic class-based app](https://github.com/danieltott/practicalHooksTalk/tree/00-base) to the [completed thing](https://github.com/danieltott/practicalHooksTalk/tree/06-Bonus-UserFilterContext).

I created Pull Requests detailing each step, to make it easy to see diffs along the way:

- [Bonus Step 6 - Create a UserFilter Context and Custom Hook](#10)
- [Bonus Step 5 - Move api client into Context](#9)
- [Step 4 - Convert Todos component](#8)
- [Step 3 - Create useLoad custom hook and integrate into App component](#7)
- [Step 2 - Convert SelectUsers component](#6)
- [Step 1 - Convert Filter component](#5)

([master](https://github.com/danieltott/practicalHooksTalk) and [the final branch are identical](https://github.com/danieltott/practicalHooksTalk/tree/06-Bonus-UserFilterContext)

## General Hooks Resources:
Here are some resources I've found helpful:

- ### Hooks Docs
  An invaluable resource, expecially [Hooks Reference](https://reactjs.org/docs/hooks-reference.html) and [Hooks FAQs](https://reactjs.org/docs/hooks-faq.html)
- ### [A Complete Guide to `useEffect`](https://overreacted.io/a-complete-guide-to-useeffect/)
  A super-deep dive into `useEffect`; really helped me understand how to deal with effect dependencies and their relationship with the render.
- ### [Writing Resilient Components](https://overreacted.io/writing-resilient-components/)
  A great resource for anyone writing components, but especially if you are beginning to use hooks.
- ### [How to fetch data with React Hooks?](https://www.robinwieruch.de/react-hooks-fetch-data/)
  A seminal article on doing data fetching with Hooks. Robin runs through a number of different approaches and use-cases for fetching data.
- ### [`stop-runaway-react-effects`](https://github.com/kentcdodds/stop-runaway-react-effects)
  A small package to help development - this overwrites `useEffect` to throw an error when an effect has run too many times at once. Prevents crashing your browser when you've [messed up an effect dependency and created an infinite loop](https://twitter.com/Jack_Franklin/status/1123255283839578119).
- ### [Official hooks ESLint Plugin](https://reactjs.org/docs/hooks-rules.html#eslint-plugin)
  A fantastic tool to help with following the rules of hooks, and to help manage dependency arrays.




# If you'd like to run this locally:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
