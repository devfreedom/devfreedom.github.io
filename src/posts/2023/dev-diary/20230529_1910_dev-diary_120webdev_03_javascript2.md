---
title: "[Dev Diary] 120 Days of WebDev - 3. JavaScript: Part 2"
date: 2023-05-29T19:10
thumb: "javascript-logo.png"
tags: 
    - ❮Dev Diary❯
    - web development
    - front-end
    - JavaScript
---

# (UNFINISHED ARTICLE)

# Javascript memory structure

### Memory heap
- Where reference type data is stored
- Dynamic binding

### Call stack
- Where primitive type data is stored
    - managed via execution context
        - `this` keyword
        - scope chain
        - execution order

# Execution context
## Why does it matter?
To prevent bug and memory leak, and make debugging easier.
- JavaScript is a managed/interpreted language but also acts like a compiled language when handled by JavaScript engine.

### Global execution context

### Function execution context


## Scope

### Scope chain



## Dynamic binding
### Function call circumstances
- Function call
    - Calling the function directly
- Method call
    - Calling the method inside the object
- Constructor call
    - Calling the constructor function
- Indirect function call
    - e.g. via `call` and `apply`
- Callback function call

### dynamic binding of `this` keyword
- For arrow function
    - `this` keyword points to the execution context of the function that is called.
    - In this case, `this` is fixed, not dynamic
        - `call` or `bind` or `apply` cannot affect `this` keyword.
        - Useful when using `setTimeout()` where `this` keyword is dynamic
- For regular function
    - `this` keyword points to the new execution context ready to be generated.





## Closure
- JavaScript functions are first-class objects which can be treated like object and variable.
    - JavaScript closure makes use of this charactersitic by "absorbing" the outer variables into the function's scope.
        - The scope of the outer variables is determined by the execution context at the moment of execution.




### Strict mode and Sloppy mode



---

# ES6 - Rest and spread operator


---

# JavaScript modules

Import
- `import * as VARIABLE from "MODULE-NAME"`
- Import via destructured assignment
    - `import {VARIABLE1, VARIABLE2, ...} from "MODULE.js"`

Export






# HTMLcollection

### How to convert ?
- use `new Array()` constructor
- use `[...iterableObj]` ES6 spread syntax
