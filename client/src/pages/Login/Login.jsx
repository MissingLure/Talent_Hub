import React, { useState } from "react";
import './Login.css';
import logo from '../../images/hanes-logo.png';
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessages, setErrorMessages] = useState([]);
    // const [login, setLogin] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        const userData = {
            email: email,
            password: password
        };
        axios.post('http://localhost:4000/user/get-user', userData)
            .then((response) => {
                localStorage.setItem('accessToken', response.data.accessToken);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                localStorage.setItem('employeeData', JSON.stringify(response.data.data));
                setErrorMessages([]);
                navigate('/inicio');
            })
            .catch((error) => {
                console.log(error.response.data);
                setErrorMessages(error.response.data.details);
            })
    };

    return (
        <div className="login">
            <div className="bar"> </div>
            <div className="login-form">
                <div className="logo-container">
                    <img src={logo}/>
                </div>
                <form className="form-container">
                    <h4>INICIO DE SESIÓN</h4>
                    <div>
                        <p >CORREO ELECTRONICO</p>
                        <input placeholder= "Correo Electronico" type="text" onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div>
                        <p>CONTRASEÑA</p>
                        <input placeholder= "Contraseña"  type="password" onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                    <div>
                    <div  >
                        {/* <Link className="a">
                        ¿Olvidaste la contraseña?
                        </Link> */}
                    </div>
                    </div>
                    <div>
                        <button onClick={handleLogin} type="button">Iniciar Sesión</button>
                    </div>
                    {errorMessages.length > 0 ? (
                        <div>
                            {errorMessages.map((message) => (
                                <p className="error-message">{message}</p>
                            ))}
                        </div>
                    ) : (
                        <p></p>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Login; 