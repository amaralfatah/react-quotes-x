import Navbar from './components/Navbar/index.jsx'
import Quote from './components/Quote/index.jsx'
import ListAuthor from "./components/ListAuthor/index.jsx";
function App() {
  return (
    <>
      <Navbar/>
        <main>
            <Quote/>
            <ListAuthor/>
        </main>
    </>
  )
}

export default App
