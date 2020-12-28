function addNota() {
    const notasDiv = document.querySelector('.notas');
    const notaDiv = document.createElement('div');
    const titleText = document.createElement('textarea');
    const descriptionText = document.createElement('textarea');
    const editButton = document.createElement('a');
    const editButtonImg = document.createElement('img');
    const removeButton = document.createElement('a');
    const removeButtonImg = document.createElement('img');

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
    editButtonImg.src = './icons/edit-solid.svg';
    removeButtonImg.src = './icons/trash-alt-solid.svg';

    editButton.appendChild(editButtonImg);
    removeButton.appendChild(removeButtonImg);
    notaDiv.appendChild(titleText);
    notaDiv.appendChild(descriptionText);
    notaDiv.appendChild(editButton);
    notaDiv.appendChild(removeButton);
    notasDiv.appendChild(notaDiv);

    if(titleText < 3 && descriptionText < 1){
        editButton.style = 'cursor : not-allowed';
    }
    //createNota(_title, _description);
}

function createNota(_title, _description) {
    const createNotaURL = 'https://localhost:5001/nota';

    const notaModel = {
        title: _title,
        description: _description
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