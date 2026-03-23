import "dotenv/config";
import express from "express";
import cors from "cors";
import { errors } from "celebrate";
import dbClient from "./db/db.js";
import userRoute from "./routes/user.js";
import vesselRoute from "./routes/vessel.js";
import { requestLogger, errorLogger } from "./middlewares/logs.js";
import error from "./middlewares/error.js";

const app = express();
const port = process.env.PORT || 3000;

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://pressure-vessel-registry-frontend.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// middlewares gerais
app.use(express.json());
app.use(requestLogger);

// rotas
app.use("/user", userRoute);
app.use("/vessel", vesselRoute);

// logs de erro
app.use(errorLogger);

// erros do celebrate
app.use(errors());

// tratador final de erros
app.use(error);

// conectar no banco e subir servidor
dbClient
  .connect()
  .then(() => {
    console.log("Conectado ao PostgreSQL");

    app.listen(port, "0.0.0.0", () => {
      console.log(`Servidor rodando na porta ${port}`);
    });
  })
  .catch((err) => {
    console.error("Erro ao conectar no PostgreSQL:", err);
  });
