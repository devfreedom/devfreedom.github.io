---
title: "[Dev Diary] 120 Days of WebDev - 4. JavaScript: Part 3"
date: 2023-06-05T18:57
thumb: "javascript-logo.png"
tags: 
    - ❮Dev Diary❯
    - web development
    - front-end
    - JavaScript
---

# (UNFINISHED ARTICLE)

# Asynchronous programming

## Blocking & Non-blocking

### Sync-blocking
### Sync-nonblocking
### Async-blocking
### Async-nonblocking

## Call Stack, Event loop, and Event Queue
```
┌──────────────────────────────────── WEB BROWSER ────────────────────────────────────┐  
│                                                                                     │
│ ┌───────── JAVASCRIPT ENGINE ──────────┐                                            │
│ │ ┌── MEM HEAP ──┐  ┌── CALL STACK ──┐ │    ┌── WEB APIs ──┐                        │
│ │ │              │  │                │ │  → │  DOM         │  ────────┐             │
│ │ │              │  │                │ │    │  XMLHttpReq  │          │             │ 
│ │ │              │  │                │ │    │  setTimeout  │          ↓             │
│ │ │              │  │                │ │    │  etc.        │ ┌── CALLBACK QUEUE ──┐ │ 
│ │ │              │  │                │ │    │              │ │                    │ │
│ │ │              │  │                │ │    └──────────────┘ │                    │ │
│ │ │              │  │                │ │                     │                    │ │
│ │ │              │  │                │ │                     │                    │ │
│ │ │              │  │                │ │                     │                    │ │
│ │ │              │  │                │ │  ← ↻ [EVENT LOOP] ← │                    │ │
│ │ └──────────────┘  └────────────────┘ │                     └────────────────────┘ │   
│ └──────────────────────────────────────┘                                            │
└─────────────────────────────────────────────────────────────────────────────────────┘ 
```
- Memory Heap
    - This is where all the memory allocation happens for your variables, that you have defined in your program.
- Event Loop
    - Event Loop monitors call stack to check if it's empty.
    - If call stack is empty, Event Loop brings asynchronous code from Callback Queue to Call Stack, for execution.
- Job Queue
    - A queue reserved only for `new Promise()`, apart from Callback Queue
    - `.then`-able methods are added to Job Queue once the promise has returned/resolved, and then gets executed.
    - Job Queue has higher priority in executing callbacks
        - If Event Loop tick comes to Job Queue, it will execute all the jobs in Job Queue first until it gets empty, then will move to Callback Queue.

### Call stack and Web APIs

### Event queue
### Job queue

## Asynchronous functions
### Callback
### Promise
### async/await

## Asynchronous web programming
### Debouncing
### Throttling

https://medium.com/@Rahulx1/understanding-event-loop-call-stack-event-job-queue-in-javascript-63dcd2c71ecd


# State management
```
 ┌── STATE MGMT. ──┐            ┌── COMPONENT ──┐ 
 │                 │            │               │ 
 │                 │ → State  → │ → Component   │ 
 │                 │   object   │   re-render   │ 
 │                 │   info     │               │ 
 │                 │            │               │         
 │                 │            │               │ ← Behavior ← [USER]
 │                 │            │               │ 
 │                 │            │               │ 
 │   New state ←   │ ← State  ← │ ← Behavior    │ 
 │   object        │   change   │   callback    │ 
 └─────────────────┘            └───────────────┘ 
```
- State manager