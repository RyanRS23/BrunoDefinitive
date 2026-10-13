
import { con } from "./connection.js";

export async function criarFamilia(usuario_id, nome, valor, data) {
    const sql = `
        INSERT INTO familia (usuario_id, nome, valor, data)
        VALUES (?, ?, ?, ?)
    `;

    const [resultado] = await con.query(sql, [
        usuario_id, nome, valor, data
    ]);

    return resultado.insertId;
}

export async function listarFamilia(usuario_id, permissao) {
    const sql = permissao === "admin"
        ? `SELECT * FROM familia ORDER BY data DESC, id DESC`
        : `SELECT * FROM familia
           WHERE usuario_id = ?
           ORDER BY data DESC, id DESC`;

    const [dados] = permissao === "admin"
        ? await con.query(sql)
        : await con.query(sql, [usuario_id]);

    return dados;
}

export async function buscarFamiliaPorId(id) {
    const [dados] = await con.query(
        "SELECT * FROM familia WHERE id = ?",
        [id]
    );

    return dados[0] || null;
}

export async function editarFamilia(id, nome, valor, data) {
    const [resultado] = await con.query(
        `UPDATE familia
         SET nome = ?, valor = ?, data = ?
         WHERE id = ?`,
        [nome, valor, data, id]
    );

    return resultado.affectedRows;
}

export async function excluirFamilia(id) {
    const [resultado] = await con.query(
        "DELETE FROM familia WHERE id = ?",
        [id]
    );

    return resultado.affectedRows;
}
