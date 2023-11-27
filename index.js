import express from 'express';
import path from 'path';

const porta = 3000;
const host = '0.0.0.0';

var listaUsuarios = [];

function processarCadastroUsuario(requisicao, resposta) {
    const dados = requisicao.body;
    let conteudoResposta = '';
    if (!(dados.nome && dados.email && dados.assunto && dados.sms )) {
        conteudoResposta = `
        <!DOCTYPE html>
        <head>
            <meta charset="utf-8">
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        </head>

        <body>
            <div class="container">
                <form action='/cadastrarUsuario' method='POST' class="row g-3 needs-validation" novalidate>
                    <fieldset class="border p-2">
                    <legend class="mb-3">Cadastro de usuário</legend>
                    <div class="col-md-4">
                        <label for="" class="form-label">Nome</label>
                        <input type="text" class="form-control" id="nome" name="nome" value="${dados.nome}" required>
                    </div>
        `;
        if (!dados.nome) {
            conteudoResposta +=
                    `<div>
                        <p class="text-danger">Por favor, informe o nome!</p>
                    </div>`;
        }

        if (!dados.email) {
            conteudoResposta +=
                    `<div>
                        <p class="text-danger">Por favor, informe o seu email!</p>
                    </div>`;
        }
        conteudoResposta += `
                    <div class="col-md-4">
                        <label for="email"><strong>Email</strong></label>
                        <input type="email" name="email" id="email" required>
                        </div>
                    </div>
        `;
        if (!dados.assunto) {
            conteudoResposta +=
                    `<div>
                        <p class="text-danger">Falta informação neste campo!</p>
                    </div>`;
        }
        conteudoResposta += `
                    <div class="col-md-6">
                        <input type="text" id="assunto" name="assunto" class="input"  autocomplete="off" required="">
                        <label class="user-label" for="assunto">Assunto</label>
                    </div>;
                    `;
        if (!dados.sms) {
            conteudoResposta +=
                    `<div>
                        <p class="text-danger">Preencha esse campo!</p>
                    </div>`;
        
        conteudoResposta += `
                <div class="col-12 mt-2">
                label><strong>Conte um pouco da sua experiência:</strong></label>
                <textarea row="6" style="width: 26em" id="experiencia" nome="experiencia"></textarea>
                </div>
                </fieldset>
                </form>
            </div>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
            integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
            crossorigin="anonymous"></script>
        </body>
        </html>`;
        resposta.end(conteudoResposta);

    }
    else {
        const usuario = {
            nome: dados.nome,
            email: dados.email,
            assunto: dados.assunto,
            sms: dados.sms
        }
       
        listaUsuarios.push(usuario);
        conteudoResposta = `
    <!DOCTYPE html>
    <head>
        <meta charset="UTF-8">
        <title>Menu do sistema</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
    </head>
    <body>
        <h1>Lista de usuário cadastrados</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Email/th>
                    <th>Assunto</th>
                    <th>Mensagem</th>
                </tr>
            </thead>
            <tbody> `;

        for (const usuario of listaUsuarios) {
            conteudoResposta += `
                    <tr>
                        <td>${usuario.nome}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.assunto}</td>
                        <td>${usuario.sms}</td>
                    <tr>
                `;
        }

        conteudoResposta += `
            </tbody>
        </table>
        <a class="btn btn-primary" href="/" role="button">Menu</a>
        <a class="btn btn-primary" href="/cadastraUsuario.html" role="button">Continuar</a>
    </body>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-MrcW6ZMFYlzcLA8Nl+NtUVF0sA7MsXsP1UyJoMp4YLEuNSfAP+JcXn/tWtIaxVXM"
        crossorigin="anonymous"></script>

    </html>`;
        resposta.end(conteudoResposta);
    }
}

const app = express()
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(process.cwd(), 'paginas')));

app.get('/', (requisicao, resposta) => {
    resposta.end(`
        <!DOCTYPE html>
            <head>
                <meta charset="UTF-8">
                <title>Menu do sistema</title>
            </head>
            <body>
                <h1>MENU</h1>
                <ul>
                <li><a href="/cadastraUsuario.html">Cadastrar Usuário</a></li>
                </ul>
            </body>
        </html>
    `);
})
/
app.post('/cadastrarUsuario', processarCadastroUsuario);

app.listen(porta, host, () => {
    console.log(`Servidor executando na url http://${host}:${porta}`);
});