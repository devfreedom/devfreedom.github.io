---
title: "[Dev Diary] 120 Days of WebDev - 5. React: Part 1"
date: 2023-06-12T20:15
thumb: "react-logo.png"
tags: 
    - ❮Dev Diary❯
    - web development
    - front-end
    - JavaScript
    - TypeScript
    - React
    - JSX
    - TSX
---

# (UNFINISHED ARTICLE)

I have read somewhere that if Vue.js is JavaScript wrapped in HTML, React is HTML wrapped in JavaScript. And now I see, that person is goddamn right. React feels like a dynamic HTML generator written in JavaScript. While Vue.js feels like a JavaScript-powered web publisher. Very interesting.

React is definitely less abstract, less opinionated, more flexible. That means, it can be harder for Average Joe to learn. I can feel that the learning curve is indeed steep, but that's probably because of React's own way of doing things - exotic structure and mechanism. I have a feeling that once I get used to the uniqueness of React and JSX, maybe it's not too difficult to push forward. 

---

# React and JSX

## create-react-app
Create React App is a React boilerplate generator.

### Install and run using npx
- npx is an npm package runner. npx makes it easy to install and manage dependencies hosted in npm registry. It simplifies the process and provides a better for executables.
- To install create-react-app,
    - `$ npx create-react-app@latest . --template typescript`
    - `$ npm install -g create-react-app` is no longer supported
- To create a boilerplate React app,
    ```
    create-react-app app-name --template typescript
    ```
- To run a React app,
    ```
    $ npm run start
    ```

## React naming convention
- React is an unopinionated framework. It doesn't have any specific guidelines or statements about naming conventions. 
- For file names
    - camelCase.jsx
    - PascalCase.jsx
    - kebab-case.jsx

## Using JavaScript inside JSX
- If you want to comment on something in JSX you need to use JavaScript comments inside of curly braces 
    - e.g. `{/* Comment here /}`
- Use curly brackets to wrap and use JavaScript values
    - e.g. `<Counter title="First counter" initValue={10}></Counter>`

## How to import modules
```
import defaultExport from "module-name";
import * as name from "module-name";
import { export1 } from "module-name";
import { export1 as alias1 } from "module-name";
import { export1 , export2 } from "module-name";
import { foo , bar } from "module-name/path/to/specific/un-exported/file";
import { export1 , export2 as alias2 , [...] } from "module-name";
import defaultExport, { export1 [ , [...] ] } from "module-name";
import defaultExport, * as name from "module-name";
import "module-name";
```

## React app code example
```
// File: App.tsx

import React from 'react';
import './App.css';

// Define strong types for TypeScript
type CounterProps = {
    title: string;
    initValue: number;
}

function Counter(props: CounterProps) {

    // Pass props.initValue to React.useState() to set the state
    const countState = React.useState(props.initValue);
    let count = countState[0];
    let setCount = countState[1];

    function up() {
        setCount(count + 1);
    };

    // Define inline CSS styles
    const layoutStyle = {
        border: "10px solid black",
        backgroundColor: "#eeeeee",
    };

    return(
        // Use inline CSS styles
        <div style="{layoutStyle}">
            <h1>{props.title}</h1>

            // Obstructive event handler for now
            <button onClick={up}>+</button> {count}
        </div>
    );
}

function App() {
    return (
        <div>
            <Counter title="First counter" initValue={10}></Counter>      
            <Counter title="Second counter" initValue={20}></Counter>
        </div>
    );
}

export default App;
```

## React Components
- React Component is independent and reusable bits of code, wrapped in a user-defined HTML tag
    - e.g.
        ```
        function App (){
            return(
                <Fragment>
                    <p>Hello</p>
                    <p>World</p>
                </Fragment>
            );
        };
        ```
    - A React component needs to be wrapped in a single HTML parent element
        - `div` tag
        - empty `<> </>` tag
            - = `Fragment` tag
- Naming convention
    - The name of JSX function that defines a React component uses PascalCase
        - e.g. `function Counter()` instead of `function counter()`
    - React component props uses PascalCase
        - e.g. `type CounterProps = { title: string; initValue: number; }`
