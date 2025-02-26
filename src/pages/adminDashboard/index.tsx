

// import React from 'react'

import ChamadosPorSetor from "./charBar/chamadosPorSetor";
import ChamadosPorAssunto from "./chartPie/chamadosPorAssunto";
import ChamadosPorCategoria from "./chartPie/chamadosPorCategoria";
import ChamadosPorPrioridades from "./chartPie/chamadosPorPrioridade";
import ChamadosPorStatus from "./chartPie/chamadosPorStatus";

export default function Dashboard() {
  return (
    <div>
      <div className="">
        <div className="text-center mb-20">
          <h1 className="text-center">Chamados por Setor</h1>
          <ChamadosPorSetor/>
        </div>
        <div className="flex mb-20">
          <div className="text-center">
            <h1 className="mb-6">Chamados por Categoria</h1>
            <ChamadosPorCategoria />
          </div>
        </div>
        <div className="flex mb-20">
          <div className="text-center">
            <h1 className="mb-6">Chamados por Assunto</h1>
            <ChamadosPorAssunto />
          </div>
        </div>
        <div className="flex mb-20">
          <div className="text-center">
            <h1 className="mb-6">Chamados por Status</h1>
            <ChamadosPorStatus />
          </div>
        </div>
        <div className="flex mb-20">
          <div className="text-center">
            <h1 className="mb-6">Chamados por Prioridade</h1>
            <ChamadosPorPrioridades />
          </div>
        </div>
      </div>

    </div>
  )
}
