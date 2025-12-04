import { useState } from "react";

import SideBar01 from "../../components/SideBar01";
import ContactsList from "../../components/ContactsList";
import type { ContactItem } from "../../components/ContactsList";
import ChatOpen from "../../components/ChatOpen";

export default function Home() {
  // Estado tipado corretamente
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);

  return (
    <div className="w-full h-screen flex bg-[#0b141a]">
      <SideBar01 />

      <ContactsList onSelectContact={setSelectedContact} />

      <ChatOpen contact={selectedContact} />
    </div>
  );
}
