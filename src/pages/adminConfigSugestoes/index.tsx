import { useContext } from "react"
import { DataContext } from "../../components/data/context/dataContext"
// import { Sugestao } from "../../components/types"




export default function Sugestoes() {

  const { sugestoes, usuarios } = useContext(DataContext)

  return (
    <div className="p-12">
      <div className="flex justify-between items-center">
        <div className="font-normal text-lg">
          <p>Sugestões</p>
        </div>
        <div />
      </div>
      <div className="mt-8 p-8 text-slate-900 w-[36rem] mx-auto">

        <div className='mt-4'>
          <div className="space-y-4">
            {sugestoes?.map((comentario) => (
              <div
                key={comentario.id}
                className="p-4 border border-gray-300 rounded-xl bg-gray-50 shadow-lg hover:shadow-xl transition-all"
              >
                <p className="text-sm text-gray-700">{comentario.sugestao}</p>
                <div className="text-xs text-gray-500 mt-2">
                  <span>{usuarios?.map((usuario) =>
                    usuario.id === comentario.usuarioId ? usuario.nome : null
                  ).filter((nome) => nome !== null)}</span> | <span>{new Date(comentario.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
