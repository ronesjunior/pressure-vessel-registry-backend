# Pressure Vessel Registry Backend

API back-end desenvolvida com **Node.js**, **Express** e **PostgreSQL** para gerenciar usuários e vasos de pressão.

Banco de dados e estrutura de backend hospedados no Google Cloud

## Descrição

Este projeto é o back-end da aplicação **Pressure Vessel Registry**.  
Ele permite:

- cadastro de usuários
- login com autenticação JWT
- consulta de perfil do usuário autenticado
- atualização e exclusão de usuário
- conexão com banco de dados PostgreSQL
- organização em rotas, controllers e middlewares

---

## Tecnologias utilizadas

- Node.js
- Express
- PostgreSQL
- bcrypt
- jsonwebtoken
- dotenv
- nodemon

---

## Estrutura do projeto

```bash
pressure-vessel-registry-backend/
│
├── controllers/
│   └── userController.js
│
├── db/
│   └── db.js
│
├── middlewares/
│   ├── auth.js
│   ├── error.js
│   └── logs.js
│
├── routes/
│   ├── user.js
│   └── vessel.js
│
├── logs/
│   ├── request.log
│   └── error.log
│
├── .env
├── .gitignore
├── app.js
├── package.json
└── README.md
```
