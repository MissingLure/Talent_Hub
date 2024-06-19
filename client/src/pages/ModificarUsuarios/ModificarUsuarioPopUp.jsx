import React, { useState, useEffect } from 'react';
import './ModificarUsuarioPopUp.css';

const ModificarUsuarioPopUp = ({ onClose, user }) => {
    const [correo, setCorreo] = useState('');
    const [id, setId] = useState('');
    const [rol, setRol] = useState('');

    useEffect(() => {
        if (user) {
            setCorreo(user.correo);
            setId(user.id_empleado);
            setRol(user.rol);
        }
    }, [user]);

    const handleCorreoChange = (event) => {
        setCorreo(event.target.value);
    };

    const handleIdChange = (event) => {
        setId(event.target.value);
    };

    const handleRolChange = (event) => {
        setRol(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updateData = {};
        if (correo) updateData.correo = correo;
        if (id) updateData.id_empleado = id;
        if (rol) updateData.rol = rol;

        try {
            const response = await fetch(`http://localhost:4000/update/usuario/${user.id_usuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updateData),
            });

            if (response.ok) {
                const result = await response.json();
                alert(result.message); 
                onClose(); 
            } else {
                const error = await response.json();
                alert(error.message); 
            }
        } catch (error) {
            console.error('Error updating user:', error);
            alert('Error updating user'); 
        }
    };

    return (
        <div className="modificar-usuario-popup">
            <div className="contenido-usuario">
                <div className="formulario-container-usuario">
                    <h2 className="titulo-usuario">Modificar Usuario</h2>
                    <form onSubmit={handleSubmit} className="formulario-usuario">
                        <div className="input-wrapper-usuario">
                            <label htmlFor="correo">Correo:</label>
                            <input type="email" id="correo" value={correo} onChange={handleCorreoChange} placeholder="Correo" />
                        </div>
                        <div className="input-wrapper-usuario">
                            <label htmlFor="id">ID:</label>
                            <input type="text" id="id" value={id} onChange={handleIdChange} placeholder="ID" />
                        </div>
                        <div className="input-wrapper-usuario">
                            <label htmlFor="rol">Rol:</label>
                            <input type="text" id="rol" value={rol} onChange={handleRolChange} placeholder="Rol" />
                        </div>
                        <div className="button-wrapper-usuario">
                            <button type="submit">Guardar cambios</button>
                            <button type="button" onClick={onClose}>Regresar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ModificarUsuarioPopUp;
