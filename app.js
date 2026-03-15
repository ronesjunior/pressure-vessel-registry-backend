import "dotenv/config";
import express from "express"; // importa o módulo/biblioteca express
import dbClient from "./db/db.js";
import userRoute from "./routes/user.js";
import vesselRoute from "./routes/vessel.js";

const app = express(); // chama a função express() contida na biblioteca express para usar os métodos contidos nela, como app.listen() e app.use()

const port = process.env.PORT || 3000;

dbClient
  .connect()
  .then(() => {
    console.log("Conectado ao PostgreSQL");

    app.listen(port, () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no PostgreSQL:", err);
  });

app.use(express.json());

app.use("/user", userRoute);

app.use("/vessel", vesselRoute);
