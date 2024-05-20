import React, { useState } from 'react'
import { Link ,useNavigate} from 'react-router-dom';

export default function Login() {
  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const responce = await fetch("http://localhost:4000/api/loginuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await responce.json()
    console.log(json);

    if (json.success) {
      // Store authToken in localStorage
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    } else {
      alert("Enter valid credentials");
    }
  }
  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }
  return (

    <>
      <div className='container m-5'>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
          </div>

          <button type="submit" className="btn btn-primary">Login</button>
          <Link to='/createuser' className='m-5 btn btn-danger'>New User?</Link>
        </form>
      </div>
    </>
  )
}
