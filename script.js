



function createBirdElement(bird) {
    const birdArticle = document.createElement('article');
    birdArticle.setAttribute('class', 'birdArticle');
    birdArticle.append(newImgElement('bird-main-img', bird));
    birdArticle.append(newBirdHeaderElement('bird-header', bird));
    birdArticle.append(newBirdTextElement('bird-textbox', bird));







    document.querySelector('#bird-content-container').prepend(birdArticle);
}

function newBirdHeaderElement(className, data) {
    const header = document.createElement('h3');
    header.innerHTML = data.english_name;
    header.setAttribute('class', 'article-header');

    return header;
}


function newBirdTextElement(className, data) {
    const textBox = document.createElement('div');
    textBox.setAttribute('class', className);

    const keybox = document.createElement('div');
    const valuebox = document.createElement('div');
    keybox.setAttribute('class', 'keybox');
    valuebox.setAttribute('class', 'valuebox');

    newDescriptionKeyValue(keybox, valuebox, 'scientific_name', data);
    newDescriptionKeyValue(keybox, valuebox, 'family', data);
    newDescriptionKeyValue(keybox, valuebox, 'order', data);
    newDescriptionKeyValue(keybox, valuebox, 'status', data);
    newDescriptionKeyValue(keybox, valuebox, 'length', data);
    newDescriptionKeyValue(keybox, valuebox, 'weight', data);



    textBox.append(keybox);
    textBox.append(valuebox);


    return textBox;
}

function newDescriptionKeyValue(keybox, valuebox, key, data) {
    const valueLine = document.createElement('p');
    const keyLine = document.createElement('p');

    if (key === 'length' || key === 'weight') {
        valueLine.innerHTML = data.size[key].value + ' ' + data.size[key].units;
        keyLine.innerHTML = key[0].toUpperCase().bold() + key.replaceAll('_', ' ').substring(1).bold();

    } else {
        valueLine.innerHTML = data[key];
        keyLine.innerHTML = key[0].toUpperCase().bold() + key.replaceAll('_', ' ').substring(1).bold();
    }

    keybox.append(keyLine);
    valuebox.append(valueLine);

}











function newImgElement(className, data) {
    const e = document.createElement('img');
    e.setAttribute('class', className);
    e.setAttribute('src', data.photo.source);
    return e;
}


function fetchData() {
    // fetch('http://127.0.0.1:5500/nzbird.json') // fetch data from API
    fetch('./data/nzbird.json') // fetch data from API
        .then(response => response.json()) // parse to JSON
        .then(data => {
            console.log(data)
            for (bird of data) {
                createBirdElement(bird);
            }


        }) // use the data





        .catch(error => console.error(error)) // error handling
}
fetchData();