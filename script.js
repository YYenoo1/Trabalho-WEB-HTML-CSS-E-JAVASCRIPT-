
document.getElementById("buscarCep").addEventListener("click", buscarCEP);

//função para limpar os campos preenchidos
function limparEndereco() {
    document.getElementById("logradouro").value = "";
    document.getElementById("bairro").value = "";
    document.getElementById("cidade").value = "";
    document.getElementById("estado").value = "";
}

//função principal
async function buscarCEP() {

    // recupera o CEP digitado
    const cep = document.getElementById("cep").value.trim().replace("-", "");

    const mensagem = document.getElementById("mensagem");

    //limpa mensagens anteriores
    mensagem.textContent = "";

    //verifica se o CEP está vazio
    if (cep === "") {
        mensagem.textContent = "Por favor, informe um CEP.";
        limparEndereco();
        return;
    }

    //verifica se o CEP possui exatamente 8 números
    if (!/^\d{8}$/.test(cep)) {
        mensagem.textContent = "CEP inválido. Digite 8 números.";
        limparEndereco();
        return;
    }

    //tenta consultar a API
    try {

        const url = `https://viacep.com.br/ws/${cep}/json/`;

        const resposta = await fetch(url);

        //verifica se houve erro
        if (!resposta.ok) {
            throw new Error("Erro na resposta da API");
        }

        //transforma a resposta para JSON
        const dados = await resposta.json();

        console.log(dados);

        //verifica se o CEP existe
        if (dados.erro === true) {
            mensagem.textContent = "CEP não encontrado";
            limparEndereco();
            return;
        }

        //preenche automaticamente os campos
        document.getElementById("logradouro").value = dados.logradouro;
        document.getElementById("bairro").value = dados.bairro;
        document.getElementById("cidade").value = dados.localidade;
        document.getElementById("estado").value = dados.uf;

    } catch (erro) {

        //falhas de comunicação
        mensagem.textContent = "Não foi possível realizar a consulta.";
        limparEndereco();
        console.error(erro);

    }
}
