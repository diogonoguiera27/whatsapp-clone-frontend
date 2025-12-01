
import ChatOpen from "../../components/ChatOpen";
import ContactsList from "../../components/ContactsList";
import SideBar01 from "../../components/SideBar01";

export default function Home() {
  return (
    <div className="w-full h-screen flex bg-[#0b141a]">
      <SideBar01/>
      <ContactsList />
      <ChatOpen />
    </div>
    
  );
}
