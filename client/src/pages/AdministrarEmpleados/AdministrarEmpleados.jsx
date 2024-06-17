import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdministrarEmpleados.css";
import axios from "axios";
import inform from "../../images/info.png";
import borrar from '../../images/delete.png';
import editar from '../../images/editar.png';
import CrearEmpleado from "../CrearEmpleado/CrearEmpleado";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "react-modal";
import ModificarEmpleadoPopUp from "../ModificarEmpleados/ModificarEmpleadoPopUp";

const AdministarEmpleados = () => {
  //demas
  const [errorMessages, setErrorMessages] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const [empleados, setEmpleados] = useState([]);
  const [addEmployee, setAddEmployee] = useState(false);
  const [modifyOpen, setModifyopen] = useState(false);
  const [employee, setEmployee] = useState("");
  const [bosses, setBosses] = useState([]);
  const [boss, setBoss] = useState("");
  const [hasBoss, setHasBoss] = useState(false);
  const [selectedBoss, setSelectedBoss] = useState("");
  const [email, setEmail] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [search,setSearch] = useState('');
  const [selectDepartamento, setSelectDepartamento] = useState('');
  const [selectPuesto,setSelectPuesto] = useState('');
  const [puesto, setPuesto] = useState([]);
  const [departamento, setDepartamento]=useState([]);

  //popups
  const [showPopup, setShowPopup] = useState(false);
  const [showPopup2, setShowPopup2] = useState(false);
  const [showPopupModificar, setShowPopupModificar] = useState(false);
  const [showBossPopup, setShowBossPopu] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSucces] = useState(false);

  const handleClosePopup = () => {
    setShowPopup2(false);
    setShowPopup(false);
    setShowPopupModificar(false);
    setShowBossPopu(false);
    setSelectedBoss("");
  };

  const handleBuscar = () => {
    const data = {
      email: email,
    };
    axios
      .post("http://localhost:4000/user/get-user", data)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem(
          "employeeData",
          JSON.stringify(response.data.data)
        );
        setErrorMessages([]);
        setMessage("Usuario encontrado");
      })
      .catch((error) => {
        console.log(error.response.data);
        setErrorMessages(error.response.data.details);
      });
  };

  const handleGetEmployees = () => {
    axios
      .get("http://localhost:4000/data/obtener-empleados")
      .then((response) => {
        setEmpleados(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };

  const handleGetEmployee = (idEmpleado) => {
    axios
      .post("http://localhost:4000/data/obtener-empleado", {
        idEmpleado: idEmpleado,
      })
      .then((response) => {
        setEmployee(response.data.data[0]);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };

  const handleGetBosses = () => {
    axios
      .get("http://localhost:4000/data/obtener-jefes")
      .then((response) => {
        setBosses(response.data.data);
      })
      .catch((error) => {
        console.log(error.response.data.data);
      });
  };

  const handleModifyEmployeeClick = (empleado) => {
    console.log (empleado)
    setSelectedEmployee(empleado);
    setShowPopupModificar(true);
  };

  const handleGetBoss = (employeeId) => {
    axios
      .post("http://localhost:4000/data/obtener-jefe-por-empleado", {
        employeeId: employeeId,
      })
      .then((response) => {
        if (response.data.success) {
          setHasBoss(true);
          setMessage("");
        } else {
          setHasBoss(false);
          setMessage(response.data.details);
        }
        setBoss(response.data.data);
      })
      .catch((error) => {
        setErrorMessages(error.response.data.details);
      });
  };

  const handleSetBoss = (employeeId, bossId) => {
    console.log(employeeId, bossId);

    axios
      .post("http://localhost:4000/update/asignar-jefe", {
        employeeId: employeeId,
        bossId: bossId,
      })
      .then((response) => {
        setMessage("Se ha asignado el jefe con exito!");
        setSucces(true);
        handleGetEmployees();
      })
      .catch((error) => {
        setErrorMessages(error.response.data.details);
      });
  };

  const handleCloseUpdate = () => {
    setModifyopen(false);
  };

  // const handleInfo=()=>{
  //     setShowBossPopu(true);
  //     setShowPopup2(false);
  // }

  const handleGetUsuarios = () => {
    axios
      .get("http://localhost:4000/data/obtener-usuario")
      .then((response) => {
        setUsuarios(response.data.data);
        // setUserExists(true);
      })
      .catch((error) => {
        setErrorMessages(error.response.data.data);
        // setUserExists(false);
      });
  };

  const handleDeleteEmployee = async (id_empleado) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/user/delete-employee/${id_empleado}`
      );
      console.log("Empleado eliminado exitosamente:", response.data);
      handleGetEmployees();
    } catch (error) {
      console.error("Hubo un error eliminando el empleado!", error);
    }
  };

  //IMPLEMENTACION DE CONSEGUIR ENCUESTAS SEGUN PERFIL DE PUESTO
  const handleSurveysByJobProfileId = async (jobProfileId) => {
    try {
      const response = await axios.fetch(`http://localhost:3000/api/surveys/job-profile/${jobProfileId}`);

      console.log("Surveys by job profile id:", response.data);

    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  };

  const handleGetUser = (empleado) => {
    setEmployee(empleado);
    axios
      .post("http://localhost:4000/user/get-employee-user", {
        employeeId: empleado.id_empleado,
      })
      .then((response) => {
        if (response.data.success) {
          setUser(response.data.data);
          setErrorMessages([]);
        } else {
          setErrorMessages(response.data.details);
        }
        setUserExists(response.data.success);
      })
      .catch((error) => {
        setErrorMessages(error.response.data.details);
      });

    setShowAddUserPopup(true);
  };

  const getRoleName = (roleNumber) => {
    switch (roleNumber) {
      case 0:
        return "Admin";
      case 1:
        return "Jefe";
      case 2:
        return "Empleado";
      // Agrega más casos según sea necesario
      default:
        return "Unknown";
    }
  };

  const handleCrearUsuario = () => {
    const userData = {
      idEmpleado: employee.id_empleado,
      rol: rol,
      correo: correo,
      contrasena: contrasena,
    };

    const userAlreadyExists = usuarios.some(
      (user) => user.correo === selectedEmployee.correo
    );
    if (userAlreadyExists) {
      setErrorMessages((prev) => [...prev, "El usuario ya existe."]);
      setUserExists(true);
      alert("Usuario ya existe. Revisa la seccion de Usuario!");
      return;
    }
    axios
      .post("http://localhost:4000/create/crear-usuario", userData)
      .then((response) => {
        console.log(response.data.data);
        if (response.data.success) {
          setResponseMessage(response.data.details);
          setErrorMessages([]);
          alert("Usuario creado con exito");
        } else {
          setErrorMessages(response.data.details);
        }
      })
      .catch((error) => {
        setErrorMessages(error.response.data.details);
      });
  };
  const handleInformationClick = (employeeId, bossId) => {
    handleGetEmployee(employeeId);
    handleGetBoss(bossId);
    setShowBossPopu(true);
    setShowPopup2(false);
  };

  const closeMessage = () => {
    setSucces(false); // Corregido el nombre de la función a setSucces
    setShowBossPopu(false);
  };

  const acceptMessage = () => {
    setSucces(true);
  };

  const handleSelectEmployee = (employee) => {
    setSelectedEmployee(employee);
    setShowPopup2(true);
    // setShowAddUserPopup(true);
  };

      const handleGetPuestos = () => {
        axios.get('http://localhost:4000/data/obtener-puestos')
            .then((response) => {
                setPuesto(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
    };

    const handleGetDepartamentos = () => {
        axios.get('http://localhost:4000/data/obtener-departamentos ')
            .then((response) => {
                setDepartamento(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            })
            }

  useEffect(() => {
    handleGetEmployees();
    handleGetBosses();
    handleGetDepartamentos();
    handleGetPuestos();
  }, []);

  const filteredEmployees = empleados.filter(employee =>
    (employee.primer_nombre.toLowerCase().includes(search.toLowerCase()) ||
      employee.segundo_nombre.toLowerCase().includes(search.toLowerCase()) ||
      employee.primer_apellido.toLowerCase().includes(search.toLowerCase()) ||
      employee.segundo_apellido.toLowerCase().includes(search.toLowerCase())) &&
    (selectDepartamento === '' || employee.id_departamento=== selectDepartamento) && 
    (selectPuesto === '' || employee.id_perfil_puesto === selectPuesto)
  );



  return (
    <div className="administrar-empleados">
      <Navbar />
      <h2> Administrar Empleados</h2>
      <h4>Manten el orden de tus empleados activos.</h4>
      <br></br>
      <div className="search-options" style={{width:'1100px'}}>
        <div>
          <label>Departamento</label>
          <select value={selectDepartamento} onChange={(e)=>setSelectDepartamento(e.target.value)}>
                  <option value =''>Seleccione un Departamento...</option>
                  {departamento.map((e)=> 
                      <option key={e.id_departamento} value={e.id_departamento}>
                        {e.nombre_departamento}
                      </option>
                  )}
          </select>
          <label>Puesto</label>
          <select value={selectPuesto} onChange={(e)=>setSelectPuesto(e.target.value)} >
                  <option value=''>Seleccione un Puesto...</option>
                  {puesto.map((e)=> 
                    <option key={e.id_perfil_puesto} value={e.id_perfil_puesto}>
                        {e.nombre_perfil}
                    </option>
                  )}
          </select>
          <input placeholder="Buscar nombre..." onChange={(e)=>setSearch(e.target.value)}/>
          <button className="add-button" onClick={() => setShowPopup(true)}>
            Crear
          </button>
        </div>
      </div>

      <div className="bodys-container">
        {/* <div className="list-container"> */}
        <div className="container3">
          <table>
            <thead>
              <tr>
                <th>ID Empleado</th>
                <th>Nombre Empleado</th>
                <th>ID Jefe</th>
                <th>Departamento</th>
                <th>Puesto</th>
                <th>Pais</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.length > 0 ? (
                filteredEmployees.map((employee) => (
                  <tr key={employee.id_empleado}>
                    <td>{employee.id_empleado}</td>
                    <td>
                      {employee.primer_nombre} {employee.segundo_nombre}{" "}
                      {employee.primer_apellido} {employee.segundo_apellido}
                    </td>
                    <td>{employee.id_jefe}</td>
                    <td>{employee.nombre_departamento}</td>
                    <td>{employee.nombre_perfil}</td>
                    <td>{employee.id_pais}</td>
                    <td className="butne">
                      <button onClick={() => handleInformationClick(
                        employee.id_empleado,employee.id_jefe
                )}>
                        <img src={inform} width={40} height={40}/>
                      </button>
                      <button onClick={()=> handleModifyEmployeeClick(employee)}><img src={editar} width={25} height={10}/></button>
                      <button onClick={()=> handleSelectEmployee(employee)}><img src={borrar} width={35} height={10}/></button>
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
          {/* </div> */}
        </div>
      </div>

      {showBossPopup && (
        <div className="popup">
          <div className="information-popup-content" style={{backgroundColor:'#2a2942',width:'300px',color:'white'}}>
            <div className="employee-info">
              <h3>
                <b>Empleado</b>
              </h3>
              <label>
                {selectedEmployee.primer_nombre}{" "}
                {selectedEmployee.primer_apellido}
              </label>
            </div>
            <div className="boss-info">
              {hasBoss ? (
                <div>
                  <h3>
                    <b>Jefe</b>
                  </h3>
                  <label>
                    {boss.primer_nombre} {boss.primer_apellido}
                  </label>
                </div>
              ) : (
                <div>
                  <h3>
                    <b>Jefe</b>
                  </h3>
                  <label>Asignar jefe: </label>
                  <select onChange={(e) => setSelectedBoss(e.target.value)} style={{backgroundColor:'white',color:'black'}}>
                    <option selected disabled hidden>
                      Seleccionar...
                    </option>
                    {bosses.length > 0 ? (
                      bosses.map((boss) => (
                        <option
                          key={boss[0].id_empleado}
                          value={boss[0].id_empleado}
                        >
                          {boss[0].primer_nombre} {boss[0].primer_apellido}
                        </option>
                      ))
                    ) : (
                      <option>No hay datos</option>
                    )}
                  </select>
                  <button
                    type="button"  
                    style={{backgroundColor:'#CD1C2C', marginTop:'15px'}}
                    onClick={() =>
                      handleSetBoss(selectedEmployee.id_empleado, selectedBoss)
                    }
                  >
                    Aceptar
                  </button>
                  <p>{message}</p>
                </div>
              )}
            </div>

            {/* <div>
                            <button onClick={handleClosePopup}>Modificar</button>
                            <button onClick={handleClosePopup}>Eliminar</button>
                        </div> */}
            <div>
              <button onClick={handleClosePopup} style={{backgroundColor:'#CD1C2C', marginTop:'15px'}}>Cerrar</button>
            </div>
          </div>
        </div>
      )}

      {showPopup && (
        <div className="popups">
          <button onClick={handleClosePopup}>X</button>
          <div>
            <CrearEmpleado
              open={addEmployee}
              cancel={() => setAddEmployee(false)}
            />
          </div>
        </div>
      )}

      {showPopup2 && (
        <div className="popups">
          <div className="popups2-content">
            <h3>
              Acciones con {selectedEmployee.primer_nombre}{" "}
              {selectedEmployee.primer_apellido}
            </h3>
            <br></br>
            <button onClick={() => handleDeleteEmployee(selectedEmployee.id_empleado)}>Eliminar Empleado</button>
            <button onClick={handleClosePopup}>Cerrar</button>
          </div>
        </div>
      )}

      {showPopupModificar && (
        <div className="popups">
          {/* <button onClick={handleClosePopup}>X</button> */}
          <div>
            <ModificarEmpleadoPopUp
              employee={selectedEmployee}
              cancel={() => setShowPopupModificar(false)}
            />
          </div>
        </div>
      )}

      <div>
        <Modal
          className="message-modal"
          overlayClassName="overlay"
          isOpen={success}
          onRequestClose={closeMessage}
          contentLabel="Popup de Mensaje"
        >
          <p>{message}</p>
          <button onClick={closeMessage}>Aceptar</button>
        </Modal>
      </div>
    </div>
  );
};

export default AdministarEmpleados;
