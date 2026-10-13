
import * as repository from "../repository/familiaRepository.js";

function validarData(data) {
    const hoje = new Date();
    const dataAtual = [
        hoje.getFullYear(),
        String(hoje.getMonth() + 1).padStart(2, "0"),
        String(hoje.getDate()).padStart(2, "0")
    ].join("-");

    if (data && data > dataAtual) {
        throw new Error("Não é permitido usar datas futuras.");
    }

    return data || dataAtual;
}

export async function criarFamilia(usuario_id, nome, valor, data) {
    if (!usuario_id) throw new Error("Usuário obrigatório.");
    if (!nome || !nome.trim()) throw new Error("Informe o nome.");
    if (valor === undefined || valor === null || valor === "") {
        throw new Error("Informe o valor.");
    }

    if (!Number.isFinite(Number(valor)) || Number(valor) < 0) {
        throw new Error("Valor inválido.");
    }

    data = validarData(data);

    return await repository.criarFamilia(
        usuario_id, nome.trim(), Number(valor), data
    );
}

export async function listarFamilia(usuario_id, permissao) {
    return await repository.listarFamilia(usuario_id, permissao);
}

export async function buscarFamiliaPorId(id) {
    return await repository.buscarFamiliaPorId(id);
}

export async function editarFamilia(id, nome, valor, data) {
    if (!nome || !nome.trim()) throw new Error("Informe o nome.");

    if (valor === undefined || valor === null || valor === "") {
        throw new Error("Informe o valor.");
    }

    if (!Number.isFinite(Number(valor)) || Number(valor) < 0) {
        throw new Error("Valor inválido.");
    }

    data = validarData(data);

    return await repository.editarFamilia(
        id, nome.trim(), Number(valor), data
    );
}

export async function excluirFamilia(id) {
    return await repository.excluirFamilia(id);
}
