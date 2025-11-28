# Super Sidebar (Sidebar 1 Fina) – Documentação de Desenvolvimento

Esta documentação descreve detalhadamente **como iremos projetar, estruturar e implementar** a primeira sidebar fina (Sidebar 1) do clone do WhatsApp Web.

A Sidebar 1 é aquela coluna **ultrafina**, fixa no lado esquerdo da interface, que contém apenas ícones verticais.

---

## 🎯 Objetivo da Sidebar 1

A Sidebar 1 tem como função ser um **menu de navegação principal**, permitindo que o usuário acesse:

* Conversas
* Status
* Comunidades
* Grupos
* Canais
* Configurações
* Perfil do usuário

Ela é visualmente compacta e ocupa apenas uma faixa estreita do lado esquerdo da tela.

---

## 🧱 Estrutura Visual (Layout)

A Sidebar 1 será dividida em três áreas principais:

```
|-----------------------------------|
|  TOPO                             |
|   - Ícone Comunidades             |
|   - Ícone Status                  |
|   - Ícone Conversas               |
|   - Ícone Grupos                  |
|   - Ícone Canais                  |
|-----------------------------------|
|  MEIO                             |
|   - Loading (efeito circular)     |
|-----------------------------------|
|  BASE                             |
|   - Ícone Configurações           |
|   - Foto do usuário               |
|-----------------------------------|
```

---

## 🧩 Componentes que serão criados

A sidebar será composta de pequenos componentes reutilizáveis:

### **1. SidebarContainer**

* Wrapper da coluna fina
* Controla largura fixa
* Controla o alinhamento vertical

### **2. SidebarIcon**

* Componente genérico para cada ícone
* Estado hover
* Estado ativo
* Tooltip opcional

### **3. SidebarAvatar**

* Foto de perfil do usuário
* Tamanho reduzido
* Hover com leve brilho

### **4. SidebarLoadingIndicator**

* Animação circular (igual ao WhatsApp Web)

---

## 🎨 Estilo (TailwindCSS)

A Sidebar 1 usará:

* Fundo: `bg-[#111b21]` (cor original do WhatsApp Web)
* Largura fixa: `w-[72px]`
* Ícones com hover: `hover:bg-[#2a3942] rounded-xl p-3`
* Coluna vertical: `flex flex-col justify-between h-screen`

Ícones terão estados:

* **default** → cinza médio
* **hover** → fundo mais claro
* **ativo** → verde + fundo destacado

---

## 🗂️ Estrutura de Pastas

A estrutura será organizada em:

```
src/
  components/
    sidebar/
      Sidebar1/
        Sidebar1.tsx
        SidebarIcon.tsx
        SidebarAvatar.tsx
        SidebarLoading.tsx
```

---

## ⚙️ Comportamento (Lógica)

* Sidebar não terá rolagem.
* Cada ícone emitirá um evento para atualizar o estado global.
* Estado global (Zustand ou Context) define qual menu está ativo.
* Avatar abre modal de perfil quando clicado.

---

## 🛠️ Tecnologias usadas

* React + TypeScript
* TailwindCSS
* Icons (Lucide ou Heroicons)
* Zustand (opcional – estado global)

---

## 📌 Checklist da entrega da Sidebar 1

* [ x ] Criar estrutura de pastas
* [ x  ] Criar componente principal `Sidebar1`
* [ ] Criar a lista de ícones do topo
* [ ] Criar indicador de carregamento (meio)
* [ ] Criar ícones da base (configurações + avatar)
* [ ] Estilizar com Tailwind conforme WhatsApp Web
* [ ] Ajustar responsividade mínima (desktop only)

---

## 🖼️ Resultado Final Esperado

Abaixo está a imagem de referência para a **Sidebar 1 (fina)** que iremos construir:

![Sidebar Fina Referência](/public/sidebarfina.png)

---

## 🚀 Próximas etapas

Depois que a Sidebar 1 estiver pronta:

1. Criar a Sidebar 2 (lista de conversas)
2. Criar o layout completo com grid 3 colunas
3. Implementar transição entre menus

---

## 📌 Observação

Esta documentação serve como guia **exato** para iniciar o desenvolvimento.
O design será fiel ao WhatsApp Web, mantendo mesma estrutura, cores e espaçamentos.

---

Se desejar, posso gerar agora:

* Os componentes iniciais
* O código completo do Sidebar1.tsx
* A estilização Tailwind
* Os ícones corretos

Só pedir! 🚀
