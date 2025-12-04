import { api } from "./api";

/* =======================================================
   🔵 BUSCAR OU CRIAR CONVERSA
======================================================= */
export function getConversation(userA: string, userB: string) {
  return api.get(`/messages/between/${userA}/${userB}`);
}

/* =======================================================
   🔵 BUSCAR HISTÓRICO
======================================================= */
export function getHistory(conversationId: string) {
  return api.get(`/messages/${conversationId}/messages`);
}

/* =======================================================
   🟢 MARCAR TODAS MENSAGENS COMO LIDAS
======================================================= */
export function markConversationAsRead(conversationId: string, userId: string) {
  return api.put(`/messages/conversation/${conversationId}/read-all/${userId}`);
}

/* =======================================================
   🔔 BUSCAR QUANTIDADE DE NÃO LIDAS POR CONVERSA
======================================================= */
export function getUnreadCounts(userId: string) {
  return api.get(`/messages/unread/${userId}`);
}
