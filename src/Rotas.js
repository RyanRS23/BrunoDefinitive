
import livrariaController
    from "./controller/livrariaController.js";

import clienteController
    from "./controller/clienteController.js";

import {
    login
} from "./controller/usuarioController.js";

import {
    criarEntrada,
    listarEntradas,
    editarEntrada,
    excluirEntrada
} from "./controller/diarioController.js";

import familiaController
    from "./controller/familiaController.js";


export default function rotear(api) {

    api.use(livrariaController);

    api.use(clienteController);

    api.use(familiaController);


    api.post(
        "/login",
        login
    );


    api.post(
        "/diario",
        criarEntrada
    );


    api.get(
        "/diario",
        listarEntradas
    );


    api.put(
        "/diario/:id",
        editarEntrada
    );


    api.delete(
        "/diario/:id",
        excluirEntrada
    );

}
