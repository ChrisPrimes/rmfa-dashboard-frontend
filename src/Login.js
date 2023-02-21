import React, { useState } from 'react';
import { Navigate } from "react-router-dom";
import { AuthService } from './service/AuthService';
import { InputButton } from './component/InputButton';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loggedIn, setLoggedIn] = useState(AuthService.isLoggedIn());
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

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
        setError(false);
        setLoading(true);
        AuthService.login(email, password).then((res) => {
            if (res) {
                setLoggedIn(true);
            }
        }).catch((err) => {
            setError("Login failed. Please try again.");
        }).finally(() => {
            setLoading(false);
        })
    }

    return (loggedIn ? <Navigate to="/" replace /> :
        <div className="d-flex flex-column justify-content-center align-items-center h-100">

            {error &&
                <div className="alert alert-warning alert-dismissible fade show" role="alert">
                    {error}
                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            }

            <div className="p-5" style={boxStyle}>
                <div>
                    <img style={imgStyle} className="mx-auto d-block mb-4" src="/logo.png" alt="RMFA logo" />
                </div>
                <div className="form-floating mb-4">
                    <input type="text" className="form-control" placeholder="username"
                        value={email} onChange={(event) => {
                            setEmail(event.target.value)
                        }} />
                    <label className="form-label">Username</label>
                </div>
                <div className="form-floating mb-4">
                    <input type="password" className="form-control" placeholder="Password"
                        value={password} onChange={(event) => {
                            setPassword(event.target.value)
                        }} />
                    <label className="form-label">Password</label>
                </div>
                <div className="d-grid col-4 mx-auto">
                    <InputButton className="btn btn-primary" onClick={doLogin} loading={loading}>
                        Login
                    </InputButton>
                </div>
            </div>
        </div>
    );
}

export { Login };