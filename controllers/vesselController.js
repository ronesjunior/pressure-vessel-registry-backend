import dbClient from "../db/db.js";

export function getVessel(req, res) {
  const userId = req.user.id;

  dbClient
    .query(
      `SELECT
        id,
        tag,
        nome,
        fabricante,
        modelo,
        numeroserie,
        volume,
        pressaotrabalho,
        pressaoprojeto,
        temperaturaprojeto,
        fluido,
        material,
        anofabricacao,
        localizacao,
        datainspecao,
        proximainspecao,
        imagem,
        observacoes,
        user_id,
        created_at
       FROM vessels
       WHERE user_id = $1
       ORDER BY id ASC`,
      [userId],
    )
    .then((result) => {
      return res.status(200).send(result.rows);
    })
    .catch((error) => {
      console.error("Erro ao buscar vasos:", error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function getVesselById(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  dbClient
    .query(
      `SELECT
        id,
        tag,
        nome,
        fabricante,
        modelo,
        numeroserie,
        volume,
        pressaotrabalho,
        pressaoprojeto,
        temperaturaprojeto,
        fluido,
        material,
        anofabricacao,
        localizacao,
        datainspecao,
        proximainspecao,
        imagem,
        observacoes,
        user_id,
        created_at
       FROM vessels
       WHERE id = $1 AND user_id = $2`,
      [id, userId],
    )
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(404)
          .send({ message: "Vaso não encontrado ou sem permissão" });
      }

      return res.status(200).send(result.rows[0]);
    })
    .catch((error) => {
      console.error("Erro ao buscar vaso:", error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
}

export function createVessel(req, res) {
  const user_id = req.user.id;
  console.log("usuário ID:", user_id);
  const {
    tag,
    nome,
    fabricante,
    modelo,
    numeroserie,
    volume,
    pressaotrabalho,
    pressaoprojeto,
    temperaturaprojeto,
    fluido,
    material,
    anofabricacao,
    localizacao,
    datainspecao,
    proximainspecao,
    imagem,
    observacoes,
  } = req.body;

  if (!tag || !nome) {
    return res.status(400).send({
      message: "Os campos tag e nome são obrigatórios",
    });
  }

  dbClient
    .query(
      `INSERT INTO vessels (
        tag,
        nome,
        fabricante,
        modelo,
        numeroserie,
        volume,
        pressaotrabalho,
        pressaoprojeto,
        temperaturaprojeto,
        fluido,
        material,
        anofabricacao,
        localizacao,
        datainspecao,
        proximainspecao,
        imagem,
        observacoes,
        user_id
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9,
        $10, $11, $12, $13, $14, $15, $16, $17, $18
      )
      RETURNING
        id,
        tag,
        nome,
        fabricante,
        modelo,
        numeroserie,
        volume,
        pressaotrabalho,
        pressaoprojeto,
        temperaturaprojeto,
        fluido,
        material,
        anofabricacao,
        localizacao,
        datainspecao,
        proximainspecao,
        imagem,
        observacoes,
        user_id,
        created_at`,
      [
        tag,
        nome,
        fabricante,
        modelo,
        numeroserie,
        volume,
        pressaotrabalho,
        pressaoprojeto,
        temperaturaprojeto,
        fluido,
        material,
        anofabricacao,
        localizacao,
        datainspecao,
        proximainspecao,
        imagem,
        observacoes,
        user_id,
      ],
    )
    .then((result) => {
      return res.status(201).send({
        message: "Vaso criado com sucesso",
        vessel: result.rows[0],
      });
    })
    .catch((error) => {
      console.error("Erro ao criar vaso:", error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    });
}
export function deleteVessel(req, res) {
  const { id } = req.params;
  const userId = req.user.id;

  dbClient
    .query("DELETE FROM vessels WHERE id = $1 AND user_id = $2 RETURNING *", [
      id,
      userId,
    ])
    .then((result) => {
      if (result.rowCount === 0) {
        return res
          .status(404)
          .send({ message: "Vaso não encontrado ou sem permissão" });
      }

      return res.status(200).send({
        message: "Vaso removido com sucesso",
        vessel: result.rows[0],
      });
    })
    .catch((error) => {
      console.error("Erro ao deletar vaso:", error);
      res.status(500).send({ message: "Erro interno do servidor" });
    });
}
