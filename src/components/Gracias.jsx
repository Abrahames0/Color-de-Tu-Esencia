import React from 'react'

const Gracias = () => {
  return (
    <div className="flex text-center justify-center items-center flex-col pt-[30px] ">
      <div className='z-10 mb-80 lg:mt-60 mobile:mt-40'>
        <div className="font-bold txt-light mobile:text-[50px] lg:text-[74px] dark:text-white">
          Gracias!<br/><span className="txt-main">&nbsp;por contestar estas preguntas!</span>
        </div>
        <button onClick={() => window.location.href = '/'} className="text-white back-main px-[75px] py-[15px] mt-10 rounded-full text-[25px] hover:bg-indigo-800 active:bg-indigo-900 transition-all">
          Volver al Inicio
        </button>
      </div>
    </div>
  )
}


export default Gracias;