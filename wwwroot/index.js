let idCount = 1;

function addNota() {
    const notasDiv = document.querySelector('.notas');
    const notaDiv = document.createElement('div');
    const titleText = document.createElement('textarea');
    const descriptionText = document.createElement('textarea');
    const saveButton = document.createElement('a');
    const saveButtonImg = document.createElement('img');
    const removeButton = document.createElement('a');
    const removeButtonImg = document.createElement('img');

    notaDiv.id = idCount++;
    notaDiv.classList.add('nota');
    titleText.placeholder = 'Title';
    titleText.id = 'note-title';
    titleText.cols = 30;
    titleText.rows = 1;
    descriptionText.placeholder = 'Description';
    descriptionText.id = 'note-description';
    descriptionText.cols = 30;
    descriptionText.rows = 10;
    saveButton.id = 'note-button';
    saveButton.addEventListener('click', () => updateNota(notaDiv.id, titleText, descriptionText));
    saveButtonImg.src = './icons/save-regular.svg';
    removeButton.id = 'note-button';
    removeButton.addEventListener('click', () => removeNota(notaDiv.id));
    removeButtonImg.src = './icons/trash-alt-solid.svg';

    saveButton.appendChild(saveButtonImg);
    removeButton.appendChild(removeButtonImg);
    notaDiv.appendChild(titleText);
    notaDiv.appendChild(descriptionText);
    notaDiv.appendChild(saveButton);
    notaDiv.appendChild(removeButton);
    notasDiv.appendChild(notaDiv);

    createNota(titleText.value, descriptionText.value);
}
function createNota(title, description) {
    const createNotaURL = 'https://localhost:5001/nota';

    const notaModel = {
        title: title,
        description: description
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
}
function updateNota(id, _title, _description) {
    const updateNotaURL = `https://localhost:5001/nota/${id}`;

    const notaModel = {
        id: id,
        title: _title.value,
        description: _description.value
    }
    fetch(updateNotaURL, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(notaModel)
    })
    .catch(error => console.error('Não foi possível atualizar o item. ', error));
    console.log(id);
}
function removeNota(id) {
    const nota = document.getElementById(id);
    const deleteURL = `https://localhost:5001/nota/${id}`;

    fetch(deleteURL, {
        method: 'DELETE'
    })
    .catch(error => console.error('não foi possivel deletar o item.', error));
    nota.remove();
}
function GetAllItems() {
    const noteURL = `https://localhost:5001/nota`;

    fetch(noteURL)
        .then(response => response.json())
        .then(notas => showNota(notas))
        .catch(error => console.error('Não foi possivel ler os itens.', error));
    console.log('Notas lidas');
}
function showNota(notas) {
    const notasDiv = document.querySelector('.notas');
    
    notas.forEach(nota => {
        const notaDiv = document.createElement('div');
        const saveButton = document.createElement('a');
        const saveButtonImg = document.createElement('img');
        const removeButton = document.createElement('a');
        const removeButtonImg = document.createElement('img');
        
        const titleText = document.createElement('textarea');
        const descriptionText = document.createElement('textarea');

        notaDiv.id = idCount++;
        notaDiv.classList.add('nota');
        
        titleText.placeholder = 'Title';
        titleText.id = 'note-title';
        titleText.cols = 30;
        titleText.rows = 1;
        titleText.value = nota.title;
        descriptionText.placeholder = 'Description';
        descriptionText.id = 'note-description';
        descriptionText.cols = 30;
        descriptionText.rows = 10;
        descriptionText.value = nota.description;
        
        saveButton.id = 'note-button';
        saveButtonImg.src = './icons/save-regular.svg';
        removeButton.id = 'note-button';
        removeButtonImg.src = './icons/trash-alt-solid.svg';
        
        saveButton.addEventListener('click', () => updateNota(notaDiv.id, titleText, descriptionText));
        removeButton.addEventListener('click', () => removeNota(notaDiv.id));
        
        notaDiv.appendChild(titleText);
        notaDiv.appendChild(descriptionText);
        notaDiv.appendChild(saveButton);
        notaDiv.appendChild(removeButton);
        saveButton.appendChild(saveButtonImg);
        removeButton.appendChild(removeButtonImg);
        notasDiv.appendChild(notaDiv);
    });

}
GetAllItems();