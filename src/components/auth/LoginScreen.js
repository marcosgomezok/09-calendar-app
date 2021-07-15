import React from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { startLogin, startRegister } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';
import './login.css';





export const LoginScreen = () => {

    const dispatch = useDispatch()

    const [ formLoginValues, handleLoginInputChange] = useForm( {
        lEmail: 'Marcos@gmail.com',
        lpassword: '123456'
    } );
    
    const [ formRegisterValues, handleRegisterInputChange] = useForm( {
            rName: 'Javier',
            rEmail: 'Javier@gmail.com',
            rpassword1: '123456',
            rpassword2: '123456'
    } );
        
    const { rEmail, rName, rpassword2, rpassword1} = formRegisterValues;
    


    
    const {lEmail,lpassword} = formLoginValues

    const handleLogin = (e)=>{
        e.preventDefault();
        dispatch(startLogin(lEmail,lpassword))
    }
    const handleRegister = (e)=>{
        e.preventDefault();
        if(rpassword1!== rpassword2) {
            return Swal.fire('Error','Las contraseñas deben de ser iguales')
        }
        dispatch(startRegister(rEmail,rpassword1,rName))
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <input 
                                type="text"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={lEmail}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lpassword"
                                value={lpassword}
                                onChange={handleLoginInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input 
                                type="submit"
                                className="btnSubmit"
                                value="Login" 
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={rName}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={rEmail}
                                onChange={handleRegisterInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña" 
                                name="rpassword2"
                                value={rpassword2}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña" 
                                name="rpassword1"
                                value={rpassword1}
                                onChange={handleRegisterInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <input 
                                type="submit" 
                                className="btnSubmit" 
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}