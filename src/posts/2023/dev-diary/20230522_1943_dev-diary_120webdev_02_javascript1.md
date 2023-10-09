---
title: "[Dev Diary] 120 Days of WebDev - 2. JavaScript: Part 1"
date: 2023-05-22T19:43
thumb: "javascript-logo.png"
tags: 
    - ❮Dev Diary❯
    - web development
    - front-end
    - JavaScript
---

# (UNFINISHED ARTICLE)

# JavaScript?

JavaScript is about,
- Asynchronous I/O
- Event-driven (callback)


# Variable
Variable is a named reference to a value. That way an unpredictable value can be accessed through a predetermined name.

## Variable naming convention
- camelCase is preferred
- Includes alphabets(a-z, A-Z), numbers(0-9), underscore(_), dollar sign(mostly for jQuery)
- Variable name starts with a letter, cannot start with a number.
- Variable name cannot include reserved words


## Variable declaration
- Variable is a named reference as in 'identifiable and allocated space inside memory'.



## Hoisting



## Initialization

## Evaluation

## Literal

### Template literal

## Expression


# Data type

## Primitive data type

## Reference data type

### Object 

## Type conversion

### Implicit type conversion

### Explicit type conversion

## Type coercion

### Primitive coercion

### Numeric coercion

# JavaScript Object

## What is Object?
An object is a collection of properties, and property is a pair of key and value. When the value is function, the property is called "method".

### How to create an object
- Object literal
    - `var object = { key1: value1, key2: value2 }`
- Object() constructor 
    - `new Object(value)`
- `object.prototype.constructor`
- `Object.create()` method
- Object class (ES6)

### How to control an object property
- Access
    - `object.key`
    - `object["key"]`
    - If the property doesn't exist, this creates a property and assigns a value. If there is a property already, this updates the value.
- Delete
    - `delete object.key`

### ES6 object literal extension
- ES5
    ```
    var object = {
        name: "John Doe",
        phone_no: "123456789",
        input: input,
        output: output,
        call: function(){
            call_phone();
        }
    }
    ```
- ES6
    ```
    var object = {
        name: "John Doe",
        phone_no: "123456789",
        input,                      // property duplicates are abbreviated
        output,                     // property duplicates are abbreviated
        call(){                     // method is abbreviated
            call_phone();
        }
    }
    ```

# Arrow function
