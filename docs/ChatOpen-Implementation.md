Abertura de Conversas – Documentação de Implementação

Este documento descreve o que deve ser implementado para permitir que, ao clicar em um contato na lista, a conversa seja exibida no painel principal — seguindo o comportamento do WhatsApp Web.

📌 1. Objetivo da Funcionalidade

Implementar o fluxo onde:

O usuário clica em um contato na lista.

A interface principal muda.

Uma janela de conversa é exibida.

Todo o conteúdo da conversa aparece no painel direito.

A primeira versão funcionará apenas com dados mockados.

📌 2. Componentes Envolvidos

A funcionalidade envolve quatro componentes principais:

SideBar01

Barra lateral fina com ícones.

ContactsList

Lista de conversas que o usuário pode clicar.

ChatWindow

Janela principal onde a conversa será aberta.

Home

Componente controlador da página. Gerencia o estado global da conversa atual.

📌 3. Fluxo de Funcionamento

O usuário clica em um contato dentro do componente ContactsList.

O ContactsList chama uma função enviada pela Home informando qual contato foi clicado.

A Home atualiza o estado selectedChat.

O componente ChatWindow recebe os dados da conversa selecionada.

A conversa abre automaticamente, substituindo qualquer conteúdo anterior.

📌 4. Responsabilidade dos Componentes
ContactsList

Mostrar os contatos.

Detectar cliques.

Enviar o contato selecionado para a Home.

Não renderizar a conversa.

Home

Controlar o estado selectedChat.

Renderizar o ChatWindow quando alguém for selecionado.

Enviar para o ChatWindow todos os dados necessários.

ChatWindow

Exibir:

Foto e nome do contato.

Status (opcional).

Área de mensagens.

Input para digitar mensagens.

Mostrar uma mensagem de "Selecione um contato" caso nada esteja selecionado.

📌 5. Estado Necessário

A Home deve manter apenas 1 estado:

selectedChat

Guarda qual contato foi clicado.

Garante que ChatWindow sabe qual conversa renderizar.

📌 6. Dados Necessários (Mockados)

Cada contato deve possuir pelo menos:

id

nome

avatar

última mensagem

horário

lista de mensagens (mock)

Esses dados serão usados apenas para testes visuais.

📌 7. Regras da Interface
Ao clicar no contato:

A linha da lista deve ter hover.

Deve atualizar o painel da direita imediatamente.

O ChatWindow deve ocupar a área total da direita.

O ChatWindow deve conter:

Cabeçalho com avatar + nome.

Fundo com padrão do WhatsApp.

Caixa de mensagens.

Campo inferior para digitar