# React Table Fullstack example

[Open on stackblitz](https://stackblitz.com/edit/node-lpxjwv?file=src/App.tsx)


To add to your project:
```sh
npm i react-table
npm i -D @types/react-table 
```

Add the following files to your project:
1. [react-table-config.d.ts](https://github.com/remult/react-table-fullstack-example/blob/master/src/react-table-utils/react-table-config.d.ts) - A typescript definition file that adds support for react table filter, sort etc....
2. [remult-react-table](https://github.com/remult/react-table-fullstack-example/blob/master/src/react-table-utils/remult-react-table.ts) - the code for `useRemultReactTable`


## React 17
Note that `react-table` only supports React 17 at this time.

To downgrade a `create-react-app` project to React 17 change the dependencies `package.json`
```json
    "@testing-library/jest-dom": "^5.16.1",
    "@testing-library/react": "^12.1.2",
    "@types/jest": "^27.4.0",
    "@types/node": "^16.11.19",
    "@types/react": "^17.0.38",
    "@types/react-dom": "^17.0.11",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "typescript": "^4.5.4",
    "web-vitals": "^2.1.3"
```

And change the `index.tsx` to 
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

```