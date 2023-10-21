import React from "react";

const Footer = () => {
  return (
    <footer className="mt-auto overflow-hidden bg-pigment-blue pt-6 px-12">
      <div className="flex justify-center items-end w-full h-20 ssm:flex-col ssm:items-center ssm:h-36">
        <div className="pl-6 w-2/6 flex items-center h-full ssm:mb-2 ssm:pl-0 ssm:w-full ssm:justify-center">
          <img src="src\assets\logo_v2.png" alt="Logo" className="h-14" />
        </div>
        <div className=" text-white font-bold justify-center items-center pl-12 ssm:pl-0 w-4/6 bg-midnight-blue h-2/3 ssm:h-28 rounded-t-lg flex md:text-xs ssm:w-full ssm:flex-col ssm:pt-2">
          <div className="w-1/4 ssm:w-full">
            <div className="ssm:text-sm flex justify-center items-center">
              <a
                href="https://github.com/JMCA2805"
                className="flex items-center w-auto"
              >
                <img
                  className="h-8 ml-1 mr-1 md:h-6 ssm:h-6"
                  alt="Logo de Github"
                  src="src\assets\icons\github-logo-240.png"
                />
                JMCA2805
              </a>
            </div>
          </div>
          <div className="w-1/4  ssm:w-full">
            <div className="ssm:text-sm flex justify-center items-center">
              <a
                href="https://github.com/Ochoaadev"
                className="flex items-center w-auto"
              >
                <img
                  className="h-8 ml-1 mr-1 md:h-6 ssm:h-6"
                  alt="Logo de Github"
                  src="src\assets\icons\github-logo-240.png"
                />
                Ochoaadev
              </a>
            </div>
          </div>

          <div className="w-1/4  ssm:w-full">
            <div className="ssm:text-sm flex justify-center items-center">
              <a
                href="https://github.com/YetzeniaM7"
                className="flex items-center w-auto"
              >
                <img
                  className="h-8 ml-1 mr-1 md:h-6 ssm:h-6"
                  alt="Logo de Github"
                  src="src\assets\icons\github-logo-240.png"
                />
                YetzeniaM7
              </a>
            </div>
          </div>

          <div className="w-1/4  ssm:w-full">
            <div className="ssm:text-sm flex justify-center items-center">
              <a
                href="https://github.com/CJPM27"
                className="flex items-center w-auto"
              >
                <img
                  className="h-8 ml-1 mr-1 md:h-6 ssm:h-6"
                  alt="Logo de Github"
                  src="src\assets\icons\github-logo-240.png"
                />
                CJPM27
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center px-6 items-end w-full h-20 bg-midnight-blue rounded-l-lg rounded-bl-none ssm:flex-col ssm:justify-center ssm:h-32 ssm:text-xs ssm:items-center ssm:w-full">
        <div className="flex flex-col w-2/6 md:text-xs ssm:text-xs ssm:w-full ssm:text-center">
          <span className="text-white/70">Universidad Valle del Momboy</span>
          <span className="text-white/70">Rif XXXXXXXXXXX-X</span>
          <span className="text-white/70">VEN-Website </span>
        </div>
        <div className="flex w-4/6 h-20 items-center justify-start ssm:w-full ssm:h-12 ssm:pt-6">
          <div className="flex w-1/6 h-20 justify-center">
            <img
              className="h-12 mt-2 ml-1 mr-1 md:h-10 ssn:h-8"
              alt="Logo de Github"
              src="src\assets\icons\git-logo-240.png"
            />
          </div>

          <div className="flex w-1/6 h-20 justify-center">
            <img
              className="h-12 mt-2 ml-1 mr-1 md:h-10 ssn:h-8"
              alt="Logo de Github"
              src="src\assets\icons\javascript-logo-240.png"
            />
          </div>
          <div className="flex w-1/6 h-20 justify-center">
            <img
              className="h-12 mt-2 ml-1 mr-1 md:h-10 ssn:h-8"
              alt="Logo de Github"
              src="src\assets\icons\nodejs-logo-240.png"
            />
          </div>
          <div className="flex w-1/6 h-20 justify-center">
            <img
              className="h-12 mt-2 ml-1 mr-1 md:h-10 ssn:h-8"
              alt="Logo de Github"
              src="src\assets\icons\react-logo-240.png"
            />
          </div>
          <div className="flex w-1/6 h-20 justify-center">
            <img
              className="h-12 mt-2 ml-1 mr-1 md:h-10 ssn:h-8"
              alt="Logo de Github"
              src="src\assets\icons\tailwind-css-logo-240.png"
            />
          </div>
          <div className="flex w-1/6 h-20 justify-center">
            <img
              className="h-12 mt-2 ml-1 mr-1 md:h-10 ssn:h-8"
              alt="Logo de Github"
              src="src\assets\icons\visual-studio-logo-240.png"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center w-full bg-midnight-blue">
        <span className="text-white/70">© 2023 MyBox</span>
      </div>
    </footer>
  );
};

export default Footer;
