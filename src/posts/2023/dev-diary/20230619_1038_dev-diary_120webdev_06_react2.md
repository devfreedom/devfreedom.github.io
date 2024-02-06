---
title: "[Dev Diary] 120 Days of WebDev - 6. React: Part 2"
date: 2023-06-19T10:38
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

# Next.js Basics

## Installation
```
$ npx create-next-app@latest
```

## Folder Structure
- Static assets
    - Next.js can serve static files, like images, under a folder called `public` in the root directory. 
    - Files inside public can then be referenced by your code starting from the base URL ( / ). 
        - e.g. `<img src="/logo.svg">`
    - For static metadata files, such as robots.txt , favicon.ico , etc, you should use special metadata files inside the app folder.

## Routing in Next.js

### Code example
- File structure
    ```
    / (project root)
    ├ /app
    │  ├ /segment1
    │  │  ├ /segment2  
    │  │  │   └ page.js
    │  │  ├ layout.js
    │  │  └ page.js
    │  ├ layout.js
    │  └ page.js
    ├ /public
    ├ /node_modules
    ├ package.json
    ├ package-lock.json
    ├ jsconfig.json
    ├ (...)
    └ next.config.js
    ```
- URL/Path structure: https://www.example.com/**segment1**/**segment2**
    - **segment1/segment2** = URN (Uniform Resource Name)
- /app/layout.js (global layout file)
    ```
    export const metadata = {
        title: 'Next.js',
        description: 'Routing Practice',
    }

    export default function RootLayout({children}){
        return(
            <html>
                <body>
                    <h1>Welcome to Next.js Root Layout File</h1>
                    <div>
                        <a href="/">Click here to render / (root)</a>
                    </div>  
                    <div>
                        <a href="/segment1">Click here to render <b>/segment1</b> as 'children' below.</a>
                    </div>
                    <div>
                        <a href="/segment1/segment2">Click here to render <b>/segment1/segment2</b> as 'children' below.</a>
                    </div>  
                    <hr />
                    {children}
                </body>
            </html>
        );
    }
    ```
- /app/page.js (component for global layout)
    ```
    export default function RootChildren() {
        return (
            <>
                <p>This paragraph (/page.js) is a child component for the global root layout (/layout.js)</p>
            </>
        );
    }
    ```
- /app/segment1/layout.js (local layout file)
    ```
    export default function Layout(props){
        return(
            <>
                <h1>Welcome to Local Layout File at /segment1 (/segment1/layout.js)</h1>
                {props.children}
            </>
        );
    }
    ```
- /app/segment1/page.js (component for local layout)
    ```
    export default function Segment1(){
        return(
            <>
                <p>This paragraph (/segment1/page.js) is a child component for the local layout (/segment1/layout.js)</p>
            </> 
        );
    }
    ```
- /app/segment1/segment2/page.js
    ```
    export default function Segment2(){
        return(
            <>
                <p>This paragraph (/segment1/segment2/page.js) is an isolated child component</p>
            </> 
        );
    }
    ```
- When routed to /segment1,
    1. Next.js tries to find a folder named `segment1` inside `/app`.
    2. And then Next.js looks for `page.js` file inside that folder.
    4. Next.js passes what `page.js` component returns into `layout.js` of the same folder.
        - Or into `layout.js` of the parent's folder if there is no layout file in the same folder.
            - e.g. `/segment1/segment2/page.js` elements are passed into `/segment1/layout.js` because `/segment1/segment2/layout.js` does not exist.
        - For global layout file, elements returned by the component of the root `page.js` file are passed into the `{children}` argument.
        - For local layout file, elements returned by the component of the local `page.js` file are passed into the `{prop.children}` argument.
    4. `layout.js` receives the `page.js` elements as `children` argument and renders it.

### Dynamic Routing
- Instead of having a fixed route, a Dynamic Segment can be created by wrapping a folder's name in square brackets: [folderName].
    - e.g. [id] or [slug]
- Dynamic Segments can be access from useRouter.
- e.g.
    ```
    import { useRouter } from 'next/router'
    
    export default function Page() {
        const router = useRouter()
        return <p>Post: {router.query.slug}</p>
    }
    ```
    - Route	= pages/blog/[slug].js
    - Example URL = /blog/a
    - `params` = { slug: 'a' }

