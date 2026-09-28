import conexao from '../config/conexao.js'

const Quarto = conexao.Schema({
    numero: { type: Number, required: true },
    andar: { type: Number, required: true },
    status: { type: String, required: true },
    hotelId: { type: String, required: true },
    tipoQuartoId: { type: String, required: true }
})

export default conexao.model('Quarto', Quarto)