import { useState } from 'react';
import { Redirect, Link } from 'wouter';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';

const Register = () => {
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombre: '',
    apellido: '',
    dni: '',
    telefono: '',
    calle: '',
    numero: '',
    codigoPostal: ''
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const { email, password, nombre, apellido, dni, telefono, calle, numero, codigoPostal } = formData;

      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      const userData = {
        uid,
        nombre,
        apellido,
        dni,
        telefono,
        calle,
        numero,
        codigoPostal
      };

      await addDoc(collection(db, 'users'), userData);
      setShowSuccessPopup(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <>
    <div className="m-2 p-2 flex items-end">
    <h1 className="mr-6 text-[#430199] text-3xl">
    Registro de Usuario
    </h1>
    <div className="flex-grow h-0.5 bg-[#430199]"></div>
  </div>
  <div className="w-4/5 max-w-2xl mx-auto flex flex-col items-center mt-2 mb-14 rounded-lg shadow-lg p-6 ">
  <form onSubmit={handleFormSubmit} className="flex flex-col text-left gap-4 mb-2">
        <div className='flex flex-col'>
          <label className="text-sm">
            Email:
          </label>
          <input
            type="email"
            value={formData.email}
            name="email"
            onChange={handleInputChange}
            placeholder="youremail@company.tld"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className='flex flex-col'>
          <label className="text-sm">
            Contraseña:
          </label>
          <input
            type="password"
            value={formData.password}
            name="password"
            onChange={handleInputChange}
            placeholder="*************"
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <h2 className="mr-6 text-[#430199] text-sm ">
            Datos de facturación
          </h2>
        <div className='flex flex-wrap'>
            <input 
            placeholder="Nombre" 
            className="my-1 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
          />
            <input 
            placeholder="Apellido" 
            className="my-1 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleInputChange}
          />
            </div>

          <div>
            <input
            placeholder="DNI" 
            className="my-1 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="dni"
            value={formData.dni}
            onChange={handleInputChange}
          />
            <input
            placeholder="Telefono"
            className="my-1 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="telefono"
            value={formData.telefono}
            onChange={handleInputChange}
          />
          </div>
          <div className="">
            <h2 className="mt-4 text-[#430199] text-sm ">
              Domicilio
            </h2>
            <div className='flex flex-wrap'>
              <input
                placeholder="Calle"
                className="my-1 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="calle"
                value={formData.calle}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <input
                placeholder="Número"
                className="my-1 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="numero"
                value={formData.numero}
                onChange={handleInputChange}
              />
            </div>
            <div className="">
              <input
                placeholder="Codigo Postal"
                className="my-1 mr-2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                name="codigoPostal"
                value={formData.codigoPostal}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="px-4 py-2 bg-[#430199] text-white rounded-md hover:bg-blue-600"
        >
          Crear Cuenta
        </button>
      </form>
      {showSuccessPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>¡Registro Exitoso!</h2>
            <p>Tu registro ha sido exitoso. ¡Bienvenido!</p>
            <button onClick={closeSuccessPopup}>Cerrar</button>
          </div>
        </div>
      ) && <Redirect to="/" /> }
    <Link href="/login">
    <span className='text-sm'>¿Ya tenés cuenta? Iniciar Sesión
    </span>
    </Link>
    </div>
    </>
  );
};

export default Register;