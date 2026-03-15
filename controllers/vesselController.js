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
  const { nome, material, volume } = req.body;

  if (!nome || !material || !volume) {
    return res
      .status(400)
      .send({ message: "Preencha nome, material e volume" });
  }

  dbClient
    .query(
      `INSERT INTO vessels (nome, material, volume)
       VALUES ($1, $2, $3)
       RETURNING id, nome, material, volume, created_at`,
      [nome, material, volume],
    )
    .then((result) => {
      res.status(201).send(result.rows[0]);
    })
    .catch((error) => {
      console.error("Erro ao criar vaso:", error);

      if (error.code === "23505") {
        return res.status(409).send({ message: "Vaso já cadastrado" });
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
