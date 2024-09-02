import { useState, useRef } from 'react'
import axios from 'axios'
import { ImpulseSpinner } from 'react-spinners-kit'
import InputMask from 'react-input-mask'

function App() {
  const responseRef = useRef()

  const [text, setText] = useState('')
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState()

  function searchCEP(e){
    e.preventDefault()

    if(responseRef.current){
      responseRef.current.style.display = `flex`
      responseRef.current.style.transform = `translateX(0px)`
    }
    setLoading(true)
    
    axios.get(`https://viacep.com.br/ws/${text}/json/`)
    .then(function (response){
      console.log(response.data)
      setResponse(response.data)
      setLoading(false)
    })
    .catch(function (error) {
      console.log(error)
      setLoading(false)
    })

    setText('')
  }

  return (
    <div className={`w-screen h-screen overflow-hidden flex flex-col justify-center items-center bg-my-terciary sm:flex-row sm:px-[80px]`}>
      <div className='w-full flex flex-col justify-center items-center'>
        <h1 className='text-my-primary font-bold text-center w-[80%] text-[36px] mb-3'>Consultador de CEP</h1>
        <form
          onSubmit={(e) => searchCEP(e)}
          className={`w-[80%] max-w-[500px] flex flex-row gap-1 items-center justify-center`}
        >
          <InputMask
            mask='99999-999'
            placeholder='00000-000'
            value={text}
            onChange={(e) => setText(e.target.value)}
            className={`
              flex-grow-[1] outline-none border-[1px] border-my-quartenary py-3 ps-2 rounded-[6px] bg-transparent
            `}
          />
          <input
            type="submit"
            value="pesquisar"
            className={`
              outline-none border-[1px] uppercase py-3 px-2 rounded-[6px] transition-all duration-[.3s]
              text-my-terciary bg-my-primary border-my-primary cursor-pointer
              focus:text-my-primary focus:bg-transparent hover:text-my-primary hover:bg-transparent
            `}
          />
        </form>
      </div>
      
      <div
        ref={responseRef}
        className={`w-[80%] hidden flex-col items-center justify-start mt-4 transition-all duration-[.3s] translate-x-[1000px]`}
      >
        <ImpulseSpinner frontColor="#0BBF7D" backColor="#595959" loading={loading} size={50} />

        {loading == false && response && response.erro && (
          <p className='text-red-600 font-bold text-[24px]'>CEP não encontrado</p>
        )}
        
        {loading == false && response && !response.erro && (
          <div className='relative w-full flex flex-col items-start max-h-[300px] scrollbar scrollbar-thumb-my-primary scrollbar-track-transparent overflow-y-scroll'>
            <h1 className='w-full text-center text-my-primary font-bold text-[32px] mb-3 sticky top-0 bg-my-terciary pb-2'>Resultado</h1>

            <div className={`w-full flex justify-between py-2 border-b-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Bairro: </p> <p>{response.bairro}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>CEP: </p> <p>{response.cep}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Complemento: </p> <p>{response.complemento}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>DDD: </p> <p>{response.ddd}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Estado: </p> <p>{response.estado}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Gia: </p> <p>{response.gia}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>IBGE: </p> <p>{response.ibge}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Localidade: </p> <p>{response.localidade}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Logradouro: </p> <p>{response.logradouro}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Região: </p> <p>{response.regiao}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Siafi: </p> <p>{response.siafi}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>UF: </p> <p>{response.uf}</p>
            </div>

            <div className={`w-full flex justify-between py-2 border-[1px] border-b-my-quartenary`}>
              <p className='font-bold'>Unidade: </p> <p>{response.unidade}</p>
            </div>

          </div>
        )}
      </div>

    </div>
  )
}

export default App
