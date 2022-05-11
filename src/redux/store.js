import {createStore, combineReducers, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import pokeReducer from './pokeDuck'
import usuarioReducer, {leerUsuarioActivoAccion} from './usuarioDuck'

const rootReducer = combineReducers({
    pokemones: pokeReducer,
    usuarios: usuarioReducer
})
 
export default function generateStore() {
    const store = createStore( rootReducer, composeWithDevTools( applyMiddleware(thunk) ) )
    leerUsuarioActivoAccion()(store.dispatch)
    return store
}
