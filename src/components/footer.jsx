import React from 'react';
  
const Footer = () => {
  return (
    <footer className="bg-azure p-4">
      <div className="flex items-center justify-between">
        <img src='src\assets\logo_v2.png' alt="GitHub Logo" className="h-10 mr-15" />
        <div className="flex items-center">
          <div className="flex items-center  justify-evenly bg-midnight-blue text-white" > 
            <a href="https://github.com/user1" target="_blank" rel="noreferrer" className='mx-36'>JMCA2805</a>
            <a href="https://github.com/user2" target="_blank" rel="noreferrer" className='mx-36'>Ochoaadev</a>
            <a href="https://github.com/user1" target="_blank" rel="noreferrer" className='mx-36'>YetzeniaM7</a>
            <a href="https://github.com/user1" target="_blank" rel="noreferrer" className='mx-36'>CJPM27</a>
          </div>
        </div>
      </div>
        <div className="flex items-center  justify-evenly text-white bg-midnight-blue"> 
      
            <a href="https://github.com/user1" target="_blank" rel="noreferrer" className='mx-1'>imgGIT</a>
            <a href="https://github.com/user2" target="_blank" rel="noreferrer" className='mx-1'>GITHUB</a>
            <a href="https://github.com/user1" target="_blank" rel="noreferrer" className='mx-1'>VS</a>
            <a href="https://github.com/user1" target="_blank" rel="noreferrer" className='mx-1'>THUNDERCLIENT</a>
          </div>
          <span class="block text-sm text-gray-500 xl:text-center text-white bg-midnight-blue">© 2023 All Rights Reserved.</span>
    </footer>
  );
};

export default Footer;