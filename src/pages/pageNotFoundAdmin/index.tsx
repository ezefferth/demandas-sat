
export default function PageNotFoundAdmin() {
  return (
    <div className="w-[100vw] text-center text-lg font-semibold">
      <div className="mt-[35vh]">
        <p className="mb-2">Error: 403</p>
        <p className="">Você não deveria estar aqui</p>
        <p className="">Página restrita para Administradores</p>
        <div>
          <a href="http://10.21.39.75:3001">Clique aqui e acesse a página como usuário.</a>
        </div>
      </div>

    </div>
  );
}