import { BrowserRouter } from "react-router-dom"
import { Rotas } from "./routes"
import { useEffect } from "react"
import { socket } from "./services/websocket";

function App() {
  useEffect(() => {
    // quando o websocket conectar 
    socket.onopen = () => {
      console.log("🟢 WebSocket conectado no Front!");

      socket.send(JSON.stringify({
        type: "connection_test",
        content: "Front conectado com sucesso!"
      })); // enviando uma mensagem ao servidor
    }

    // Receber Messagem do Servidor 
    socket.onmessage = (event) => {
      console.log("📩 Mensagem recebida do servidor:", event.data);
    };

    // Cliente deesconectou 
    socket.onclose = () => {
      console.log("🔴 WebSocket desconectado!");
    }

    // algum erro na Comunicação
    socket.onerror = (error) => {
      console.error("⚠️ Erro no WebSocket:", error);
    }

  },[]);


  return (
    <BrowserRouter>
      <Rotas/>
    </BrowserRouter>
  )
}

export default App
