import { use, useState } from "react"
import { login, register } from "./utils/auth.utils";
function App() {
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [name, setName] = useState ('');
const [lastname, setLastname] = useState('');
const [user, setUser] = useState(null);


const handleLogin = async (e) => {
  const response = await login(e, { email, password });
  setUser(response.data);
}
  return (
    <div>
      <h1>Hello world</h1>
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
      
      {user && (
        <div>
          <h2>Bienvenido, {user.name}!</h2>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  )
}

export default App
