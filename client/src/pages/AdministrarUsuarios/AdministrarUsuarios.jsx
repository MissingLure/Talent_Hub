import { useEffect, useState } from "react";
import './AdministrarUsuarios.css';
import axios from "axios";
import deletear from '../../images/delete.png'
import editar from '../../images/editar.png';
import Navbar from "../../components/Navbar/Navbar";
import ModificarUsuarioPopUp from "../ModificarUsuarios/ModificarUsuarioPopUp";

const AdministarUsuarios = () => {
    const [showAddUserPopup, setShowAddUserPopup] = useState(false);
    const [showPopup2, setShowPopup2] = useState(false);
    const [showPopupModificar, setShowPopupModificar] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    const [responseMessage, setResponseMessage] = useState('');
    const [empleados, setEmpleados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [userExists, setUserExists] = useState(false);

    //User data
    const [user, setUser] = useState([]); 
    const [employee, setEmployee] = useState('');
    const [search, setSearch] = useState('');
    const [selectRol, setSelectRol] = useState('');

    //Informacion usuario
    const [numeroIdentidad, setNumeroIdentidad] = useState('');
    const [idEmpleado, setIdEmpleado] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContrasena] = useState('');
    const [rol, setRol] = useState('');

    const handleGetEmployees = () => {
        axios.get('http://localhost:4000/data/obtener-empleados')
            .then((response) => {
                const employeeData = response.data.data;
                const filteredEmployees = employeeData.filter(employee => {
                    return !usuarios.find(usuario => usuario.id === employee.id);
                });
                setEmpleados(filteredEmployees);
                console.log(filteredEmployees);
            })
            .catch((error) => {
                console.log(error.response.data.data);
            });
    };

    const handleGetUsuarios = () => {
        axios.get('http://localhost:4000/data/obtener-usuario')
            .then((response) => {
                const usuariosData = response.data.data;
                setUsuarios(usuariosData);
            })
            .catch((error) => {
                setErrorMessages(error.response.data.data || ['Error fetching users']);
            });
    };

    const handleGetUser = (empleado) => {
        console.log(empleado)
        axios.post('http://localhost:4000/user/get-employee-user', { employeeId: empleado })
            .then((response) => {
                if (response.data.success) {
                    setUser(response.data.data);
                    setErrorMessages([]);
                } else {
                    setErrorMessages(response.data.details || ['Error fetching user']);
                }
                setUserExists(response.data.success);
            })
            .catch((error) => {
                setErrorMessages(error.response.data.data || ['Error fetching user']);
            });
    };

    const handleDeleteUser = async (id_usuario) => {
        try {
            console.log(id_usuario)
          const response = await axios.delete(
            `http://localhost:4000/user/delete-user/${id_usuario}`
          );
          console.log("Usuario eliminado exitosamente:", response.data);
          handleGetEmployees();
          handleGetUsuarios();
        } catch (error) {
          console.error("Hubo un error eliminando el usuario!", error);
        }
    };

    const getRoleName = (roleNumber) => {
        const role = Number(roleNumber); 
        switch (role) {
            case 0:
                return 'Administrador';
            case 1:
                return 'Jefe';
            case 2:
                return 'Empleado';
            default:
                return 'Unknown';
        }
    };

    const handleCrearUsuario = () => {
        const userData = {
            idEmpleado: employee.id_empleado,
            rol: rol,
            correo: correo,
            contrasena: contraseña,
        };
        console.log(userData)
        if(handleGetUser(userData.idEmpleado)){
            alert('Este empleado ya tiene usuario.');
            setErrorMessages(['Error creating user']);
            return;
        }

        axios.post('http://localhost:4000/create/crear-usuario', userData)
            .then((response) => {
                if (response.data.success) {
                    setResponseMessage(response.data.details);
                    setErrorMessages([]);
                    alert("Usuario creado con éxito");
                    handleCloseUser1();
                } else {
                    setErrorMessages(response.data.details || ['Error creating user']);
                    handleGetEmployees();
                    handleGetUsuarios();
                }
            })
            .catch((error) => {
                setErrorMessages(error.response.data.data || ['Error creating user']);
                handleGetEmployees();
                handleGetUsuarios();
            });
    };

    const closeForm = () => {
        setInfoOpen(false);
        setContrasena('');
        setRol('');
    };

    const handleInfo = (user) => {
        setSelectedUser(user); // Set the selected user
        setShowPopup2(true);
    };

    const handleCloseUser1 = () => {
        setShowAddUserPopup(false);
    };

    const handleCloseUser = () => {
        setShowPopup2(false);
    };

    useEffect(() => {
        handleGetEmployees();
        handleGetUsuarios();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleRolChange = (e) => {
        setSelectRol(e.target.value);
    };

    const filteredUsers = usuarios.filter(user =>
        user.correo.toLowerCase().includes(search) &&
        (selectRol === '' || user.rol == selectRol)
    );

    return (
        <div className="administrar-usuarios">
            <Navbar />
            <h2><b>Administrar Usuarios</b></h2>
            <h4>Manten orden de los empleados con acceso a la página web.</h4>
            <div className="search-options">
                <div>
                    <label>Rol</label>
                    <select value={selectRol} onChange={handleRolChange} style={{backgroundColor:'#656379', color: 'white', marginLeft:'5px'}}>
                        <option hidden value=''>Seleccione</option>
                        <option value='' >Seleccione</option>
                        <option value='0'>Administrador</option>
                        <option value='1'>Jefe</option>
                        <option value='2'>Empleado</option>
                    </select>
                    <input placeholder="Buscar correo..." onChange={handleSearchChange}/>
                    <button className="add-button" onClick={() => setShowAddUserPopup(true)}>
                        Crear
                    </button>
                </div>
            </div>
            <div className="bodys-container">
                <div className="container4">
                    <table>
                        <thead>
                            <tr>
                                <th>ID Usuario</th>
                                <th>Correo</th> 
                                <th>ID Empleado</th>
                                <th>Rol</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user.id_usuario}>
                                        <td>{user.id_usuario}</td>
                                        <td>{user.correo}</td>
                                        <td>{user.id_empleado}</td>                     
                                        <td>{getRoleName(user.rol)}</td>
                                        <td>
                                            <button onClick={() => {
                                                setSelectedUser(user); // Set the selected user
                                                setShowPopupModificar(true); // Show the modification popup
                                            }}>
                                                <img src={editar} alt='Editar' />
                                            </button>
                                            <button onClick={() => handleInfo(user)}>
                                                <img src={deletear} alt="Delete" />
                                            </button> 
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5">No hay datos.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {showPopup2 && (
                    <div className="popups">
                        <div className="popups2-content">
                            <h3>Esta seguro de borrar {selectedUser.correo}</h3>
                            <br/>
                            <button onClick={() => handleDeleteUser(selectedUser.id_usuario)}>Eliminar Usuario</button>
                            <button onClick={handleCloseUser}>Cerrar</button>
                        </div>
                    </div>
                )}

                {showPopupModificar && selectedUser && (
                    <div className="popups">
                        <div>
                            <ModificarUsuarioPopUp
                                user={selectedUser}
                                onClose={() => setShowPopupModificar(false)}
                            />
                        </div>
                    </div>
                )}

                {showAddUserPopup && (
                    <div className="popups">
                        <div className="popups1-content">
                            <div className="user-create-form">
                                <h2><b>Crear Usuario</b></h2>
                                <div>
                                    <select onChange={(e) => setEmployee(empleados.find(emp => emp.id_empleado === e.target.value))}>
                                        <option value="">Seleccionar empleado</option>
                                        {empleados.map((empleado) => (
                                            <option key={empleado.id_empleado} value={empleado.id_empleado}>
                                                {empleado.primer_nombre} {empleado.primer_apellido}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <select onChange={(e) => setRol(e.target.value)}>
                                        <option>Seleccionar rol</option>
                                        <option value={0}>Administrador</option>
                                        <option value={1}>Jefe</option>
                                        <option value={2}>Empleado</option>
                                    </select>
                                </div>
                                <div>
                                    <input placeholder="Número de identidad" value={employee.numero_identidad || ''} readOnly='true' />
                                </div>
                                <div>
                                    <input placeholder="Correo electrónico" onChange={(e) => setCorreo(e.target.value)} />
                                </div>
                                <div>
                                    <input type="password" placeholder="Contraseña" onChange={(e) => setContrasena(e.target.value)} />
                                </div>
                                <div>
                                    <button onClick={handleCloseUser1}>Cerrar</button>
                                    <button onClick={handleCrearUsuario}>Aceptar</button>
                                </div>
                            </div>
                            
                            <div>
                                {errorMessages.length > 0 ? (
                                    errorMessages.map((message, index) => (
                                        <p key={index} className="error-message">{message}</p>
                                    ))
                                ) : (
                                    <p>{responseMessage}</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdministarUsuarios;
