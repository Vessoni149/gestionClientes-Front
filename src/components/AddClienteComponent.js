import { useEffect, useState } from "react";
import ClienteService from "../services/ClienteService";
import { useNavigate , useParams} from "react-router-dom";
import { Link } from "react-router-dom";
export default function AddClienteComponent(props) {
    const [nombre,setNombre] = useState('');
    const [apellido ,setApellido] = useState('');
    const [email,setEmail] = useState('');
    const {id} = useParams();        //sirve para usar una constante como parametro.
    const navigate = useNavigate();

    const saveOrUpdateCliente = (e)=>{
        e.preventDefault();
        const cliente= {nombre, apellido, email};
        if(id){
        ClienteService.updateCliente(id,cliente).then((response)=>{
            console.log(response.data);
            navigate('/');
        }).catch(error =>{
            console.log(error);
        })
        }
        else{
        ClienteService.saveCliente(cliente).then((response)=>{
            console.log(response.data);
            navigate('/');
        }).catch(error =>{
            console.log(error);
        })
        }

        
    }

    useEffect(() =>{
        ClienteService.getClienteById(id).then((response)=>{
            setNombre(response.data.nombre);
            setApellido(response.data.apellido);
            setEmail(response.data.email);
        }).catch(error=>{
            console.log(error);
        })
    },[])

    const title = ()=>{
        if(id){
            return <h2 className="text-center">Actualizar Cliente</h2>;
        }else{
            return <h2 className="text-center">Agregar Cliente</h2>;
        }
    }


    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="card col-md-6 offset-md-3 offset-md-3"></div>
                    <h2 className="text-center">
                        {title()}
                    </h2>
                    <div className="card-body">
                        <form>
                            <div className="form-group mb-2">
                                <label className="form-label">Nombre</label>
                                <input type="text" 
                                placeholder="Digite el nombre"
                                name="nombre"
                                className="form-control"
                                value={nombre}
                                onChange={(e)=>{ setNombre(e.target.value)}}></input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Apellido</label>
                                <input type="text" 
                                placeholder="Digite el apellido"
                                name="apellido"
                                className="form-control"
                                value={apellido}
                                onChange={(e)=>{ setApellido(e.target.value)}}></input>
                            </div>
                            <div className="form-group mb-2">
                                <label className="form-label">Email</label>
                                <input type="text" 
                                placeholder="Digite el email"
                                name="email"
                                className="form-control"
                                value={email}
                                onChange={(e)=>{ setEmail(e.target.value)}}></input>
                            </div>
                            <button className="btn btn-success" onClick={(e)=> saveOrUpdateCliente(e)}>Guardar</button>
                            &nbsp;&nbsp;
                            <Link to='/' className='btn btn-danger'>Cancelar</Link>
                        </form>
                    </div>
                </div>


            </div>
        </>
    )
}
