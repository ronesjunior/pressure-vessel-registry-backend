import dbClient from "../db/db.js";

export function getVessel(req, res) {
  dbClient
    .query(
      "SELECT id, nome, material, volume, created_at FROM vessels ORDER BY id ASC",
    )
    .then((result) => {
      res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error("Erro ao buscar vasos:", error);
      res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function createVessel(req, res) {
  console.log("BODY RECEBIDO:", req.body);

  const { user_id, tag, nome, material, volume } = req.body;

  if (!user_id || !tag || !nome || !material || volume == null) {
    return res
      .status(400)
      .send({ message: "Preencha user_id, tag, nome, material e volume" });
  }

  dbClient
    .query(
      `INSERT INTO vessels (user_id, tag, nome, material, volume)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING id, user_id, tag, nome, material, volume, created_at`,
      [user_id, tag, nome, material, volume],
    )
    .then((result) => {
      res.status(201).send(result.rows[0]);
    })
    .catch((error) => {
      console.error("Erro ao criar vaso:");

      if (error.code === "23505") {
        return res.status(409).send({ message: "Vaso já cadastrado" });
      }

      if (error.code === "23503") {
        return res
          .status(400)
          .send({ message: "user_id não existe na tabela users" });
      }

      res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function deleteVessel(req, res) {
  const { id } = req.params;

  dbClient
    .query(
      `DELETE FROM vessels
       WHERE id = $1
       RETURNING id, nome, material, volume, created_at`,
      [id],
    )
    .then((result) => {
      if (result.rows.length === 0) {
        return res.status(404).send({ message: "Vaso não encontrado" });
      }

      res.status(200).send({
        message: "Vaso excluído com sucesso",
        vessel: result.rows[0],
      });
    })
    .catch((error) => {
      console.error("Erro ao excluir vaso:", error);
      res.status(500).send({ message: "Erro interno do servidor" });
    });
}
