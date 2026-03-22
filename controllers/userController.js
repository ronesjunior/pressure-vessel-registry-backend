import dbClient from "../db/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export function getUsers(req, res) {
  dbClient
    .query("SELECT id, name, email, created_at FROM users ORDER BY id ASC")
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error("Erro ao buscar usuários:", error);
      res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function getUserProfile(req, res) {
  const userId = req.user.id;

  dbClient
    .query(
      `SELECT id, name, email, created_at
       FROM users
       WHERE id = $1`,
      [userId],
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      res.status(200).send(result.rows[0]);
    })
    .catch((error) => {
      console.error("Erro ao buscar perfil:", error);
      res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function createUser(req, res) {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ message: "Preencha name, email e password" });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return dbClient.query(
        `INSERT INTO users (name, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, name, email, created_at`,
        [name, email, hashedPassword],
      );
    })
    .then((result) => {
      res.status(201).send(result.rows[0]);
    })
    .catch((error) => {
      console.error("Erro ao criar usuário:", error);

      if (error.code === "23505") {
        return res.status(409).send({ message: "E-mail já cadastrado" });
      }

      res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function loginUser(req, res) {
  const { email, password } = req.body;
  console.log("Login attempt:", { email, password });
  if (!email || !password) {
    return res.status(400).send({ message: "Preencha email e password" });
  }

  dbClient
    .query(
      `SELECT id, name, email, password, created_at
       FROM users
       WHERE email = $1`,
      [email],
    )
    .then((result) => {
      const user = result.rows[0];

      if (!user) {
        return Promise.reject({
          statusCode: 401,
          message: "Email ou password incorretos",
        });
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject({
            statusCode: 401,
            message: "Email ou password incorretos",
          });
        }

        const secret =
          process.env.NODE_ENV !== "production"
            ? "dev-secret"
            : process.env.JWT_SECRET;

        const token = jwt.sign({ id: user.id }, secret, {
          expiresIn: "7d",
        });
        res.status(200).send({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
          },
        });
      });
    })
    .catch((error) => {
      if (error.statusCode) {
        return res.status(error.statusCode).send({ message: error.message });
      }

      console.error("Erro ao fazer login:", error);
      res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function deleteUser(req, res) {
  const userId = req.user.id;

  dbClient
    .query(
      `DELETE FROM users
       WHERE id = $1
       RETURNING id, name, email, created_at`,
      [userId],
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      res.status(200).send({
        message: "Usuário excluído com sucesso",
        user: result.rows[0],
      });
    })
    .catch((error) => {
      console.error("Erro ao excluir usuário:", error);
      res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function updateUser(req, res) {
  const userId = req.user.id;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({
      message: "Preencha name, email e password",
    });
  }

  bcrypt
    .hash(password, 10)
    .then((hashedPassword) => {
      return dbClient.query(
        `UPDATE users
         SET name = $1, email = $2, password = $3
         WHERE id = $4
         RETURNING id, name, email, created_at`,
        [name, email, hashedPassword, userId],
      );
    })
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).send({ message: "Usuário não encontrado" });
      }

      res.status(200).send(result.rows[0]);
    })
    .catch((error) => {
      console.error("Erro ao atualizar usuário:", error);

      if (error.code === "23505") {
        return res.status(409).send({ message: "Email já cadastrado" });
      }

      res.status(500).send({ message: "Erro interno do servidor" });
    });
}
