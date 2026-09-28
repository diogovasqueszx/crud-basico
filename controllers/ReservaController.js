//importar o Model
import Reserva from '../models/reserva.js'
import Hospede from '../models/hospede.js'
import Quarto from '../models/quarto.js'
import Funcionario from '../models/funcionario.js'

export default class ReservaController {

    constructor(caminhoBase = 'reserva/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async (req, res) => {
            const hospedes = await Hospede.find({})
            const quartos = await Quarto.find({})
            const funcionarios = await Funcionario.find({})
            res.render(caminhoBase + "add", {
                Hospedes: hospedes,
                Quartos: quartos,
                Funcionarios: funcionarios
            })
        }
        this.add = async (req, res) => {
            //cria a Reserva

            let jhospede = null;
            if (req.body.hospede) {
                jhospede = await Hospede.findById(req.body.hospede)
            }
            let jquarto = null;
            if (req.body.quarto) {
                jquarto = await Quarto.findById(req.body.quarto)
            }
            let jfuncionario = null;
            if (req.body.funcionario) {
                jfuncionario = await Funcionario.findById(req.body.funcionario)
            }

            let fotoEnviada
            if (req.file != null) {
                fotoEnviada = req.file.buffer
            } else {
                fotoEnviada = null
            }

            await Reserva.create({
                hospede: jhospede,
                quarto: jquarto,
                funcionario: jfuncionario,
                tipoQuarto: req.body.tipoQuarto,
                dataEntrada: req.body.dataEntrada,
                dataSaida: req.body.dataSaida,
                foto: fotoEnviada
            });
            res.redirect('/' + caminhoBase + 'add');
        }
        this.list = async (req, res) => {
            const resultado = await Reserva.find({})
                .populate('hospede')
                .populate('quarto')
                .populate('funcionario')
            res.render(caminhoBase + 'lst', { Reservas: resultado })
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await
                Reserva.find({
                    tipoQuarto: {
                        $regex: filtro,
                        $options: "i"
                    }
                })
                .populate('hospede')
                .populate('quarto')
                .populate('funcionario')
            res.render(caminhoBase + 'lst', { Reservas: resultado })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const reserva = await Reserva.findById(id)
            const hospedes = await Hospede.find({})
            const quartos = await Quarto.find({})
            const funcionarios = await Funcionario.find({})
            res.render(caminhoBase + "edt", {
                Reserva: reserva,
                Hospedes: hospedes,
                Quartos: quartos,
                Funcionarios: funcionarios
            })
        }

        this.edt = async (req, res) => {
            let jhospede = req.body.hospede ? await Hospede.findById(req.body.hospede) : null;
            let jquarto = req.body.quarto ? await Quarto.findById(req.body.quarto) : null;
            let jfuncionario = req.body.funcionario ? await Funcionario.findById(req.body.funcionario) : null;

            let fotoEnviada
            if (req.file != null) {
                fotoEnviada = req.file.buffer
            } else {
                fotoEnviada = null
            }

            await Reserva.findByIdAndUpdate(req.params.id, {
                hospede: jhospede,
                quarto: jquarto,
                funcionario: jfuncionario,
                tipoQuarto: req.body.tipoQuarto,
                dataEntrada: req.body.dataEntrada,
                dataSaida: req.body.dataSaida,
                foto: fotoEnviada
            })
            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async (req, res) => {
            await Reserva.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst');
        }

    }
}
