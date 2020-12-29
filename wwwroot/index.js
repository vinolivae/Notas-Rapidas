let idCount = 0;

function GetAllItems() {
    const param = new URLSearchParams(window.location.search);
    const noteURL = `https://localhost:5001/nota/`;

    fetch(noteURL)
    .then(response => response.json())
    .then(notas => {
        notas.forEach(nota => showNota(nota))
    })
    .catch(error => console.error('Não foi possivel ler os itens.', error));

    console.log('Notas lidas');
}
GetAllItems();
function showNota(nota) {
    const notaDiv = document.createElement('div');
    const titleText = document.createElement('textarea');
    const descriptionText = document.createElement('textarea');
    
    notaDiv.classList.add('nota');

    notaDiv.appendChild(titleText);
    notaDiv.appendChild(descriptionText);
    document.querySelector('.notas').appendChild(notaDiv);
}
function removeNota(id){
    const nota = document.getElementById(id);
    const deleteURL = `https://localhost:5001/nota/${id}`;

    fetch(deleteURL, {
        method: 'DELETE'
    })
    .catch(error => console.error('não foi possivel deletar o item.', error));

    nota.remove();
}
function createNota(_title, _description) {
    const createNotaURL = 'https://localhost:5001/nota';

    const notaModel = {
        title: _title.value,
        description: _description.value
    }

    fetch(createNotaURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notaModel)
    })
    .then(response => response.json())
    .catch(error => console.error('Não foi possível criar o item. ', error));

    console.log('Nota criada');
}
function addNota() {
    const notasDiv = document.querySelector('.notas');
    const notaDiv = document.createElement('div');
    const titleText = document.createElement('textarea');
    const descriptionText = document.createElement('textarea');
    const editButton = document.createElement('a');
    const editButtonImg = document.createElement('img');
    const removeButton = document.createElement('a');
    const removeButtonImg = document.createElement('img');

    notaDiv.id = idCount++;
    notaDiv.classList.add('nota');
    titleText.placeholder = 'Title';
    titleText.id = 'note-text';
    titleText.cols = 30;
    titleText.rows = 1;
    descriptionText.placeholder = 'Description';
    descriptionText.id = 'note-text';
    descriptionText.cols = 30;
    descriptionText.rows = 10;
    editButton.id = 'note-button';
    removeButton.id = 'note-button';
    removeButton.addEventListener('click', () => removeNota(notaDiv.id));
    editButtonImg.src = './icons/edit-solid.svg';
    removeButtonImg.src = './icons/trash-alt-solid.svg';

    editButton.appendChild(editButtonImg);
    removeButton.appendChild(removeButtonImg);
    notaDiv.appendChild(titleText);
    notaDiv.appendChild(descriptionText);
    notaDiv.appendChild(editButton);
    notaDiv.appendChild(removeButton);
    notasDiv.appendChild(notaDiv);
}