import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { ingresoUsuarioAccion } from '../redux/usuarioDuck';

const Login = () => {
  const dispatch = useDispatch();
  const loading = useSelector(store => store.usuarios.loading)
  const activo = useSelector(store => store.usuarios.activo)
  const navigate = useNavigate()
  
  useEffect(() => {
    if(activo){
      navigate('/')
    }
  }, [activo, navigate])
  
  return (
    <div className='mt-5 text-center'>
        <h3>Ingreso con Google</h3>
        <hr />
        <button 
          className='btn btn-dark'
          onClick={() => dispatch(ingresoUsuarioAccion())}
          disabled={loading}
        >
          Acceder
          </button>

    </div>
  )
}

export default Login