//importar o Model
import Quarto from '../models/quarto.js'

export default class QuartoController {

    constructor(caminhoBase = 'quarto/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async (req, res) => {
            res.render(caminhoBase + "add")
        }
        this.add = async (req, res) => {
            //cria o Quarto

            await Quarto.create({
                numero: req.body.numero,
                andar: req.body.andar,
                status: req.body.status,
                hotel: req.body.hotel,
                tipoQuarto: req.body.tipoQuarto
            });
            res.redirect('/' + caminhoBase + 'add');
        }
        this.list = async (req, res) => {
            const resultado = await Quarto.find({})
            res.render(caminhoBase + 'lst', { Quartos: resultado })
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await Quarto.find({ status: { $regex: filtro, $options: "i" } })
            res.render(caminhoBase + 'lst', { Quartos: resultado })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const quarto = await Quarto.findById(id)
            res.render(caminhoBase + "edt", { Quarto: quarto })
        }

        this.edt = async (req, res) => {
            await Quarto.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async (req, res) => {
            await Quarto.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst');
        }

    }
}