

// criando a conexão com o servidor WebSocket
export const socket = new WebSocket("ws://localhost:3333");

// 2 Conectou com Sucesso 
socket.onopen = () => {
    console.log("🟢 WebSocket conectado ao servidor!");
}

// Recebeu Mesagem do Backend
socket.onmessage = (event) => {
    console.log("📩 Mensagem recebida do servidor:", event.data);
}

// Conexão Fechada 
socket.onclose = () => {
    console.log("🔴 WebSocket desconectado!");
}

// algum erro na Conexão
socket.onerror = (error) => {
    console.error("⚠️ Erro no WebSocket:", error);
}
