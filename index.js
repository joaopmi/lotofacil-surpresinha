document.getElementsByTagName('button')[0].addEventListener('click', (e) => {
    //VALIDA FORM
    const form = document.getElementById('form');
    if (!form) {
        alert('Erro. Atualize a página');
        return;
    }
    if (!form.checkValidity()) return;
    e.preventDefault();

    const qtdJogosInput = document.getElementById('qtdJogos');
    const qtdJogos = Number(qtdJogosInput?.value);
    if (!qtdJogosInput || !qtdJogos) return alert('Quantidade de jogos inválida');

    const qtdNumerosInput = document.getElementById('qtdNumeros');
    const qtdNumeros = Number(qtdNumerosInput?.value);
    if (!qtdNumerosInput || !qtdNumeros) return alert('Quantidade de números inválida');

    //INSERE MSG DE LOADING
    let msgLoading = document.getElementById('msg');
    if (!msgLoading) {
        form.insertAdjacentHTML('beforeend', '<span id="msg">Gerando jogos...</span>');
        msgLoading = document.getElementById('msg');
    }

    setTimeout(() => {

        //GERA OS JOGOS
        const matrizJogos = [];
        for (let i = 0; i < qtdJogos; i++) {
            const numerosValidos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
            const arrayJogo = [];
            for (let num = 0; num < qtdNumeros; num++) {
                const indiceNumero = Math.floor(Math.random() * numerosValidos.length);
                arrayJogo.push(numerosValidos[indiceNumero]);
                numerosValidos.splice(indiceNumero, 1);
            }
            matrizJogos.push(
                arrayJogo.sort((a, b) => a - b)
            );
        }

        //CRIA E CONFIGURA TABELA RESULTADO
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const trHead = document.createElement('tr');
        const thJogo = document.createElement('th');
        thJogo.innerText = "Jogo";
        trHead.appendChild(thJogo);
        for (let i = 0; i < qtdNumeros; i++) {
            const th = document.createElement('th');
            th.innerText = "Bola " + (i + 1);
            trHead.appendChild(th);
        }
        thead.appendChild(trHead);
        table.appendChild(thead);
        
        const tBody = document.createElement('tbody');
        for (let i = 0; i < matrizJogos.length; i++) {

            const trBody = document.createElement('tr');
            trBody.style.cursor = 'pointer';
            trBody.addEventListener('mouseenter', (e) => {
                const tr = e.target;
                tr.style.backgroundColor = '#19992f';
                tr.style.color = 'white';
            });
            trBody.addEventListener('mouseleave', (e) => {
                const tr = e.target;
                tr.style.backgroundColor = 'initial';
                tr.style.color = 'initial';
            });
            const tdJogo = document.createElement('td');
            tdJogo.addEventListener('click', (e) => {
                e.stopPropagation();
                const tr = e.target.parentElement;
                const numeros = [];
                const jogo = tr.children[0].innerText;
                for (let i = 1; i < tr.children.length; i++) {
                    numeros.push(
                        Number(tr.children[i].innerText)
                    );
                }
                navigator.clipboard.writeText(numeros.join(', '))
                    .then(r => alert('Jogo ' + jogo + " copiado:\n" + numeros))
                    .catch(e => console.log(e));
            })
            tdJogo.innerText = i + 1;
            trBody.appendChild(tdJogo);
            for (const numero of matrizJogos[i]) {
                const td = document.createElement('td');
                td.addEventListener('click', (e) => {
                    e.stopPropagation();
                    const tr = e.target.parentElement;
                    const numeros = [];
                    const jogo = tr.children[0].innerText;
                    for (let i = 1; i < tr.children.length; i++) {
                        numeros.push(
                            Number(tr.children[i].innerText)
                        );
                    }
                    navigator.clipboard.writeText(numeros.join(', '))
                        .then(r => alert('Jogo ' + jogo + " copiado:\n" + numeros))
                        .catch(e => console.log(e));
                })
                td.innerText = numero;
                trBody.appendChild(td);
            }
            tBody.appendChild(trBody);

        }
        table.appendChild(tBody);
        table.setAttribute("border", "1");
        table.style.textAlign = "center";
        table.style.width = "100%";

        //INSERE TABELA NA TELA
        const sectionElement = document.getElementById('resultado');
        if (!sectionElement) return alert('Erro. Atualize a página');
        sectionElement.innerHTML = '';
        sectionElement.appendChild(table);

        //REMOVE MSG DE LOADING
        msgLoading?.remove();
    }, 0);
});