- Every single HTML tag inside the component, which is going to be returned, must have corresponding closing tags.
    - even for void elements that normally don't need a closing tag in HTML5, needs closing tags in React
        - e.g. 
            ```
            function App(){
                return(
                    <Fragments>
                        Hello<br>World;    # ERROR!
                    </Fragments>
                );
            }
            ```
                - `<br>` needs to be `<br></br>`
    - Or just use self-closing tags instead
        - e.g. `<br />`
- React Props
    - React Props are like function arguments in JavaScript and attributes in HTML.
        - Passed from parent element into child element (?)
- Function-type React component
    - Function component goes to JS Stack
        - Not allocated in memory, only alive during runtime
        - HTML properties can only be passed into function component as React Props, one-way, read-only
            - e.g. `Counter()` is a function-type React component
                - `Counter`'s HTML attributes pass into function component `Counter()`'s argument `props`
                    - initValue={10} → props.initValue
            - But function component cannot change HTML properties accordingly
                - Function component cannot manipulate HTML properties, and re-render the component based on new updated values, despite necessity upon interaction
        - Function component can't have lifecycle and state
            - Therefore React Hooks can do this for function components instead

- Class-type React component
    - Class component goes to JS Heap
        - Allocated in memory
        - Class component can have built-in codes for lifecycle and state
    - e.g.
        ```
        type MyProps = {
        // using `interface` is also ok
            message: string;
        }
        type MyState = {
            count: number; // like this
        }
        class App extends React.Component<MyProps, MyState> {
            state: MyState = {
                // optional second annotation for better type inference
                count: 0,
            }
            render() {
                return (
                    <div>
                        {this.props.message} {this.state.count}
                    </div>
                );
            }
        }
        ```

## React Hook
- A Hook is a special function that lets you “hook into” React features.

## State Management
- What is state?


- If the state is object or array, manipulating some of its elements do not trigger re-rendering because it's not the whole state that has changed.
    - In order to trigger re-rendering, clone the state and then manipulate elements from there.


### React setState() Hook
-
- If `setCount` gets changed, the React component `Counter` gets reloaded
    - With the old `count` value, which is the initial `prop.initValue`,
    - not with the new `count` value, which is re-generated by `setCount`
        - Again, React Props can only be passed into a function like an argument, one-way, read-only.
- To fix this problem, React components should have in-house state information, via React Hooks (for function component), or in-class state (for class component).

### React useState() Hook
- Call useState at the top level of your component to declare a state variable.
    - The convention is to name state variables like [something, setSomething] using array destructuring.
    - useState is a Hook, so you can only call it at the top level of your component or your own Hooks. 
        - You can’t call it inside loops or conditions. 
    - In Strict Mode (non-production mode), React will call your initializer function twice in order to help you find accidental impurities. 
- useState returns an array with exactly two values:
    - The current state. During the first render, it will match the initialState you have passed.
    - The set function that lets you update the state to a different value and trigger a re-render.
        - The set function returned by useState lets you update the state to a different value and trigger a re-render. You can pass the next state directly, or a function that calculates it from the previous state.
        - set functions do not have a return value.

### Refactor React useState() Hook using destructuring assignment
```
// function Counter(props: CounterProps) {
//     const countState = React.useState(props.initValue);
//     let count = countState[0];
//     let setCount = countState[1];
//     ...
// }

// REFACTORED: Destructuring assignment
function Counter( { title, initValue } : CounterProps ) {

    // REFACTORED: Destructuring assignment
    const [count, setCount] = React.useState(initValue);

    function up() {
        setCount(count + 1);
    };

    const layoutStyle = {
        border: "10px solid black",
        backgroundColor: "#eeeeee",
    };

    return(
        <div style="{layoutStyle}">
            <h1>{title}</h1>
            <button onClick={up}>+</button> {count}
        </div>
    );
};

function App() {
  return (
    <div className="App">
      <Counter title="Counter" initValue={10}/>
    </div>
  );
}
```

### Refactor useState() using arrow function
```
// REFACTORED: Store Counter() function in a variable
const Counter = ({ title, initValue } : CounterProps) => {
  console.log("Counter being rendered")
  const [count, setCount] = useState(initValue);
  
  const clickHandler = () => {
        // REFACTORED: Use arrow function with argument to manipulate current state
        setCount((oldCount) => oldCount +1);
  };

  return(
    <div>
      <h1>{title}</h1>
      <button onClick={clickHandler}>+</button> {count}
    </div>
  );
}
```

