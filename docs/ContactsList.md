📘 DOCUMENTAÇÃO — Construção da Tela de Listagem de Conversas (Sidebar 2)
🎯 Objetivo

Implementar a segunda coluna do WhatsApp Web — Lista de Conversas — contendo:

✔ Barra superior com o título WhatsApp
✔ Barra de pesquisa
✔ Filtros (Tudo, Não lidas, Favoritas, Grupos)
✔ Lista de conversas mockadas
✔ Preparação para futura integração com backend

Essa coluna será exibida junto com a Sidebar 01 (já criada).

src/
 ├─ components/
 │   ├─ SideBar01/
 │   │     └─ index.tsx
 │   ├─ ContactsList/
 │   │     ├─ index.tsx
 │   │     ├─ SearchBar.tsx
 │   │     ├─ Filters.tsx
 │   │     ├─ ContactItem.tsx
 │   │     └─ mock/
 │   │           └─ conversations.ts
 │   ├─ TooltipButton/
 │         └─ index.tsx
 │
 ├─ pages/
 │   ├─ Home/
 │         └─ index.tsx

 🧩 Etapas da Construção
✅ 1. Criar o componente principal da Lista de Conversas

📌 Arquivo: src/components/ContactsList/index.tsx

Responsável por montar toda a coluna, contendo:

Cabeçalho "WhatsApp"

Barra de pesquisa

Filtros

Lista de contatos

✅ 2. Criar o componente SearchBar

📌 Arquivo: src/components/ContactsList/SearchBar.tsx

Funcionalidades:

Ícone de busca (Search, lucide-react)

Campo de pesquisa estilizado igual ao WhatsApp Web

Placeholder: Pesquisar ou começar nova conversa

✅ 3. Criar o componente Filters

📌 Arquivo: src/components/ContactsList/Filters.tsx

Filtros mockados por enquanto:

Tudo

Não lidas

Favoritas

Grupos

Cada botão define um estado ativo.

✅ 4. Criar o componente ContactItem

📌 Arquivo: src/components/ContactsList/ContactItem.tsx

Exibe:

Avatar

Nome do contato

Última mensagem

Horário

Badge verde com número de mensagens não lidas

Mock:

{
  id: 1,
  name: "Amor ❤️🤍",
  avatar: "/avatars/amor.jpg",
  lastMessage: "kkkkkk",
  timestamp: "13:34",
  unread: 2
}

✅ 5. Criar lista mockada

📌 Arquivo:
src/components/ContactsList/mock/conversations.ts

Essa lista será importada no componente principal.

🎨 Estilização (Tailwind)
Elemento	Cor
Fundo da coluna	#111b21
Barra de pesquisa	#202c33
Texto	#e9edef
Dividers	#2a3942
Hover dos itens	#202c33
Badge verde	#25d366 (cor oficial do WhatsApp)
🖼️ Referência Visual Esperada

(INSIRA A IMAGEM AQUI – a imagem enviada da Sidebar 2 com a lista)

Exemplo:

![Preview](../public/sidebar2-preview.png)

🔗 Integração com a Home

A Home ficará assim:

import SideBar01 from "../../components/SideBar01";
import ContactsList from "../../components/ContactsList";

export default function Home() {
  return (
    <div className="w-full h-screen flex">
      <SideBar01 />
      <ContactsList />
    </div>
  );
}
