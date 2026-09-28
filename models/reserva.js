import conexao from '../config/conexao.js'

const Reserva = conexao.Schema({
    hospede: { type: conexao.Types.ObjectId, ref: 'Hospede', required: false },
    quarto: { type: conexao.Types.ObjectId, ref: 'Quarto', required: false },
    funcionario: { type: conexao.Types.ObjectId, ref: 'Funcionario', required: false },
    tipoQuarto: { type: String, required: true },
    dataEntrada: { type: Date, required: true },
    dataSaida: { type: Date, required: true },
    foto: {
        type: Buffer,
        get: (valor) => {
            if (!valor) return null;
            return `data:image/png;base64,${valor.toString('base64')}`;
        }
    }
})

export default conexao.model('Reserva', Reserva)
