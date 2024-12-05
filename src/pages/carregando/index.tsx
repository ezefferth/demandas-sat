
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

export default function Carregando() {
  return (
    <div className='text-center flex justify-center h-[90vh] items-center'>
      <p className='text-2xl flex items-center'>Carregando...<AiOutlineLoading3Quarters className='animate-spin ml-4' /></p>
    </div>
  )
}