## React useEffect() Hook
- Side effect
    - The additional effects that needs to be processed asynchronously, after the component has been rendered initially
        - so that it doesn't get triggered every time upon re-rendering

## React/JSX and CSS
- e.g.
    ```
    ...

    const testStyle = {
        border: "10px solid black",
        backgroundColor: "#eeeeee"
    };

    ...

    return(
        <div className="App">
            <div style={testStyle}>
                <p>Hello World</p>
            </div>
        </div>
    );

    ...
    ```
- Inline CSS styles for JSX needs to be defined as object, not string.
- Inline CSS properties for JSX use camelCase, unlike kebab-case in CSS.
    - e.g. `backgroundColor`, not `background-color`
- React components cannot use the word `class` for HTML class attribute.
    - because JavaScript/TypeScript is already occupying the `class` keyword
    - use `className` instead
        - e.g. `<button className="btn">`
- Issues
    - If we use an external CSS file for components, such CSS classes and its names might affect other components.
    - Solution: Instead of using a generic external CSS file, import CSS stylesheet as module.

### create-react-app CSS Modules
- create-react-app supports CSS Modules alongside regular stylesheets using the `stylesheetname.module.css` file naming convention.
    - CSS Modules let you use the same CSS class name in different files without worrying about naming clashes. 
- To avoid CSS class name duplication, create-react-app reads CSS class names from `stylesheetname.module.css`, and then creates and uses randomly-generated seperate CSS class names based on original names.
- e.g.
    - App.module.css
        ```
        .title{
            color:red,
        }
        ```
        - The value of `counterModuleStyle.title` is randomly-generated and non-duplicate `.app_title_9u83b`, not the original `.title`

### Refactoring external CSS using CSS Modules
```
import React from 'react';
import './App.css";

// ADDED: Import external CSS Modules
import counterModuleStyle from "./App.module.css"

function Counter( { title, initValue } : CounterProps ) {
    const [count, setCount] = React.useState(initValue);

    function up() {
        setCount(count + 1);
    };

    return(
        <div style="{layoutStyle}">

            // ADDED: Use CSS styles from CSS Modules
            <h1 className={counterModuleStyle.title}>{props.title}</h1>

            <button className="btn" onClick={up}>+</button> {count}
        </div>
    );
};

function App() {
    return (
        <div>
            <Counter title="First counter" initValue={10}></Counter>      
            <Counter title="Second counter" initValue={20}></Counter>
        </div>
    );
};

export default App;
```


## {children} property


## `<input>` element default value
- defaultValue
- defaultChecked

## Event handling
- Event handling function
    - Declare an event handling function and assign it to the element
    - Pass an anonymous event handling function into the element
- DOM element's event passes an event object into the event handling function
    - The content of the event object varies depending on the DOM element


https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key

When using map() for an array of elements, using `key` property is recommended.

```
// Original code
[A, B, C, D].map((el, index) => <div key={el}>{el}</div>)

// Result
<div key={A}>{A}</div>  // Rendered
<div key={B}>{B}</div>  // Rendered
<div key={C}>{C}</div>  // Rendered
<div key={D}>{D}</div>  // Rendered

// Then, element "E" is added in the middle

// Result
<div key={A}>{A}</div>  // Skips re-rendering
<div key={B}>{B}</div>  // Skips re-rendering
<div key={E}>{E}</div>  // Rendered
<div key={C}>{C}</div>  // Skips re-rendering
<div key={D}>{D}</div>  // Skips re-rendering
```
    - Only the difference gets rendered

Using `index` as a value for `key` is not recommended. Here is why.
```
// Code
[A, B, C, D].map((el, index) => <div key={index}>{el}</div>)

// Result
<div key={0}>{A}</div>  // Rendered
<div key={1}>{B}</div>  // Rendered
<div key={2}>{C}</div>  // Rendered
<div key={3}>{D}</div>  // Rendered

// Then, element "E" is added in the middle

// Result
<div key={0}>{A}</div>  // Skips re-rendering
<div key={1}>{B}</div>  // Skips re-rendering
<div key={2}>{E}</div>  // Rendered
<div key={3}>{C}</div>  // Re-rendered
<div key={4}>{D}</div>  // Re-rendered
```
    - Unnecessary waste of resource happens because of 

