import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { actualizarUsuarioAccion, editarFotoAccion } from "../redux/usuarioDuck";

const Perfil = () => {
  const usuario = useSelector((store) => store.usuarios.user);
  const loading = useSelector((store) => store.usuarios.loading);
  console.log(usuario);
  const [nameUser, setNameUser] = React.useState(usuario.displayName);
  const [activeForm, setActiveForm] = React.useState(false);
  const [error, setError] = React.useState(false)
  const dispatch = useDispatch();

  const updateUser = () => {
    if (!nameUser.trim()) {
      console.log("nombre vacio");
      return;
    }
    dispatch(actualizarUsuarioAccion(nameUser));
    setActiveForm(false);
  };

  const seleccionarArchivo = (imagen) => {
      
        const imgUsuario = imagen.target.files[0]
        console.log(imgUsuario)

        if(imgUsuario === undefined){
            console.log('No se seleccionó ninguna imagen')
            return
        }
      if(imgUsuario.type === 'image/jpeg' || imgUsuario.type === 'image/png'){
          dispatch(editarFotoAccion(imgUsuario))
          setError(false)
      }else{
          setError(true)
      }
  }
  return (
    <div className="mt-5 text-center">
      <div className="card">
        <div className="card-body">
          <img className="mb-3 img-fluid" src={usuario.photoURL} alt="" />
          <h5 className="card-title">Nombre: {usuario.displayName}</h5>
          <p className="card-text">Email: {usuario.email}</p>
          <button className="btn btn-dark" onClick={() => setActiveForm(true)}>
            Editar nombre
          </button>
          {
                error && 
                <div className="alert alert-warning mt-3">
                    Solo permite archivos PNG y JPEG
                </div>
            }
          <div className="input-group my-3 justify-content-center">
            <input
              type="file"
              className="form-control"
              id="inputGroupFile02"
              style={{ display: "none" }}
              onChange={(e) => seleccionarArchivo(e)}
              disabled={loading}
            />
            <label
              className={loading ? 'input-group-text btn btn-dark disabled' : 'input-group-text btn btn-dark'}
              htmlFor="inputGroupFile02"
            >
              Actualizar imagen
            </label>
            
          </div>
        </div>
        {loading && (
          <div className="card-body">
            <div className="d-flex justify-content-center">
              <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        )}
        {activeForm && (
          <div className="card-body">
            <div className="row justify-content-center">
              <div className="col-md-5">
                <div className="input-group mb-3">
                  <input
                    type="text"
                    className="form-control"
                    value={nameUser}
                    onChange={(e) => setNameUser(e.target.value)}
                  />
                  <button
                    className="btn btn-dark"
                    type="button"
                    onClick={() => updateUser()}
                  >
                    Actualizar
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Perfil;
