


import { FaPlusSquare } from 'react-icons/fa'

export default function Usuarios() {
  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Usuários</p>
        </div>
        <button>
          <FaPlusSquare className="text-slate-600 hover:text-slate-800 transition-all h-6 w-6" />
        </button>
      </div>
    </div>
  )
}