## Navigation in Next.js

### Pages
- In Next.js, a page is a React Component exported from a file in the pages directory.
    - Simply create a JS file under the pages directory, and the path to the file becomes the URL path.
- Pages are associated with a route based on their file name. For example, in development,
    - `pages/index.js` is associated with the / route.
    - `pages/posts/first-post.js` is associated with the /posts/first-post route.
        - e.g. pages/posts/first-post.js
            ```
            export default function FirstPost() {
                return <h1>First Post</h1>;
            }
            ```

### `<Link>` Component
- When linking between pages on websites, you use the `<a>` HTML tag.
- In Next.js, you can use the Link Component next/link to link between pages in your application. 
    - `<Link>` allows you to do client-side navigation and accepts props that give you better control over the navigation behavior.
- Using `<Link>`
    - First, open pages/index.js, and import the Link component from next/link by adding this line at the top:
        ```
        import Link from 'next/link';
        ```
    - And then replace `<a href="">` tag with `<Link href="">`.
- This enables 'Single Page Application manuever' in Next.js, by having many pages, but to keep it as such using client side transitions only, not using `<a>` tag.

---

# Next.js Styling
- Global CSS: Simple to use and familiar for those experienced with traditional CSS, but can lead to larger CSS bundles and difficulty managing styles as the application grows.
- CSS Modules: Create locally scoped CSS classes to avoid naming conflicts and improve maintainability.
- Tailwind CSS: A utility-first CSS framework that allows for rapid custom designs by composing utility classes.
- Sass: A popular CSS preprocessor that extends CSS with features like variables, nested rules, and mixins.
- CSS-in-JS: Embed CSS directly in your JavaScript components, enabling dynamic and scoped styling.

---

# Next.js Backend

## Next.js API route
- API routes provide a solution to build your API with Next.js.
- Any file inside the folder pages/api is mapped to /api/* and will be treated as an API endpoint instead of a page. 
    - They are server-side only bundles and won't increase your client-side bundle size.
- e.g.
    - Create a new `route.js` file, instead of `page.js` file, inside the `/app/api` folder to use it as an API server.
        - /app/api/segment3/route.js
        ```
        import { NextResponse } from "next/server";

        export async function GET(){
            return NextResponse.json({ message: "Hello World" });
        }
        ```
    - (npm run dev) `https://localhost:3000/segment3/` returns a JSON object `{ "message" : "Hello World" }`

## Next.js Is A Server
- Next.js is considered as React Server Component by default.
    - React Server Component
        - Secure data
        - Cookie header
        - `fetch()`
        - etc.
    - React Client Component
        - `fetch()`
        - `useState()`
        - `useEffect()`
        - `onClick()`
        - `onChange()`
        - `useRouter()`
        - `useParams()`
        - etc.
- Therefore you can't use Client Component hooks with Next.js.
    - e.g. The code below won't work, shows ReactServerComponentsError instead.
        ```
        export default function RootLayout({children}) {
            const [json, setJson] = useState([]);
            useEffect(() => {
                fetch.("http://localhost:9999/json")                // There is a JSON server running locally
                    .then((resp) => resp.json())
                    .then((result) => {
                        console.log("result", result);
                        setJson(result);
                    });
            }, []);
    
            return(
                <>
                    <h1> Check your console to see the received JSON object. </h1>
                    <ul>
                        {json.map((item)=>{
                            return (
                                <li key={item.id}>
                                    <Link href={"/json-segments/" + item.id}>{item.title}</Link>
                                </li>
                            );
                        })};
                    </ul>
                </>
            );
        }
        ```
- Instead, if network communication is needed, use `async/await` without `useEffect()`.
    ```
    // REFACTORED: RootLayout() as an async function
    export default async function RootLayout({children}) {
        
        // REFACTORED: Discard useState() and useEffect()
        // const [json, setJson] = useState([]);
        // useEffect(() => {  }, []);
        
        // REFACTORED: use await on fetch() and resp.json()
        const resp = await fetch.("http://localhost:9999/json")                // There is a JSON server running locally
        const result = await resp.json();                

    (...)
    ```
- In order to use Client Component hooks anyway,
    - Add `"use client";` at the top of the module code file (e.g. layout.js)
    
