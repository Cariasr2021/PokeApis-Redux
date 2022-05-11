import React from 'react'
import {Link, NavLink, useNavigate} from 'react-router-dom'
import { cerrarSesionAccion } from '../redux/usuarioDuck'
import { useDispatch, useSelector } from 'react-redux'

const NavBar = () => {
  const activo = useSelector(store => store.usuarios.activo)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const cerrarSesion = () => {
    dispatch(cerrarSesionAccion())
    navigate('/login')
  }
  return (
    <nav className='navbar navbar-dark bg-dark'>
        <Link className='navbar-brand ms-4' to='/'>App Poke</Link>
        <div className='d-flex'>
          {
            !activo ? 
            <NavLink className='btn btn-dark me-2' to='/login'>Login</NavLink>:
            <>
              <NavLink className='btn btn-dark me-2' to='/'>Inicio</NavLink>
              <NavLink className='btn btn-dark me-2' to='/perfil'>Perfil</NavLink>
              <button className='btn btn-dark me-2' onClick={cerrarSesion}>Cerrar Sesión</button>
            </>
          }
            
        </div>
    </nav>
  )
}

export default NavBar