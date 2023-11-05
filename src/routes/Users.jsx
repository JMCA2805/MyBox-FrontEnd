import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import  DeleteModal from '../components/Modal/Delete_users'
import { Card, Typography } from "@material-tailwind/react";
import React, {useState} from 'react';

const TABLE_HEAD = ["Email", "Género","Apellido", "Usuario","Celular","Role","", ""];


let response = async () => {
  const res = await fetch("http://localhost:4000/User");
  const data = await res.json();
  return data;
};

response = await response();
response = response;
console.log(response);
// Convertir el array de respuesta a la estructura deseada
const TABLE_ROWS = response.map(user => ({
  email: user.email
  ,gender: user.gender
  ,lastname: user.lastname 
  ,name: user.name
  ,phone: user.phone
  ,rol: user.rol
}));


export default function Users() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = () => {
    console.log('Elemento eliminado');
    setIsModalOpen(false);
  };

  
  return (
    <>
    <NavBar />
    <div className='mt-6 ml-2 mr-4 mb-8'>

    
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {TABLE_ROWS.map(({ email, gender, lastname, name, phone, rol }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";
 
            return (
              <tr key={email}>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {email}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {gender}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {lastname}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {name}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {phone}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {rol}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    Editar
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography
                    as="a"
                    href="#"
                    variant="small"
                    color="blue-gray"
                    className="font-medium"
                  >
                    
    <div>
      <button onClick={handleOpenModal}></button>
      <DeleteModal isOpen={isModalOpen} handleClose={handleCloseModal} handleDelete={handleDelete} />
    </div>
                  </Typography>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
    </div>
    <Footer />
      
    </>
  );
}
