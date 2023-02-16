import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { useAuth } from './service/AuthService'

const Login = () => {
    const auth = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(auth.isLoggedIn());

    const boxStyle = {
        backgroundColor: '#edf1f7',
        width: '350px',
        borderRadius: '0.375rem'
    }

    const imgStyle = {
        height: '75px',
        width: 'auto'
    }

    const doLogin = () => {
        auth.login(email, password).then((res) => {
            if (res) {
                setLoggedIn(true);
            }
        }).catch((err) => {
            console.log("Failed login")
        })
    }

    return (loggedIn ? <Navigate to="/" replace /> :
        <div className="d-flex flex-column justify-content-center align-items-center h-100">
            <div className="p-5" style={boxStyle}>
                <div>
                    <img style={imgStyle} className="mx-auto d-block mb-4" src="/logo.png" alt="RMFA logo" />
                </div>
                <div className="form-floating mb-4">
                    <input type="email" className="form-control" placeholder="name@example.com"
                        value={email} onChange={(event) => {
                            setEmail(event.target.value)
                        }} />
                    <label className="form-label">Email</label>
                </div>
                <div className="form-floating mb-4">
                    <input type="password" className="form-control" placeholder="Password"
                        value={password} onChange={(event) => {
                            setPassword(event.target.value)
                        }} />
                    <label className="form-label">Password</label>
                </div>
                <div className="d-grid col-4 mx-auto">
                    <button className="btn btn-primary"
                        onClick={doLogin}>
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
}

export { Login };