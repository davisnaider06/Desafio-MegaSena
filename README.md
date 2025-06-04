Perfeito! Aqui está o **README.md** prontinho para você **copiar e colar**:

---

```markdown
# 🎯 Desafio Mega-Sena

Sistema completo de consulta, inserção e navegação de concursos da Mega-Sena, com front-end, back-end e banco de dados integrados!

## 🚀 Acesse o sistema:

🔗 **[Site Online](https://megasena-backend.onrender.com/)**  
🔗 **[Repositório no GitHub](https://github.com/davisnaider06/desafio-MegaSena.git)**

---

## 🛠️ Tecnologias Utilizadas

- **Node.js** e **Express** (back-end)
- **PostgreSQL** (banco de dados via Supabase)
- **JavaScript Vanilla** (front-end)
- **HTML5** e **CSS3**
- **Render** (deploy do back-end)
- **Supabase** (banco de dados na nuvem)

---

## 📦 Funcionalidades

✅ Consultar o último concurso  
✅ Buscar um concurso específico  
✅ Navegar entre concursos (anterior/próximo)  
✅ Inserir novos concursos (rota POST)  
✅ CRUD completo (em desenvolvimento)  

---

## 🏗️ Estrutura do Projeto

```

/src
/routes
\- ultimo.js
\- especifico.js
\- adicionar.js

* server.js
* db.js
  /public
* megasena.html
* megasena.css
* megasena.js

```

---

## 🔗 Rotas da API

| Método | Rota                        | Descrição                               |
|-------- |---------------------------  |---------------------------------------- |
| GET     | `/api/ultimo`               | Retorna o último concurso               |
| GET     | `/api/especifico/:concurso` | Retorna dados de um concurso específico |
| POST    | `/api/adicionar`            | Adiciona um novo concurso               |

---

## 🚀 Como executar localmente

1. Clone o repositório:  
   `git clone https://github.com/davisnaider06/desafio-MegaSena.git`

2. Instale as dependências:  
   `npm install`

3. Configure o `.env` com a `DATABASE_URL`.

4. Execute o servidor:  
   `npm run dev`

5. Acesse:  
   `http://localhost:3000`

---

## 🏆 Deploy

✅ **Back-end** hospedado via **Render**  
✅ **Banco de dados** PostgreSQL via **Supabase**  
✅ **Front-end** servido junto do back-end (Express Static)

---

## 🙋‍♂️ Autor

**Davis Naider**  
[GitHub](https://github.com/davisnaider06)  
[LinkedIn](https://www.linkedin.com/in/...)

---

## 💡 Motivação

Projeto acadêmico de integração front-end, back-end e banco de dados.  
Desenvolvido para aplicar conhecimentos de:

✅ Requisições HTTP  
✅ Deploy de aplicações Node.js  
✅ Banco de dados relacional na nuvem  
✅ Manipulação de dados com JavaScript

---

## 📸 Screenshot

![Mega-Sena Screenshot](https://megasena-backend.onrender.com)  
(*Adicione um print da tela aqui depois.*)

---

## 🤝 Contribuições

Sinta-se à vontade para sugerir melhorias ou relatar problemas via Issues ou Pull Requests!
```
