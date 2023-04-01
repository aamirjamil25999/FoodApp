import React from 'react'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function Signup() {
    const [credential, setcredential] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.geolocation }))
        const responce = await fetch("http://localhost:5000/api/createuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credential.name, email: credential.email, password: credential.password, location: credential.geolocation })
        });
        console.log(responce)
        const json = await responce.json()
        console.log(json);
        if (!json.success) {
            alert("enter valid credentials")
        }
    }
    const onChange = (e) => {
        setcredential({ ...credential, [e.target.name]: e.target.value })
    }
    return (
        <div>
            <div className='container'>
                <form onSubmit={handlesubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control" name='name' value={credential.name} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credential.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control" name='geolocation' value={credential.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn btn-success">SignUp</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Login</Link>
                </form>
            </div>
        </div>
    )
}
