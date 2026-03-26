import { useState } from "react";
import Modal from "./Modal";
import { login } from "../../api/auth";

export default function LoginModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [user, setUser] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    console.log(email, password)
    try {
      const response = await login({email, password})
      console.log(response)
      setUser(response.user)
      //TODO handle login data with Auth
    } catch (error) {
      console.warn(error)
      const data = await error.json()
      console.log(data)
      if(error.status === 401) {
        setError(data.message)
      }
    }
  }

  return <Modal open={open} onClose={onClose} title="Log in to Motify">
      {!user && <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">
            Email*&nbsp;
          </label>
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}/>
        </div>
        <div>
          <label htmlFor="password">
            Password*&nbsp;
          </label>
          <input type="password" required value={password} onChange={e => setPassword(e.target.value)}/>
        </div>
        <div>

        {error && (
          <p className="field-error">{error}</p>
        )}
        </div>
        <button type="submit">
          Login
        </button>
      </form>}
      {user && (
        <div>
          Welcome back `{user.name}`
          <div>
            <button type="button" onClick={() => setUser(null)}>
              Logout
            </button>
          </div>
        </div>
      )}
  </Modal>;
}
