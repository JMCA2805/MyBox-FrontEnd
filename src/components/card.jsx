import React from 'react';
function Card() {
    return (
        <>
        <div class="mt-6 w-96">
            <div color="blue-gray" className="relative h-56">
            <img src="./public/Harina_PAN_logo_2020.jpg" alt="" />

            </div>
            <div class="card-content">
                <div class="card-content-inner">
                    <h1>Marca:</h1>
                    <h1>Modelo:</h1>
                    <h1>Cantidad:</h1>
                    <h1>Precio:</h1>
                    <h1>Fecha de adquisición:</h1>
                </div>
            </div>
            <div className="pt-0">Card Footer</div>
        </div>
        </>
    )
}
export default Card
  