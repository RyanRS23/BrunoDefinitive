import { con } from "./connection.js";

export async function criarEntrada(usuario_id, data, texto) {
    const sql = `
        INSERT INTO diario (usuario_id, data, texto)
        VALUES (?, ?, ?)
    `;

    const [resultado] = await con.execute(sql, [
        usuario_id,
        data,
        texto
    ]);

    return {
        id: resultado.insertId,
        usuario_id,
        data,
        texto
    };
}

export async function listarEntradas(usuario_id, permissao) {
    let sql;
    let valores = [];

    if (permissao === "admin") {
        sql = `
            SELECT *
            FROM diario
            ORDER BY data DESC
        `;
    } else {
        sql = `
            SELECT *
            FROM diario
            WHERE usuario_id = ?
            ORDER BY data DESC
        `;

        valores = [usuario_id];
    }

    const [entradas] = await con.execute(sql, valores);

    return entradas;
}