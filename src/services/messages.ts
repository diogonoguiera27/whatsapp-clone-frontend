import { api } from "./api";


export function getConversation(userA: string, userB: string) {
  return api.get(`/messages/between/${userA}/${userB}`);
}


export function getHistory(conversationId: string) {
  return api.get(`/messages/${conversationId}/messages`);
}


export function markConversationAsRead(conversationId: string, userId: string) {
  return api.put(`/messages/conversation/${conversationId}/read-all/${userId}`);
}


export function getUnreadCounts(userId: string) {
  return api.get(`/messages/unread/${userId}`);
}
