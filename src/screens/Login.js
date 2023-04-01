import React from 'react'
import { useState } from 'react';
import { Link,useNavigate } from 'react-router-dom';

export default function Login() {
    let navigate = useNavigate();
  const [credential, setcredential] = useState({email: "", password: "" })
    const handlesubmit = async (e) => {
        e.preventDefault();
        console.log(JSON.stringify({ email: credential.email, password: credential.password}))
        const responce = await fetch("http://localhost:5000/api/loginuser", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({email: credential.email, password: credential.password })
        });
        // console.log(responce)
        const json = await responce.json()
        console.log(json);
        if (!json.success) {
            alert("enter valid credentials")
        }
        if(json.success){
            localStorage.setItem("userEmail",credential.email)
            localStorage.setItem("authToken",json.authToken)
            console.log(localStorage.getItem("authToken"))
            navigate('/')
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
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' value={credential.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' value={credential.password} onChange={onChange} id="exampleInputPassword1" />
                    </div>
                    <button type="submit" className="btn btn-success">Login</button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>SignUp</Link>
                </form>
            </div>
        </div>
    )
}

  
