import { api } from "./api";

export async function listContacts(userId: string) {
  const response = await api.get(`/contacts/${userId}`);
  return response.data;
}

export async function createContact(ownerId: string, contactId: string) {
  const response = await api.post("/contacts", {
    ownerId,
    contactId,
  });
  return response.data;
}
