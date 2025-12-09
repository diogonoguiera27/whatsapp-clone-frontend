import { useState } from "react";

import SideBar01 from "../../components/SideBar01";
import ContactsList from "../../components/ContactsList";
import ChatOpen from "../../components/ChatOpen";

import type { ContactItem } from "../../components/ContactsList";

export default function Home() {
  
  const [selectedContact, setSelectedContact] = useState<ContactItem | null>(null);

  return (
    <div className="w-full h-screen flex bg-[#0b141a] overflow-hidden">

      
      <SideBar01 />

      <ContactsList
        onSelectContact={(contact) => {
          console.log("👤 [HOME] Contato selecionado:", contact);
          setSelectedContact(contact);
        }}
      />

      
      <ChatOpen contact={selectedContact} />
    </div>
  );
}
