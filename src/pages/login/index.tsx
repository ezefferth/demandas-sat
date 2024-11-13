import { RiLock2Line } from "react-icons/ri";
// import { useNavigate } from "react-router-dom";
// import loginImage from "../../assets/imgLogin.jpg";
import { FaRegCircleUser } from "react-icons/fa6";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../components/data/context/authContext"

export default function Login() {
  // const navigate = useNavigate();

  const { login } = useContext(AuthContext);

  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  async function handleLogin(e: React.MouseEvent) {
    e.preventDefault();
    await login(nome, senha);
  }

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <div className="flex border rounded-2xl border-slate-300 h-[70vh] w-[60rem] ">
        {/* Formulário de Login */}
        <div className="w-1/2 p-8 text-center px-20 mt-8">
          <p className="font-light text-sm">Fazer login no</p>
          <p className="font-semibold text-xl">Chama - TI</p>

          <div className="flex items-center border border-slate-300 rounded py-2 px-3 mt-8">
            <FaRegCircleUser
              size={15}
              className="text-slate-500 mr-2"
            />
            <input
              type="text"
              className="outline-none flex-grow text-slate-600"
              placeholder="Seu nome de usuario"
              onChange={(e) => setNome(e.target.value)}
            />
          </div>
          <div className="flex items-center border border-slate-300 rounded py-2 px-3 mt-2">
            <RiLock2Line
              size={15}
              className="text-slate-500 mr-2"
            />
            <input
              type="password"
              className="outline-none flex-grow text-slate-600"
              placeholder="Sua senha"
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>

          <button
            onClick={(e) => handleLogin(e)}
            className="shadow-md hover:bg-gray-400 active:bg-gray-500 bg-gray-300 mt-6 w-full py-1 rounded-md text-slate-950 flex items-center gap-2 justify-center hover:opacity-95 transition-all hover:transition-all"
          >
            Fazer login
          </button>

          {/*           <p
            className="font-semibold text-gray-600 mt-6 hover:text-gray-700 cursor-pointer transition-all hover:transition-all"
            onClick={() => navigate("/login/recuperarSenha")}
          >
            Esqueceu a senha?
          </p>
          <p
            className="font-semibold text-gray-600 mt-1 hover:text-gray-700 cursor-pointer transition-all hover:transition-all"
            onClick={() => navigate("/login/recuperarSenha")}
          >
            Esqueceu o nome de usuário?
          </p> */}
          <p className="text-gray-600 mt-8 hover:text-gray-700 transition-all hover:transition-all">
            Não possui conta?{" "}
            <span
              className="font-semibold cursor-pointer"
              // onClick={() => navigate("/registro")}
            >
              Solicite seu Registro!
            </span>
          </p>
        </div>

        {/* Imagem */}
        <div className="w-1/2">
          <img
            // src={loginImage}
            alt="Login"
            className="object-cover w-full h-full rounded-r-2xl"
          />
        </div>
      </div>
    </div>
  );
}