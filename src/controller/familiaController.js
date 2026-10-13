
import { Router } from "express";
import * as service from "../services/familiaService.js";

const endpoints = Router();

endpoints.post("/familia", async (req, resp) => {
    try {
        const { usuario_id, nome, valor, data } = req.body;

        const id = await service.criarFamilia(
            usuario_id, nome, valor, data
        );

        resp.status(201).send({ id });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.get("/familia", async (req, resp) => {
    try {
        const { usuario_id, permissao } = req.query;

        if (!usuario_id) {
            return resp.status(400).send({
                erro: "Informe o usuário."
            });
        }

        const dados = await service.listarFamilia(
            Number(usuario_id), permissao
        );

        resp.send(dados);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

endpoints.get("/familia/:id", async (req, resp) => {
    try {
        const dado = await service.buscarFamiliaPorId(
            Number(req.params.id)
        );

        if (!dado) {
            return resp.status(404).send({
                erro: "Registro não encontrado."
            });
        }

        resp.send(dado);
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

endpoints.put("/familia/:id", async (req, resp) => {
    try {
        const { nome, valor, data } = req.body;

        const qtd = await service.editarFamilia(
            Number(req.params.id), nome, valor, data
        );

        resp.send({ qtd });
    } catch (err) {
        resp.status(400).send({ erro: err.message });
    }
});

endpoints.delete("/familia/:id", async (req, resp) => {
    try {
        const qtd = await service.excluirFamilia(
            Number(req.params.id)
        );

        resp.send({ qtd });
    } catch (err) {
        resp.status(500).send({ erro: err.message });
    }
});

export default endpoints;
