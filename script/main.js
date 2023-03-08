async function buscaEndereço (cep) {
    const mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = "";

    try {
        const consultaCep = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const consultaCepConvertida = await consultaCep.json();

        if (consultaCepConvertida.erro) {
            throw Error('CEP invalido');
        }

        let cidade = document.getElementById('cidade');
        let logradouro = document.getElementById('endereco');
        let estado = document.getElementById('estado');
        let bairro = document.getElementById('bairro');

        cidade.value = consultaCepConvertida.localidade;
        logradouro.value = consultaCepConvertida.logradouro;
        estado.value = consultaCepConvertida.uf;
        bairro.value = consultaCepConvertida.bairro;

        return consultaCepConvertida;
    } catch (err) {
        mensagemErro.innerHTML = `<p>CEP inválido!</p>`;

        console.error(err);
    }
}

const cep = document.getElementById('cep');
cep.addEventListener('focusout', (e) => buscaEndereço(e.target.value));