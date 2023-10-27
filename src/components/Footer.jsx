
const Footer = () => {
  return (
    <footer className="mt-auto overflow-hidden bg-pizazz dark:bg-black">
      <div className="text-white dark:text-pizazz font-bold justify-center items-center w-full ssm:h-28 flex md:text-xs ssm:w-full ssm:flex-col ssm:pt-2 h-12">
        <div className="w-1/4 ssm:w-full">
          <div className="ssm:text-sm flex justify-center items-center">
            <a
              href="https://github.com/JMCA2805"
              className="flex items-center w-auto"
            >
              <img
                className="h-8 ml-1 mr-1 md:h-6 ssm:h-6"
                alt="Logo de Github"
                id="github"
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
                id="github"
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
                id="github"
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
                id="github"
              />
              CJPM27
            </a>
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-full bg-pizazz dark:bg-black">
        <span className="text-white/70 dark:text-pizazz/70 ssm:text-sm">
          MyBox © 2023 All rights reserved{" "}
        </span>
      </div>
    </footer>
  );
};

export default Footer;
