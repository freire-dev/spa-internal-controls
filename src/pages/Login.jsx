import "./Login.css"
import {Link} from 'react-router-dom'
import { useState, useEffect } from "react"

const Login = () => {

  const[status, setStatus] = useState(false)
  const[login, setLogin] = useState()
  const[password, setPassword] = useState()

  useEffect(() => {
    if(login === 'admin'){
      if(password === 'admin'){
        setStatus(true)
      }else{
        setStatus(false)
      }
    }
  }, [login, password])

  return (
    <div className="form-login">
    <form>
      <div className="mb-3">
          <label className="form-label">Username</label>
          <input onChange={(e) => setLogin(e.target.value)} type="text" className="form-control" placeholder="Digite aqui..."/>
      </div>
      <div className="mb-3">
          <label className="form-label">Senha</label>
          <input onChange={(e) => setPassword(e.target.value)}type="password" className="form-control" placeholder="Digite aqui..."/>
      </div>
      {status === true ? <Link to={"/workarea"}><button className="btn-submit-true">Entrar</button></Link> : <button className="btn-submit-false" disabled>Entrar</button>}
    </form>
    </div>
  )
}

export default Login