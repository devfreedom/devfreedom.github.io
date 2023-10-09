---
title: "[Dev Diary] 120 Days of WebDev - 1. HTML/CSS Essentials"
date: 2023-05-15T21:32
thumb: "html-css-js-logo.png"
tags: 
    - ❮Dev Diary❯
    - web development
    - front-end
---

# 1. HTML

## 1-1. HTML Structure Boilerplate
```
<!-- Indentation convention is 2 spaces -->

<!DOCTYPE html>                               <!-- Declare DOCTYPE as HTML5 -->
<html>
    <head>
      <meta charset="UTF-8">                  <!-- Set character encoding -->
      <title> Title goes here </title>
      <script async src="script.js">          <!-- DO NOT put this after the body tag waiting for DOM elements. use async/defer instead! -->
      <style></style>                         <!-- [Optional] internal CSS goes here -->
    </head>
    <body>
    </body>
</html>
```

### Naming Convention for IDs and Classes
- lowercase, with hyphens
    - Most common
    - [HTML standard](https://html.spec.whatwg.org/)
    - Optional: Use two hyphens to indicate the parent-child relationship
        - e.g. `<div class="post-image--caption">`
- lowercase, with underscores
    - [BEM style](https://en.bem.info/methodology/naming-convention/)
    - Block, element, modifier
        - `block-name__elem-name_mod-name_mod-val`
- camelCase
    - Least common
    - To match with JavaScript naming convention
    - CSS attribute selectors are case sensitive

## 1-2. HTML DOM Node Structure Example

```
                                        [DOCUMENT NODE]
                                               │
                                          [ROOT NODE]
                           ┌───────────────────┴────────────────────┐
                 [ELEMENT NODE (PARENT)]                       [ELEMENT NODE]
                     [ATTRIBUTE NODE]                         [ATTRIBUTE NODE]
            ┌──────────────┴───────────────────┐ 
[ELEMENT NODE (CHILD/SIBLING)]     [ELEMENT NODE (CHILD/SIBLING)]
      [ATTRIBUTE NODE]                   [ATTRIBUTE NODE]
```

### The Difference Between HTML Attribute and HTML Property
- HTML attribute = Additional values that provide additional information about HTML elements
- HTML property = The equivalent of HTML attribute when it comes to HTML DOM elements
- Therefore HTML properties are dynamic and live, can be changed on-air, while HTML attributes are static.

## 1-3. Semantic Tag

### What is "Semantic Tag"?
- The word "semantic" means "of or relating to the meanings of words and phrases". 
- Semantic tag is, basically a tag that indicates its meaning as well. 
    - Normally HTML tags have their roles as its name. 
        - e.g. `<div>` tag means it is meant to "divide" an area. 
        - However we don't know what `<div>` tag divides the area "for". 
- Semantic tag conveys the meaning of the tag by itself.
    - So that both human and machine can recognize the purposed use of the tag more easily.
    - e.g. `<header>` tag means the area is meant to be the header of the page.

### Semantic Tag Example
```
<header>                    <!-- header -->
  <nav>                     <!-- navigation menu -->
  </nav>                 
</header>
<main>
  <section>                 <!-- indicates the section -->
    <h1>lorem ipsum</h1>
      <p>lorem ipsum</p>
    <aside>                 <!-- indicates the sidebar or call-out box -->
      <p>lorem ipsum</p>
    </aside>
  </section>
  <article>                 <!-- indicates the article -->
    <h2>lorem ipsum</h2>
  </article>
  <article>                 <!-- indicates the article -->
    <h2>lorem ipsum</h2>          
  </article>
<footer>                    <!-- footer -->
</footer>
```
- In order to support legacy web browsers like IE9 which cannot recognize semantic tags, additional "role" property is required.
    - e.g. `<main role="main">`

## 1-4. `<meta>` tag
`<meta>` tag represents metadata that cannot be represented by other relevant HTML elements.
- If `name` attribute is set, the `<meta>` element provides document-level metadata, applied to the whole page.
    - e.g. `<meta name="viewport">`
- If `charset` attribute is set, the `<meta>` element is a charset declaration, giving the character encoding in which the document is encoded.
    - e.g. `<meta charset="utf-8">`
- Attributes
    - charset
    - content
    - http-equiv
    - itemprop

### Viewport
You can control the viewport's size and shape by using `<meta>` tag.
- Boilerplate
    - `<meta name="viewport" content="width=device-width, initial-scale=1" />`

---

# 2. CSS

## 2-1. CSS selector
```
h1 { color: blue; }                // tag type selector
.element-class { color: green }    // class selector
#element-id { color: black }       // id selector 
```
### Element selectors
- `element`
- `element.class`
    - Selects all elements with specified class
    - Not to be confused with `element .class` which selects descendants of the element, that have specified class.
        - e.g. `element.class`
            ```
            <div class="container">
                <h1 class="item">Hello</h1>
                <h2 class="item">World</h2>
            </div>
            <div class="item">
                <h1>Everyone</h1>
            </div>

            <style>
                div.item { color: blue; }
                // This selects <div>s with 'item' class only, among all <div>s.
                // This selects <div class="item">.
                // Therefore only 'Everyone' is blue.
            </style>
            ```
        - e.g. `element .class`
            ```
            <div class="container">
                <h1 class="item">Hello</h1>
                <h2 class="item">World</h2>
            </div>
            <div class="item">
                <h1>Everyone</h1>
            </div>

            <style>
                div .item { color: blue; }
                // This selects child elements with 'item' class, from all <div>s.
                // This selects <h1 class="item"> and <h2 class="item">.
                // Therefore 'Hello' and 'World' are blue.
            </style>
            ```
- `element1, element2` selector
    - Selects all `element1` elements and all `element2` elements
    - e.g. `.create-buttons, .delete-buttons`

### Descendant elements selectors
- `ancestor-element decendant-elements` selector
    - Selects all decendant elements inside the ancestor element, regardless of DOM nesting
    - e.g. `article p { font-family: sans-serif; }`
- `direct-ancestor-element > direct-descendant-elements` selector
    - Selects all directly-nested decendant elements of the ancestor, which are not wrapped in other DOM elements
    - e.g. `nav > .menu-items { font-weight: bold; }`

### Sibling element selectors
- `sibling-element ~ all-sibling-elements` selector
- `sibling-element + adjacent-sibling-only-element` selector

### Child element selectors
- Uses pseudo-class to select childeren of specific order and position
- `parent-element child-element:first-child` selector
- `parent-element child-element:last-child` selector
- `parent-element child-element:nth-child(odd)` selector
- `parent-element child-element:nth-child(even)` selector
- `parent-element child-element:nth-child(n)` selector

### Attribute selectors
- `[attribute]`
    - Select all DOM elements with the specified attribute
        - e.g. `[href] { font-weight: bold; }`
- `tag[attribute]`
    - Select tag-specified elements with the specified attribute
        - e.g. `a[href] { font-weight: bold; }`
    - Values are optional
        - e.g. `a[href="https://www.wikipedia.org"] { font-weight: bold; }`
        - Attribute suffix 
            - `[attribute*=value]` : Select all DOM elements with an attribute that includes specified custom value
                - e.g. `img[src*="icon.png"] { width: 100px; height: 100px; }`
            - `[attribute^=value]` : Select all DOM elements with an attribute that begins with specified custom value
                - e.g. `a[href^="#"] { color: blue; }`
            - `[attribute$=value]` : Select all DOM elements with an attribute that ends in specified custom value
                - e.g. `a[href$=".com"] { color: green; }`

### Pseudo-elements
CSS pseudo-element is a predefined keyword added to a selector that lets you style a specific part of the selected element.
- `selector::pseudo-element { property: value }`
    - Only one pseudo-element can be used for a single simple CSS selector.
- e.g.
    ```
    /* The first line of every <p> element. */
    p::first-line {
        color: blue;
        text-transform: uppercase;
    }
    ```

## 2-2. CSS Priority and Specificity

From hightest to lowest priority,

### First, the Location of CSS lines
- Inline attribute (e.g. `<div style="background-color: white;">`)
- Internal tag (e.g. `<head> <style> div { background-color: white; } </style> </head>`)
- External file (e.g. `<link rel="stylesheet" href="styles.css">`)

### After that,
- Cascade order
    - Priority: descending order
    ```
    h1 { color: red; }
    h1 { color: green; }
    h1 { color: blue; }

    // <h1> text color is blue, neither green nor red.
    ```
- Selector specificity
    - Priority: higher specificity > lower specificity
    ```
    h1 { color: red; }
    main h1 { color: green; }

    // <main>'s <h1> is green, not red.
    ```
- Selector priority
    - Priority: id > class > tag type
        ```
        <style>
        h1 { color: red; }
        #color { color: green; }
        .color { color: blue; }
        </style>
        
        <h1 id="color" class="color"> color </h1>

        // <h1> text color is green.
        ```
    

## 2-3. Box Model

### Margin Collapse
Some elements share the adjacent margin value vertically, instead of having their own vertical margins individually. This is done by design, to improve the readability of the layout.
- Cases
    - Adjacent sibling elements
    - Adjacent parent and decendant elements
        - The margins of top and bottom descendants also collapse with the parent's margins if there is no content seperating parent and descendants
    - Empty blocks.
        - If there is no border, padding, inline content, height, or min-height to separate a block's margin-top from its margin-bottom, then its top and bottom margins collapse.
- Example
    ```
    .black-square { margin: 10px 7px 15px 7px }
    ```
    - Result: 
        ```
         ⥑     ← This margin is 10px.
        ⥐■⥐    
         ⥑     ← This vertical margin is 15px, NEITHER 20px NOR 10px!
        ⥐■⥐
         ⥑     ← Upper and lower margin 'collapse' into one single biggest margin. This is also 15px.
        ⥐■⥐
         ⥑     ← This margin is 15px.
        ```
- Exception
    - The margins of floating and absolutely-positioned elements never collapse.
    - The margins of flex or grid items never collapse.


## 2-4. CSS Properties

### `!important` property
`!important` marks the declaration as important. The `!important flag` alters the rules selecting declarations inside the cascade.
- All `!important` declarations take precedence over all CSS animations, EXCEPT, within `@keyframes` animation declarations.
    - However, unlike CSS animations, CSS transitions take precedence over all `!important` declarations.
- No matter how high the selector specificity matches a normal declaration, an important declaration from the same source and cascade layer will always have precedence.

### `content` property
- The `content` CSS property replaces an element with a generated value. Objects inserted using the content property are anonymous replaced elements.
- `content` property is often used with pseudo-elements, for instance, `::before` and `::after`.


## 2-5. CSS Animation and Transition

### `animation` sub-properties
- `animation-delay`
    - Specifies the delay between an element loading and the start of an animation sequence and whether the animation should start immediately from its beginning or partway through the animation.
- `animation-direction`
    - Specifies whether an animation's first iteration should be forward or backward and whether subsequent iterations should alternate direction on each run through the sequence or reset to the start point and repeat.
- `animation-duration`
    - Specifies the length of time in which an animation completes one cycle.
- `animation-fill-mode`
    - Specifies how an animation applies styles to its target before and after it runs.
- `animation-iteration-count`
    - Specifies the number of times an animation should repeat.
- `animation-name`
    - Specifies the name of the @keyframes at-rule describing an animation's keyframes.
- `animation-play-state`
    - Specifies whether to pause or play an animation sequence.
- `animation-timing-function`
    - Specifies how an animation transitions through keyframes by establishing acceleration curves.

### @keyframes
`@keyframes` is an at-rule CSS statement that defines and controls intermediate steps(keyframes/waypoints) in a CSS animation sequence.
- e.g.
    ```
    @keyframes animation1 {
        from {                          // initial keyframe (same as 0%)
            margin-top: 50px;
        }
        33% {                           // intermediate percentage keyframe
            margin-top: 300px;
        }
        50% {                           // intermediate percentage keyframe
            margin-top: 150px;
        }
        to {                            // final keyframe (same as 100%)
            margin-top: 100px;
        }
    }
    ```

### Differences between `animation` and `transition`
- `animation` can loop, `transition` can run only once.
- `animation` can have intermediate steps through @keyframes, `transition` can have only initial and final state.
- `animation` can run by itself or by trigger, `transition` requires a trigger like mouse hover.
- `animation` is more difficult to use with JavaScript, while `transition` is easier.
- `animation` is more suitable for complex animation, while `transition` is more suitable for simple change of state.


## 2-6. Responsive Web and Media Query
### Media Query
- Format: `@media MEDIA_TYPE OPERATOR (CONDITION/BREAKPOINT) { }`
    - e.g. `@media screen, (min-width: 720px) and (max-width: 1080px) { }`
- Media type (optional)
    - all
    - print
    - screen 
    - speech
- Media Query needs to be located at the bottom of the stylesheet, because of (top-to-bottom cascade) CSS priority rules.
- To prevent the inheritance of the property outside `@media`, manually set the property within `@media` as `none`.
    - e.g.
        ```
        .div {
            color: green
            background-color: blue;
        }

        @media (min-width: 720px) {
            .div {
                color: yellow
                background-color: none;
            }
        }
        ```

---

# 3. Git

## 3-1. Workflow
- Working directory → Staging area → Local repo → Remote repo
    - Working directory
    - Staging area
    - Local repository
    - Remote repository

## 3-2. Commands
- Git command related to configuration
    - `git remote add`
        - Add the URL of the remote repository.
    - `git remote set-url`
        - Change the URL of already-set remote repository.
    - `git remote -v`
        - See if the remote repository is correctly configured.
- Git command related to project
    - `git init`
    - `git fork`
    - `git clone`
- Git command related to local repository

- Git command related to staging
    - `git status`
        - Displays the state of the working directory and the staging area.
    - `git add`
    - `git reset`
    - `git restore`
    - `git clean`
    - `git revert`
    - `git rm`
- Git command related to commits
    - `git commit`
    - `git log`
        - Shows the commit logs.
    - `git pull`
    - `git push`
- Git command related to branches and HEAD
    - `git checkout`
        - `git checkout [branch name]`
    - `git branch`
        - Shows the current working branch
        - `git branch [branch name]`
            - Create a new local branch.
        - `git branch -D [branch name]`
            - Delete the existing local branch.

## 3-3. Strategy
- Today, most programmers leverage one of two development models to deliver quality software -- Gitflow and trunk-based development.

### Gitflow
- Gitflow is an alternative Git branching model that involves the use of feature branches and multiple primary branches. 
    - It was first published and made popular by [Vincent Driessen at nvie](https://nvie.com/posts/a-successful-git-branching-model/).
- Compared to trunk-based development, Gitflow has numerous, longer-lived branches and larger commits. 
    - Under this model, developers create a feature branch and delay merging it to the main trunk branch until the feature is complete. 
    - These long-lived feature branches require more collaboration to merge and have a higher risk of deviating from the trunk branch.
    - They can also introduce conflicting updates.
- A stricter development model where only certain individuals can approve changes to the main code.
    - This maintains code quality and minimizes the number of bugs.

### Trunk-based development
- Trunk-based development is a version control management practice where developers merge small, frequent updates to a core “trunk” or main branch. 
    - Since it streamlines merging and integration phases, it helps achieve CI/CD and increases software delivery and organizational performance.
- It’s a common practice among DevOps teams and part of the DevOps lifecycle since it streamlines merging and integration phases. 
    - In fact, trunk-based development is a required practice of CI/CD. 
- Developers can create short-lived branches with a few small commits compared to other long-lived feature branching strategies. 
    - As codebase complexity and team size grow, trunk-based development helps keep production releases flowing.
- Trunk-based development is a more open model since all developers have access to the main code. 
    - This enables teams to iterate quickly and implement CI/CD.