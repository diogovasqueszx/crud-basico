import conexao from '../config/conexao.js'

const Quarto = conexao.Schema({
    numero: { type: Number, required: true },
    andar: { type: Number, required: true },
    status: { type: String, required: true },
    hotel: { type: String, required: true },
    tipoQuarto: { type: String, required: true }
})

export default conexao.model('Quarto', Quarto)