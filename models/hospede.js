import conexao from '../config/conexao.js'

const Hospede = conexao.Schema({
    nome: { type: String, required: true },
    cpf: { type: String, required: true },
    telefone: { type: String, required: true },
    email: { type: String, required: true }
})

export default conexao.model('Hospede', Hospede)