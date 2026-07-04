import { useEffect, useState } from "react"
import { login, register } from "./utils/auth.utils";
function App() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState ('');
const [lastname, setLastname] = useState('');
const [user, setUser] = useState(null);

useEffect(() => {
  const storedUser = localStorage.getItem('user');
  if (storedUser) {
    setUser(JSON.parse(storedUser));
  }
}, []);

useEffect(() => {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}, [user]);

useEffect(() => {
  if (user){
    const products = await fetch("https://upload-data-api.vercel.app/api/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${user.token}`
      }.then(response => response.json()).then(data => {
        console.log(data);
      }).catch(error => {
        console.error("Fetch products error:", error.message);
      })
    });
  }
}, [user]);

const handleLogin = async (e) => {
  const response = await login(e, { email, password });
  setUser(response.data);
}
  return (
    <div>      
      {user ? (
        <div>
          <h2>Bienvenido, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </div>
      ):(
        <>
        <form>
        <label htmlFor="inputEmail">Email</label>
        <input type="text" id="inputEmail" onChange={(e)=>{setEmail(e.target.value)}}/>
        <label htmlFor="inputPassword">Passwors</label>
        <input type="password" id="inputPassword" onChange={(e)=>{setPassword(e.target.value)}}/>
        <label htmlFor="inputName">Name</label>
        <input type="text" id="inputName" onChange={(e)=>{setName(e.target.value)}}/>
        <label htmlFor="inputLastname">Lastname</label>
        <input type="text" id="inputLastname" onChange={(e)=>{setLastname(e.target.value)}}/>
        <button onClick={(e)=>{register(e, {email,password,name,lastname})}}>registrarse</button>
      </form>

      <form>
        <label htmlFor="inputEmail">Email</label>
        <input type="text" id="inputEmail" onChange={(e)=>{setEmail(e.target.value)}}/>
        <label htmlFor="inputPassword">Passwors</label>
        <input type="password" id="inputPassword" onChange={(e)=>{setPassword(e.target.value)}}/>
        <button onClick={(e)=>{handleLogin(e, {email,password,name,lastname})}}>login</button>
      </form>
        </>
      )}
    </div>
  )
}

export default App
