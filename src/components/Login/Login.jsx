// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// export default function Login() {
//   const navigate = useNavigate();
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   async function handleSubmit(event) {
//     event.preventDefault();
//   }

//   async function handleCancel() {
//     navigate('/');
//   }

//   return (
//     <div className="row">
//       <div className="col mb-4">
//         <form onSubmit={handleSubmit} className="border rounded">
//           <div className="form-title p-3 border-bottom">
//             <h3 className="m-0">Iniciar sesión</h3>
//           </div>
//           <div className="form-body border-bottom p-3">
//             <div className="mb-3">
//               <label className="form-label">Correo</label>
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Correo"
//                 required
//                 onChange={(e) => {
//                   setEmail(e.target.value);
//                 }}
//               />
//             </div>
//             <div className="mb-3">
//               <label className="form-label">Contraseña</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 placeholder="Contraseña"
//                 required
//                 onChange={(e) => {
//                   setPassword(e.target.value);
//                 }}
//               />
//             </div>
//           </div>
//           <div className="form-footer p-3">
//             <button type="submit" className="btn btn-primary mr-2">
//               Iniciar
//             </button>
//             &nbsp;
//             <button type="button" className="btn btn-secondary" onClick={handleCancel}>
//               Regresar
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

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

//   console.log(elementosArray)

//   return (
//     <div className="container">
//       <div className="row">
//         <div className="col">
//           <input
//             type="text"
//             className="form-control mb-2"
//             placeholder="Elemento"
//             value={elemento}
//             onChange={(e) => setElemento(e.target.value)}
//           />
//         </div>
//         <div className="col">
//           <input
//             type="number"
//             className="form-control mb-2"
//             placeholder="Dato Adicional"
//             value={datoAdicional}
//             onChange={(e) => setDatoAdicional(e.target.value)}
//           />
//         </div>
//         <div className="col-auto">
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
//                 {item.nombre} {item.datoAdicional}
//                 <span className="badge badge-secondary">{item.datoAdicional}</span>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Formulario;

// import React, { useState } from 'react';
// import { Button, Modal, Form } from 'react-bootstrap';

// const ModalForm = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [elements, setElements] = useState([]);
//   const [newElement, setNewElement] = useState('');
//   const [newElementNumber, setNewElementNumber] = useState('');

//   const handleShowModal = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   const handleAddElement = () => {
//     const newElementObject = {
//       name: newElement,
//       number: newElementNumber
//     };
//     setElements([...elements, newElementObject]);
//     setNewElement('');
//     setNewElementNumber('');
//   };

//   return (
//     <div>
//       <Button onClick={handleShowModal}>Abrir Modal</Button>

//       <Modal show={showModal} onHide={handleCloseModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Agregar Elementos</Modal.Title>
//         </Modal.Header>

//         <Modal.Body>
//           <Form.Group>
//             <Form.Label>Elemento</Form.Label>
//             <Form.Control
//               type="text"
//               value={newElement}
//               onChange={(e) => setNewElement(e.target.value)}
//             />
//           </Form.Group>

//           <Form.Group>
//             <Form.Label>Dato Numérico</Form.Label>
//             <Form.Control
//               type="number"
//               value={newElementNumber}
//               onChange={(e) => setNewElementNumber(e.target.value)}
//             />
//           </Form.Group>
//         </Modal.Body>

//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseModal}>
//             Cerrar
//           </Button>
//           <Button variant="primary" onClick={handleAddElement}>
//             Agregar
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       <h3>Elementos Agregados:</h3>
//       {elements.length === 0 ? (
//         <p>No se han agregado elementos</p>
//       ) : (
//         <ul>
//           {elements.map((element, index) => (
//             <li key={index}>
//               {element.name} - {element.number}
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default ModalForm;

import React, { useState } from 'react';

function App() {
  const [contentIndex, setContentIndex] = useState(0); // Estado para controlar el índice del contenido actual

  const contents = [
    'Contenido 1',
    'Contenido 2',
    'Contenido 3'
  ]; // Array de contenidos

  const handleNextClick = () => {
    setContentIndex(prevIndex => prevIndex + 1); // Cambiar al siguiente índice de contenido
  };

  return (
    <div>
      <h1>{contents[contentIndex]}</h1> {/* Mostrar el contenido actual */}
      <button onClick={handleNextClick}>Siguiente</button> {/* Botón para pasar al siguiente contenido */}
    </div>
  );
}

export default App;
