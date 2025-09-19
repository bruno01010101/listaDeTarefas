const valor = document.querySelector('#novaTarefa')
const elementos = document.querySelector('#elementos')

function criaTarefa(texto){
    const lista = document.createElement('li');
    const apagar = document.createElement('button');
    apagar.textContent = 'apagar'
    apagar.classList.add('butao')
    lista.textContent = texto;
    elementos.appendChild(lista)
    lista.appendChild(apagar)
    limpaInput(valor)
    salvarTarefa();
}

function limpaInput(tarfea){
    tarfea.value = ''
    valor.focus()
}

function salvarTarefa(){
    const liTarefas = elementos.querySelectorAll('li') 
    const listaDeTarefas = [];
    for (let i of liTarefas){
        let tarefaTexto = i.innerText
        tarefaTexto = tarefaTexto.replace('apagar', '')
        listaDeTarefas.push(tarefaTexto)
    }

    const tarefasJson = JSON.stringify(listaDeTarefas);
    localStorage.setItem('tarefas', tarefasJson);
}

function adicionaTarefasSalvas(){
    const tarefas = localStorage.getItem('tarefas');
    const listaDeTarefas = JSON.parse(localStorage.getItem('tarefas') || '[]');
    for (let tarefinha of listaDeTarefas){
        criaTarefa(tarefinha)
    }
}
adicionaTarefasSalvas();

document.addEventListener('click', function(e){
    const elemento = e.target
    if (elemento.classList.contains('adiciona')){
        if (!valor.value) return;
        criaTarefa(valor.value)
    }
    
    if (elemento.classList.contains('butao')){
        elemento.parentElement.remove();
        salvarTarefa();
    }
})

valor.addEventListener('keydown', function(e){
    if (!valor.value) return;
    const elemento = e.code
    if (elemento === 'Enter'){
        criaTarefa(valor.value)
    }
})
