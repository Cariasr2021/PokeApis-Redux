
import axios from 'axios';

//constantes
const dataInicial = {
    count: 0,
    next: null,
    previous: null,
    results: []
}
//tipos
const GET_POKEMONES_EXITO = 'GET_POKEMONES_EXITO'
const NEXT_POKEMONES_EXITO = 'NEXT_POKEMONES_EXITO'
const PREVIOUS_POKEMONES_EXITO = 'PREVIOUS_POKEMONES_EXITO'
const DETALLE_POKEMONES_EXITO = 'DETALLE_POKEMONES_EXITO'
//reducer
export default function pokeReducer(state = dataInicial, action){
    
    switch(action.type){
        case GET_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case NEXT_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case PREVIOUS_POKEMONES_EXITO:
            return {...state, ...action.payload}
        case DETALLE_POKEMONES_EXITO:
            return {...state, UnPokemon: action.payload}
        default:
            return state
    }
}
//acciones
export const unPokemonDetalle = (url = 'https://pokeapi.co/api/v2/pokemon/1/') => async (dispatch) => {
    if(localStorage.getItem(url)){
        dispatch({
            type: DETALLE_POKEMONES_EXITO,
            payload: JSON.parse(localStorage.getItem(url))
        })
        return
    }
    try {
        const res = await axios.get(url)
        // console.log(res.data)
        dispatch({
            type: DETALLE_POKEMONES_EXITO,
            payload: {
                nombre: res.data.name,
                ancho: res.data.weight,
                alto: res.data.height,
                foto: res.data.sprites.front_default
            }
        })
        localStorage.setItem(url, JSON.stringify({
            nombre: res.data.name,
            ancho: res.data.weight,
            alto: res.data.height,
            foto: res.data.sprites.front_default
        }))
    } catch (error) {
        console.log(error)
    }
}

export const obtenerPokemonesAccion = () => async (dispatch, getState) => {
    
    if(localStorage.getItem('offset=0')){
        console.log('datos guardados')
        dispatch({
            type: GET_POKEMONES_EXITO,
            payload: JSON.parse( localStorage.getItem('offset=0') ) 
        })
        return
    }
    try {
        console.log('datos desde la api')
        const res = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
        // console.log(res.data)
        // next = offset + 20
        dispatch({
            type: GET_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem('offset=0', JSON.stringify(res.data))
        
    } catch (error) {
        console.log(error)
        
    }
}

export const nextPokemonesAccion = () => async (dispatch, getState) => {
    // const offset = getState().pokemones.offset
    // const next = offset + 20;
    const next = getState().pokemones.next
    if(localStorage.getItem(next)){
        console.log('datos guardados')
        dispatch({
            type: GET_POKEMONES_EXITO,
            payload: JSON.parse( localStorage.getItem(next) ) 
        })
        return
    }
    try {
        console.log('datos desde la api')
        const res = await axios.get(next);
        dispatch({
            type: NEXT_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(next, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
        
    }
}

export const previousPokemonesAccion = () => async (dispatch, getState) => {
    const previous = getState().pokemones.previous
    if(localStorage.getItem(previous)){
        console.log('datos guardados')
        dispatch({
            type: GET_POKEMONES_EXITO,
            payload: JSON.parse( localStorage.getItem(previous) ) 
        })
        return
    }
    try {
        const res = await axios.get(previous);
        dispatch({
            type: PREVIOUS_POKEMONES_EXITO,
            payload: res.data
        })
        localStorage.setItem(previous, JSON.stringify(res.data))
    } catch (error) {
        console.log(error)
        
    }
}