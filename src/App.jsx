import './App.css'
import List from "./components/List.jsx";

function App() {

    return (
        <div className='container'>
            <nav className='navbar sticky-top navbar-light bg-dark mb-5'>
                <h1>Rick and Morty</h1>
            </nav>
            <List />
        </div>
    );
}

export default App
