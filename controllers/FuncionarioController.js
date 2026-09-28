//importar o Model
import Funcionario from '../models/funcionario.js'

export default class FuncionarioController {

    constructor(caminhoBase = 'funcionario/') {
        this.caminhoBase = caminhoBase

        this.openAdd = async (req, res) => {
            res.render(caminhoBase + "add")
        }
        this.add = async (req, res) => {
            //cria o Funcionario

            await Funcionario.create({
                nome: req.body.nome,
                cpf: req.body.cpf,
                cargo: req.body.cargo,
                telefone: req.body.telefone
            });
            res.redirect('/' + caminhoBase + 'add');
        }
        this.list = async (req, res) => {
            const resultado = await Funcionario.find({})
            res.render(caminhoBase + 'lst', { Funcionarios: resultado })
        }
        this.find = async (req, res) => {
            const filtro = req.body.filtro;
            const resultado = await
                Funcionario.find({
                    nome: {
                        $regex: filtro,
                        $options: "i"
                    }
                })
            res.render(caminhoBase + 'lst', { Funcionarios: resultado })
        }

        this.openEdt = async (req, res) => {
            const id = req.params.id
            const funcionario = await Funcionario.findById(id)
            res.render(caminhoBase + "edt", { Funcionario: funcionario })
        }

        this.edt = async (req, res) => {
            await Funcionario.findByIdAndUpdate(req.params.id, req.body)
            res.redirect('/' + caminhoBase + 'lst');
        }

        this.del = async (req, res) => {
            await Funcionario.findByIdAndDelete(req.params.id)
            res.redirect('/' + caminhoBase + 'lst');
        }

    }
}
