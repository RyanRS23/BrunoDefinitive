import * as diarioService from "../services/services.js";
import { con } from "../repository/connection.js";

export async function criarEntrada(req, res) {
    try {
        const { usuario_id, data, texto } = req.body;

        const entrada = await diarioService.criarEntrada(
            usuario_id,
            data,
            texto
        );

        return res.status(201).json(entrada);
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function listarEntradas(req, res) {
    try {
        const { usuario_id, permissao } = req.query;

        const entradas = await diarioService.listarEntradas(
            usuario_id,
            permissao
        );

        return res.status(200).json(entradas);
    } catch (erro) {
        return res.status(400).json({
            mensagem: erro.message
        });
    }
}

export async function editarEntrada(req, res) {
    try {
        const { id } = req.params;
        const { usuario_id, data, texto } = req.body;

        if (!id || !usuario_id || !data || !texto?.trim()) {
            return res.status(400).json({
                mensagem: "Informe todos os campos."
            });
        }

        const hoje = new Date().toISOString().split("T")[0];

        if (data > hoje) {
            return res.status(400).json({
                mensagem: "Não é permitido usar uma data futura."
            });
        }

        const [resultado] = await con.execute(
            "UPDATE diario SET data = ?, texto = ? WHERE id = ? AND usuario_id = ?",
            [data, texto, id, usuario_id]
        );

        if (!resultado.affectedRows) {
            return res.status(404).json({
                mensagem: "Entrada não encontrada."
            });
        }

        return res.status(200).json({
            mensagem: "Entrada editada com sucesso."
        });
    } catch (erro) {
        return res.status(500).json({
            mensagem: erro.message
        });
    }
}

export async function excluirEntrada(req, res) {
    try {
        const { id } = req.params;
        const usuario_id = req.body.usuario_id;

        if (!id || !usuario_id) {
            return res.status(400).json({
                mensagem: "Informe o ID e o usuário."
            });
        }

        const [resultado] = await con.execute(
            "DELETE FROM diario WHERE id = ? AND usuario_id = ?",
            [id, usuario_id]
        );

        if (!resultado.affectedRows) {
            return res.status(404).json({
                mensagem: "Entrada não encontrada."
            });
        }

        return res.status(200).json({
            mensagem: "Entrada excluída com sucesso."
        });
    } catch (erro) {
        return res.status(500).json({
            mensagem: erro.message
        });
    }
}