import { RiLock2Line } from "react-icons/ri";
import { FaRegCircleUser } from "react-icons/fa6";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/data/context/authContext";
import loginImage from '../../assets/farol.png';

export default function Login() {
  const { login } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault(); // Previne o envio padrão do formulário
    try {
      await login(nome, senha); // Chama a função de login do contexto
    }
    catch (e: any) {
      window.alert(e.response.data.mensagem)
    }
  }

  

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex border rounded-2xl border-slate-300 h-[70vh] w-[60rem]">
        {/* Formulário de Login */}
        <div className="w-1/2 p-8 text-center px-20 flex justify-center items-center">
          <form
            onSubmit={handleLogin} // Lida com o envio do formulário, incluindo o Enter
            className="w-full"
          >
            <p className="font-light text-sm">Fazer login no</p>
            <p className="font-semibold text-xl">Chama - TI - Admin</p>

            <div className="flex items-center border border-slate-300 rounded py-2 px-3 mt-8">
              <FaRegCircleUser size={15} className="text-slate-500 mr-2" />
              <input
                type="text"
                className="outline-none flex-grow text-slate-600"
                placeholder="Seu nome de usuário"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                required // Torna o campo obrigatório
              />
            </div>
            <div className="flex items-center border border-slate-300 rounded py-2 px-3 mt-2">
              <RiLock2Line size={15} className="text-slate-500 mr-2" />
              <input
                type="password"
                className="outline-none flex-grow text-slate-600"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required // Torna o campo obrigatório
              />
            </div>

            <button
              type="submit" // Especifica que o botão é de envio do formulário
              className="shadow-md hover:bg-gray-400 active:bg-gray-500 bg-gray-300 mt-6 w-full py-1 rounded-md text-slate-950 flex items-center gap-2 justify-center hover:opacity-95 transition-all hover:transition-all"
            >
              Fazer login
            </button>
          </form>
        </div>

        {/* Imagem */}
        <div className="w-1/2">
          <img
            src={loginImage}
            alt="Login"
            className="object-cover w-full h-full rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}
