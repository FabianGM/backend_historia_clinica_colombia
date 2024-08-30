const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const db = require("./config/database.js");

dotenv.config();

const app = express();

(async () => {
    try {
        await db.sync();
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.error("Error synchronizing the models:", error);
    }
})();

console.log("Environment:", process.env.NODE_ENV);

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true 
}));

app.use(express.json());

// Usar las rutas
app.use(require("./routes/ruta-usuario.js"));
//app.use(require("./routes/PacienteRoute.js"));
app.use(require("./routes/ruta-autenticacion.js"));
//app.use(require("./routes/HistoriaClinicaRoute.js"));
//app.use(require("./routes/PaisRoute.js"));

// Manejo de errores
app.use((req, res, next) => {
    res.status(404).send('Not Found');
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
