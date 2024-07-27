import React from 'react'

const Home = () => {
  return (
    <div className="flex text-center justify-center items-center flex-col pt-[30px] ">
      <div className='z-10 mb-80 lg:mt-60 mobile:mt-60'>
        <div className="font-bold txt-light mobile:text-[70px] lg:text-[74px] dark:text-white">
          ¿Qué color<br/><span className="txt-main">&nbsp;podría reflejar tu personalidad?</span>
        </div>
        <div className="dark:text-white txt-ternary-light lg:text-[18px] mt-5 md:flex-row flex mobile:flex-col mobile:items-center justify-center">
          <div>
            Los colores están asociados con ciertos rasgos y sensaciones. <br/>
            De acuerdo con tu personalidad, ¿qué color podría representarte? 
            <span className="inline-block mt-2">
              Este test te ayudará a explorar posibles colores, pero aun ofrece un resultado final. <br/>
            </span>
            <div className="type mobile:w-[179px] w-auto inline-block mt-2">
              Participa en la encuesta para descubrir más...
            </div>
          </div>
        </div>
        <button onClick={() => window.location.href = '/encuesta'} className="text-white back-main px-[75px] py-[15px] mt-10 rounded-full text-[25px] hover:bg-purple-700 active:bg-purple-700 transition-all">
          Iniciar Encuesta
        </button>
      </div>
    </div>
  )
}

export default Home;