import {auth, firebase, db, storage} from '../firebase'

//constantes
const dataInicial = {
    loading: false,
    activo: false
}
//tipos
const LOADING = 'LOADING'
const USUARIO_ERROR = 'USUARIO_ERROR'
const USUARIO_EXITO = 'USUARIO_EXITO'
const CERRAR_SESION = 'CERRAR_SESION'
//reducer
export default function usuarioReducer(state = dataInicial, action){
    switch(action.type){
        case LOADING:
            return {...state, loading: true}
        case USUARIO_EXITO:
            return {...state, loading: false, activo: true, user: action.payload}
        case USUARIO_ERROR:
            return {...dataInicial}
        case CERRAR_SESION:
            return {...dataInicial}
        default:
            return state
    }
}
//acciones
export const ingresoUsuarioAccion = () => async(dispatch) => {
    dispatch({
        type: LOADING
    })
    try {
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)
        console.log(res.user)

        const usuario = {
            uid: res.user.uid,
            email: res.user.email,
            displayName: res.user.displayName,
            photoURL: res.user.photoURL
        }

        const usuarioDB  = await db.collection('usuarios').doc(usuario.email).get()
        console.log(usuarioDB)
        if(usuarioDB.exists){
            dispatch({
                type: USUARIO_EXITO,
                payload: usuarioDB.data()
            })
            localStorage.setItem('usuario', JSON.stringify(usuarioDB.data()))
        }else{
            await db.collection('usuarios').doc(usuario.email).set(usuario)
            dispatch({
                type: USUARIO_EXITO,
                payload: usuario
            })
            localStorage.setItem('usuario', JSON.stringify(usuario))
        }      
    } catch (error) {
        console.log(error)
        dispatch({
            type: USUARIO_ERROR
        })
    }
}
export const leerUsuarioActivoAccion = () => (dispatch) => {
    if (localStorage.getItem('usuario')){
        dispatch({
            type: USUARIO_EXITO,
            payload: JSON.parse(localStorage.getItem('usuario'))
        })
    }
}
export const cerrarSesionAccion = () => (dispatch) => {
    auth.signOut()
    localStorage.removeItem('usuario')
    dispatch({
        type: CERRAR_SESION
    })
}
export const actualizarUsuarioAccion = (nameUpdate) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuarios
    // console.log(user)
    try {
        await db.collection('usuarios').doc(user.email).update({
            displayName: nameUpdate
        })
        const usuario = {
            ...user,
            displayName: nameUpdate
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (error) {
        console.log(error)
    }
}
export const editarFotoAccion = (imageEdit) => async(dispatch, getState) => {
    dispatch({
        type: LOADING
    })
    const {user} = getState().usuarios
    try {
        const imagenRef = storage.ref().child(user.email).child('foto-perfil')
        await imagenRef.put(imageEdit)
        const imagenURL = await imagenRef.getDownloadURL()

        await db.collection('usuarios').doc(user.email).update({
            photoURL: imagenURL
        })

        const usuario = {
            ...user,
            photoURL: imagenURL
        }
        dispatch({
            type: USUARIO_EXITO,
            payload: usuario
        })
        localStorage.setItem('usuario', JSON.stringify(usuario))
    } catch (error) {
        console.log(error)
    }
}