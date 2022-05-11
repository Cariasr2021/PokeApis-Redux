import React,{useEffect} from 'react'

import {useDispatch, useSelector} from 'react-redux'
import { nextPokemonesAccion, obtenerPokemonesAccion, previousPokemonesAccion, unPokemonDetalle} from '../redux/pokeDuck';
import Detalle from './Detalle';

const Pokemones = () => {
    const dispatch = useDispatch();
    const pokemones = useSelector(store => store.pokemones.results)
    const next = useSelector(store => store.pokemones.next)
    const previous = useSelector(store => store.pokemones.previous)
    //  console.log(pokemones)
    useEffect(() => {
        const fetchData = () =>{
            dispatch(obtenerPokemonesAccion())
        }
        fetchData()
    },[dispatch])
  return (
    <div className='row'>
        <div className="col-md-6">
            <h2>Lista de pokemones</h2>
            <hr />
            <div className="d-flex justify-content-around">
                {
                    pokemones.length === 0 &&
                    <button className='btn btn-dark' onClick={() => dispatch(obtenerPokemonesAccion())}>
                        Get Pokemones
                    </button>
                }
                
                {
                    next !== null &&
                    <button className='btn btn-dark' onClick={() => dispatch(nextPokemonesAccion())}>
                        Next Pokemones
                    </button>
                }
                
                {
                    previous !== null &&
                    <button className='btn btn-dark' onClick={() => dispatch(previousPokemonesAccion())}>
                        Previuos Pokemones
                    </button>
                }
            </div>
            <ul className='list-group mt-3'>
                {
                    pokemones.map((item, index) => 
                        <li className='list-group-item text-uppercase' key={index}>
                            {item.name}
                            <button onClick={() => dispatch(unPokemonDetalle(item.url))} className='btn btn-secondary btn-sm float-end'>Info</button>
                        </li>
                    )
                }
            </ul>

        </div>
        <div className="col-md-6">
            <Detalle />
        </div>
    </div>
  )
}

export default Pokemones