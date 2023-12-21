import { useEffect, useState } from "react"
import ClienteService from "../services/ClienteService";
import { Link } from "react-router-dom";

export function ListaClientesComponent(props) {
    
    const [clientes, setClientes] = useState([]);
    useEffect(()=>{
        listarClientes();
    },[])

    const deleteCliente = (clienteId) =>{
        ClienteService.deleteCliente(clienteId).then((response)=>{
            listarClientes();
        }).catch(error=>{
            console.log(error);
        })
    }

    const listarClientes = ()=>{
        ClienteService.getAllClientes().then(response =>{
            setClientes(response.data);
            console.log(response.data);
        }).catch(error=>{
            console.log(error);
        })
    }
    return (
        <div className='container'>
            <h2 className='rext-center'>Lista clientes</h2>
            <Link to="add-cliente" classNamebtn btn-primary mb-2>Agregar Cliente</Link>
            <table className="table table-bordered table-striped">
                <thead>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>Email</th>
                    <th>Acciones</th>
                </thead>
                <tbody>
                    {
                        clientes.map(
                            cliente =>
                            <tr key={cliente.id}>
                                <td>{cliente.id}</td>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.apellido}</td>
                                <td>{cliente.email}</td>
                                <td>
                                    <Link className="btn btn-info" to={`/edit-cliente/${cliente.id}`}>Actualizar</Link>
                                    <button style={{marginLeft:"10px"}}className="btn btn-danger" onClick={()=>deleteCliente(cliente.id)}>Eliminar</button>
                                </td>
                                
                            </tr>
                        )
                    }
                </tbody>
                
            </table>
        </div>
        
    )
}
