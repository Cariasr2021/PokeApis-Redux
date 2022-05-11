import React from "react";
import Pokemones from "./components/Pokemones";
import Login from "./components/Login";
import { BrowserRouter as Router, 
        Routes, 
        Route} from "react-router-dom";
import { auth } from "./firebase";
import NavBar from "./components/NavBar";
import Perfil from "./components/Perfil";


function App() {
  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    const fetchData = () => {
      auth.onAuthStateChanged(user => {
          console.log(user)
          if(user){
              setFirebaseUser(user)
          }else{
              setFirebaseUser(null)
          }
      })
    }
    fetchData()
  }, [])

  return firebaseUser !== false ? (
    <Router>
      <div className="container mt-3">
        <NavBar />
        <Routes>
          <Route element={<Pokemones />} path='/'/>
          <Route element={<Login />} path='/login'/>
          <Route element={<Perfil />} path='/perfil'/>
        </Routes>
      </div>
    </Router>):
    (
      <div>Cargando...</div>
    )
  
}

export default App;
