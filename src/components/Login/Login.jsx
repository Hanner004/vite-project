import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
  }

  async function handleCancel() {
    navigate('/');
  }

  return (
    <div className="row">
      <div className="col mb-4">
        <form onSubmit={handleSubmit} className="border rounded">
          <div className="form-title p-3 border-bottom">
            <h3 className="m-0">Iniciar sesión</h3>
          </div>
          <div className="form-body border-bottom p-3">
            <div className="mb-3">
              <label className="form-label">Correo</label>
              <input
                type="email"
                className="form-control"
                placeholder="Correo"
                required
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Contraseña</label>
              <input
                type="text"
                className="form-control"
                placeholder="Contraseña"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="form-footer p-3">
            <button type="submit" className="btn btn-primary mr-2">
              Iniciar
            </button>
            &nbsp;
            <button type="button" className="btn btn-secondary" onClick={handleCancel}>
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// import React, { useState } from 'react';
// // import 'bootstrap/dist/css/bootstrap.min.css';

// function Formulario() {
//   const [elemento, setElemento] = useState('');
//   const [datoAdicional, setDatoAdicional] = useState('');
//   const [elementosArray, setElementosArray] = useState([]);

//   const agregarElemento = () => {
//     if (elemento.trim() === '' || datoAdicional.trim() === '') {
//       return;
//     }

//     const nuevoElemento = { nombre: elemento, datoAdicional };
//     setElementosArray([...elementosArray, nuevoElemento]);
//     setElemento('');
//     setDatoAdicional('');
//   };

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col-md-6">
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Elemento"
//             value={elemento}
//             onChange={(e) => setElemento(e.target.value)}
//           />
//         </div>
//         <div className="col-md-6">
//           <input
//             type="number"
//             className="form-control mb-2"
//             placeholder="Dato Adicional"
//             value={datoAdicional}
//             onChange={(e) => setDatoAdicional(e.target.value)}
//           />
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-12">
//           <button className="btn btn-primary" onClick={agregarElemento}>
//             Agregar
//           </button>
//         </div>
//       </div>
//       <div className="row">
//         <div className="col-md-12">
//           <ul className="list-group">
//             {elementosArray.map((item, index) => (
//               <li className="list-group-item" key={index}>
//                 {item.nombre}
//                 <span className="badge badge-secondary ml-2">{item.datoAdicional}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Formulario;
