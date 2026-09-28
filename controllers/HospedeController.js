//importar o Model
import Hospede from '../models/hospede.js'

export default class HospedeController {

    constructor(caminhoBase = 'hospede/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async (req, res) => {
            res.render(caminhoBase + "add")
        }
        this.add = async (req, res) => {
            //cria o Hospede

            await Hospede.create({
                nome: req.body.nome,
                cpf: req.body.cpf,
                telefone: req.body.telefone,
                email: req.body.email
            });
            res.redirect('/' + caminhoBase + 'add');
        }
        this.list = async (req, res) => {
            const resultado = await Hospede.find({})
            res.render(caminhoBase + 'lst', { Hospedes: resultado })
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await
                Hospede.find({
                    nome: {
                        $regex: filtro,
                        $options: "i"
                    }
                })
            res.render(caminhoBase + 'lst', { Hospedes: resultado })
        }



        this.openEdt = async (req, res) => {
            //passar quem eu quero editar
            const id = req.params.id
            console.log(id)
            const hospede = await Hospede.findById(id)
            console.log(hospede)
            res.render(caminhoBase + "edt",
                { Hospede: hospede })
        }


        this.edt = async (req, res) => {
            await Hospede.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/' + caminhoBase + 'lst');

        }

        this.del = async (req, res) => {
            await Hospede.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst');

        }

    }
}