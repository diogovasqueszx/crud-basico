import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import routes from './routes/route.js'; // rotas externas
import hospedeRoutes from './routes/HospedeRoutes.js'; // rotas externas
import quartoRoutes from './routes/QuartoRoutes.js'; // rotas externas
import funcionarioRoutes from './routes/FuncionarioRoutes.js'; // rotas externas
import reservaRoutes from './routes/ReservaRoutes.js'; // rotas externas

const PORT = 3000
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

// Servir arquivos estáticos
app.use(express.static(join(__dirname, '/public')));
app.set('views', join(__dirname, '/views'));

// Rotas
app.use(hospedeRoutes)
app.use(quartoRoutes)
app.use(funcionarioRoutes)
app.use(reservaRoutes)
app.use(routes)
app.listen(PORT, () => {
    console.log(
        `Servidor rodando em http://localhost:${PORT}`)
});

export default app;