document.addEventListener("DOMContentLoaded", function () {
    // atribuindo os elementos do HTML
    const entradaTextArea = document.getElementById("entrada");
    const botaoCriptografar = document.getElementById("botaoCriptografar");
    const botaoDescriptografar = document.getElementById("botaoDescriptografar");
    const painelSaida = document.getElementById("painelSaida");

    // deixando os botoes escondidos
    botaoCriptografar.hidden = true;
    botaoDescriptografar.hidden = true;

    // adicionando conteudo inicial no painel de saida: imagem e texto de aviso
    painelSaida.innerHTML = `
        <div class="texto_saida">
                <img class="imagem2" src="./assets/searching.svg"
                    alt="Imagem ilustrativa para mostrar que algo não foi encontrado">
                <div class="aviso">
                    <p><strong>Nenhuma Entrada Encontrada</strong></p>
                    <p>Digite um texto na caixa ao lado para criptografar/descriptografar uma mensagem</p>
                </div>
    `;

    // verificando se a area de entrada de texto possui caracteres ou nao
    entradaTextArea.addEventListener("input", function () {
        const textoEntrada = entradaTextArea.value.trim();
        if (/[^a-z\s]/.test(textoEntrada)) {
            // Remover caracteres não permitidos
            textoEntrada = textoEntrada.replace(/[^a-z\s]/g, '');
    
            // Atualizar o valor do textarea
            entradaTextArea.value = textoEntrada;
        }
    

        // se esta vazio: coloque a imagem e texto de aviso e deixe os botoes escondidos
        if (textoEntrada === "") {
            painelSaida.innerHTML = `
            <div class="texto_saida">
                <img class="imagem2" src="./assets/searching.svg"
                    alt="Imagem ilustrativa para mostrar que algo não foi encontrado">
                <div class="aviso">
                    <p><strong>Nenhuma Entrada Encontrada</strong></p>
                    <p>Digite um texto na caixa ao lado para criptografar/descriptografar uma mensagem</p>
                </div>
                `;

            botaoCriptografar.hidden = true;
            botaoDescriptografar.hidden = true;

            // se contem texto: mostrar aviso de aguardando selecionar funcao e mostrar botoes das funcionalidades
        } else {
            painelSaida.innerHTML = `
            <textarea id="saida" readonly>Aguardando Selecionar Função</textarea>
            `;

            botaoCriptografar.hidden = false;
            botaoDescriptografar.hidden = false;
            botaoCriptografar.disabled = false;
            botaoDescriptografar.disabled = false;
        }
    });

    // funcao para criptografar texto segundo a regra
    function criptografarTexto(texto) {
        const criptografia = {
            'e': 'enter',
            'i': 'imes',
            'a': 'ai',
            'o': 'ober',
            'u': 'ufat'
        };

        let textoCriptografado = '';
        const vogais = 'aeiou';

        for (let i = 0; i < texto.length; i++) {
            const char = texto[i];
            if (vogais.includes(char)) {
                textoCriptografado += criptografia[char] || char;
            } else {
                textoCriptografado += char;
            }
        }

        return textoCriptografado;
    }

    // funcao para descriptografar texto segundo a regra
    function descriptografarTexto(textoCriptografado) {
        const descriptografia = {
            'enter': 'e',
            'imes': 'i',
            'ai': 'a',
            'ober': 'o',
            'ufat': 'u'
        };

        // se no texto do usuario conter as concatenacoes da regra, substituir globalmente pela regra de descriptografia
        const textoDescriptografado = textoCriptografado.replace(/(enter|imes|ai|ober|ufat)/g, match => descriptografia[match] || match);
        return textoDescriptografado;
    }

    // funcao para copiar o texto apos selecionar uma das duas funcionalidades
    function copiar() {
        const botaoCopiar = document.getElementById("botaoCopiar");
        const textoSaida = document.getElementById("saida");

        botaoCopiar.addEventListener("click", function () {
            textoSaida.select();
            document.execCommand("copy");
        });
    }

    // chama a funcao de criptografia quando o botao de criptografia eh clicado
    botaoCriptografar.addEventListener("click", function () {
        let textoEntrada = entradaTextArea.value.trim();
        textoEntrada = criptografarTexto(textoEntrada);
        console.log(textoEntrada);

        painelSaida.innerHTML = `
            <textarea id="saida" readonly>${textoEntrada}</textarea>
            <div class="botoes">
                <button class="botao3" id="botaoCopiar">Copiar</button>
            </div>
            `;

        copiar();
    });

    // chama a funcao de descriptografia quando o botao de descriptografia eh clicado
    botaoDescriptografar.addEventListener("click", function () {
        let textoEntrada = entradaTextArea.value.trim();
        textoEntrada = descriptografarTexto(textoEntrada);

        painelSaida.innerHTML = `
            <textarea id="saida" readonly>${textoEntrada}</textarea>
            <div class="botoes">
                <button class="botao3" id="botaoCopiar">Copiar</button>
            </div>
            `;

        copiar();
    });
});
