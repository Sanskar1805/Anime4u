import "./App.css"
import WelcContent from "./components/welcomeContent"
import AnimeDetails from './components/animeDetails'
import {BrowserRouter as Router, Route, Link, Routes} from 'react-router-dom';
import NavBar from "./components/navbar";
import XYZPage from "./components/pageSearch";
import Login from "./components/login";
import Register from "./components/register"
import Chat from "./components/chat"

//function App() {
//	const [ name, setName ] = useState("")
//	const [ home, setHome ] = useState("")

//	useEffect(() => {
//		axios.et("http://localhost:8000/home").then(function(response) {
//			setHome(response.data)
//		})
//	}, [])

//	async function postName(e) {
//		e.preventDefault()
//		try {
//			await axios.post("http://localhost:8000/post_name", {
//				name
//			})
//		} catch (error) {
//			console.error(error)
//		}
//	}

//	return (
//		<div className="App">
//			<form onSubmit={postName}>
//				<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//				<button type="submit">Send Name</button>
//			</form>
//			{home}
//      <h1>{name}</h1>
//		</div>
//	)
//}

//export default App



function App() {

  return (
    <>
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
          {/* This route is for home component 
          with exact path "/", in component props 
          we passes the imported component*/}
          <Link to="/"></Link>
            
          {/* This route is for about component 
          with exact path "/about", in component 
          props we passes the imported component*/}
          <Link to="/components/animeDetails/:encodedName"></Link>
          <Link to = "/components/xyz"></Link>
          <Link to='/components/login'></Link>
          <Link to='/components/register'></Link>
          <Link to='/components/chat'></Link>
            
          <Routes>
          			<Route path="/components/animeDetails/:encodedName" element={<AnimeDetails />} />
          			<Route path="/" element={<WelcContent />} />
                <Route path="/components/xyz" element  = {<XYZPage />} />
                <Route path="/components/login" element  = {<Login />} />
                <Route path="/components/register" element  = {<Register />} />
                <Route path = "/components/chat" element = {<Chat />} /> 
        		</Routes>
      </Router>
    </>
  );
}

export default App