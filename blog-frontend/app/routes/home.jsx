import App from '../components/App.jsx'

export function meta({}) {
  return [
    { title: "My Blog" },
    { name: "description", content: "Welcome to my blog!" }
  ]
}

export default function Home() {
  return <App />
}
