# Backend Deployment - Node.js API

## Descrição do Projeto

Este projeto consiste em uma API desenvolvida com Node.js e MongoDB, focada em gerenciamento de ofertas. O principal objetivo é permitir o gerenciamento de ofertas relâmpago e a conexão com um banco de dados MongoDB hospedado na plataforma MongoDB Atlas. O projeto também foi implementado para ser hospedado na Render, fornecendo uma solução completa para rodar online.

---

## Funcionalidades

- Gerenciamento de Ofertas: Criação, leitura, atualização e exclusão (CRUD) de ofertas relâmpago, atravez da rota privada (Área Administrativa)
- Gerenciamento de Procedimentos: Criação, leitura, atualização e exclusão (CRUD) de Procedimentos que se trata da tabela de preço atravez da rota privada (Área Administrativa).
- Gerenciamento de Mensage: Criação, leitura, atualização e exclusão (CRUD) de Mensagens deixas pelos usuarios na rota publica , atravez da rota privada (Área Administrativa)
- acessada com login e senha o administrador pode aprovar mensagem antes da mensagem fica publica.
- Temporizador: Um temporizador que exibe quanto tempo falta para as ofertas expirarem.
- Conexão com o MongoDB Atlas: Integração segura com banco de dados online.
- Deploy Automático: Configuração automática para hospedar no serviço Render.
  
---

## Variáveis de Ambiente

Para que o projeto funcione corretamente, você deve configurar as seguintes variáveis de ambiente:

- `MONGO_URI`: A string de conexão com o MongoDB Atlas.
- `PORT`: Porta em que o servidor será iniciado (padrão 5000).
  
Certifique-se de configurar a conexão com o MongoDB, adicionando seu IP à lista de permissões no MongoDB Atlas.

---

## Desafios

Os principais desafios enfrentados neste projeto incluem:

- **Configuração do Banco de Dados**: Garantir que o MongoDB Atlas permitisse conexões do servidor online.
- **Gerenciamento de Tempo Real**: Manter o temporizador das ofertas sincronizado e atualizado sem recarregamento da página.
- **Deploy na Render**: Resolver problemas relacionados a permissões de IP e variáveis de ambiente durante o deploy na plataforma Render.

---

## Screenshots

### Rodando Localmente
![Rodando Localhost](./rodandolocalhost.png)

### Rodando Online
![Rodando Online](./rodandoonline.png)

---

## Como Executar Localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/Michaelrodriguesds/backende-Deploy.git
