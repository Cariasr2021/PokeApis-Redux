
import React, { Fragment, useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {unPokemonDetalle} from '../redux/pokeDuck'

const Detalle = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchData = () =>{
            dispatch(unPokemonDetalle())
        }
        fetchData()
    },[dispatch])
    
    const pokemon = useSelector(store => store.pokemones.UnPokemon)
    // console.log(pokemon)
  return pokemon ? (
    <Fragment>
        <h2>Detalle Pokemon</h2>
        <hr />
        <div className='card text-center'>
            <div className='card-body'>
                <img src={pokemon.foto} className='img-fluid' alt='pokemonFoto'/>
                <h4 className='card-title text-uppercase'>{pokemon.nombre}</h4>
                <p className='card-text'>Alto: {pokemon.alto} || Ancho: {pokemon.ancho} </p>
            </div>
        </div>
    </Fragment>
  ): null
}

export default Detalle