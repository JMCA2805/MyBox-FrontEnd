import React, { useState, useEffect } from 'react';
import Nav from "../components/NavBar";
import Footer from "../components/Footer";
import { useAuth } from '../contexts/AuthProvider';

const Profile = () => {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [rol, setRol] = useState('');
  const [username, setUsername] = useState('');
  const [gender, setGender] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [isPasswordEditing, setIsPasswordEditing] = useState(false);
// Faltantes
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const {user} = useAuth()
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/User/${user.userId}/get`);

        if (response.ok) {
          const data = await response.json();
          setName(data.name);
          setLastname(data.lastname);
          setEmail(data.email);
          setPhone(data.phone);
          setRol(data.rol);
          setUsername(data.username);
          setGender(data.gender);

          

        } else {
          console.error('User not found');
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [user.userId]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/User/${user.userId}/edit`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          lastname,
          email,
          phone,
          rol,
          username,
          gender,
        }),
      });

      if (response.ok) {
        alert('Usuario actualizado correctamente.');
      } else {
        console.error('No se pudo actualizar el usuario. Vuelve a intentar.');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:4000/User/${user.userId}/Password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ oldPassword: password, newPassword: newPassword }),
      });

      if (response.ok) {
        alert("Contraseña actualizado correctamente")
      }else{
        alert('Algo ha ocurrido mal...');
      }

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      console.log('Error:', error);
      setMessage('Error al intentar actualizar la contraseña');
    }
 };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
    setIsPasswordEditing(false);
  };

  const togglePasswordEditing = () => {
    setIsPasswordEditing(!isPasswordEditing);
    setIsEditing(false);
  };

  return (
    <>
      <Nav />
      <div>
        <h1>Bienvenido, {user.username}</h1>
      </div>
      <div>
        <form onSubmit={handleFormSubmit}>
          <label>
            Name:
            {isEditing ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            ) : (
              <p>{name}</p>
            )}
          </label>
          <label>
            Lastname:
            {isEditing ? (
              <input
                type="text"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
              />
            ) : (
              <p>{lastname}</p>
            )}
          </label>
          <label>
            Email:
            {isEditing ? (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            ) : (
              <p>{email}</p>
            )}
          </label>
          <label>
            Telefono:
            {isEditing ? (
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            ) : (
              <p>{phone}</p>
            )}
          </label>
          <label>
            Rol:
            {isEditing ? (
              <input
                type="text"
                value={rol}
                onChange={(e) => setRol(e.target.value)}
              />
            ) : (
              <p>{rol}</p>
            )}
          </label>
          <label>
            Username:
            {isEditing ? (
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            ) : (
              <p>{username}</p>
            )}
          </label>
          <label>
            Género:
            {isEditing ? (
              <select value={gender} onChange={(e) => setGender(e.target.value)}>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otros">Otros</option>
              </select>
            ) : (
              <p>{gender}</p>
            )}
          </label>
          <button type="button" onClick={toggleEditing}>
            {isEditing ? 'Cancelar' : 'Editar'}
          </button>
          <button type="submit" disabled={!isEditing}>
            Guardar
          </button>
        </form>

              {/* Formulario 2 donde estarán las contraseñas */}
                <br/>
        <div>
          <h3> Cambio de contraseña </h3>
          <form onSubmit={handleSubmit}>
            <label>
              Contraseña antigua:
              {isPasswordEditing ? (
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              ) : (
                <p>{"****"}</p>
              )}
            </label>
            <div>
              <div>
              <label>
              Contraseña nueva:
              {isPasswordEditing ? (
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              ) : (
                <p>{"****"}</p>
              )}
            </label>
              </div>
              <div>
              <label>
              Confirmar Contraseña Nueva
              {isPasswordEditing ? (
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              ) : (
                <p>{"****"}</p>
              )}
            </label>
              </div>
            <button type="button" onClick={togglePasswordEditing}>
              {isPasswordEditing ? 'Cancelar' + "": 'Editar' + ""}
            </button>
            <button type="submit" disabled={!isPasswordEditing}>
            Actualizar contraseña
            </button>
            </div>
          </form>
                                {/* Fin */}
        </div>
      </div>
      <Footer />
    </>
  );
};


export default Profile
