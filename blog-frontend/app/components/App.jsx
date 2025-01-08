import React from "react"
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom"
import Home from "../routes/home.jsx"
import "../styles/app.css"

function Layout({ children }) {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
          />
  
          <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-rbOnV4ZjRhEvs2b7q+tvJ8W2HmcHsFt/y5wh1yJoEieNJ4V+/XWp/70q2KIB3j5B"
            crossOrigin="anonymous"
          />
  
          <link rel="stylesheet" href="./app.css?url" />
        </head>
        <body>
          {children}
  
          <script
            src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-ENjdO4Dr2bkBIFxQpeoYDNKda1w6W9QU6JoaGz1JZjL/rfRaFsaBXjs3f7kBYI62"
            crossOrigin="anonymous"
          ></script>
  
          <ScrollRestoration />
          <Scripts />
        </body>
      </html>
    )
  }
  

function ErrorBoundary({ error }) {
  let message = "Oops!"
  let details = "An unexpected error occurred."
  let stack

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error"
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message
    stack = error.stack
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        </ErrorBoundary>
      </Layout>
    </BrowserRouter>
  )
}