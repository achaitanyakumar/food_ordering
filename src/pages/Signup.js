import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

export default function Signup() {
    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    let navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const responce = await fetch("http://localhost:4000/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });
        const json = await responce.json()
        console.log(json);

        if (!json.success) {
            alert("Enter vaild credentials")
        }
        if(json.success){
            navigate("/login")
        }
    }

    const onChange = (event) => {
        setcredentials({ ...credentials, [event.target.name]: event.target.value })
    }
    return (
        <>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Name</label>
                        <input type="text" className="form-control" name="name" value={credentials.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" name="password" value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Address</label>
                        <input type="text" className="form-control" id="exampleInputPassword2" name="geolocation" value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">SignUp</button>
                    <Link to='/login' className='m-5 btn btn-danger'>Already a User?</Link>
                </form>
            </div>
        </>
    )
}
