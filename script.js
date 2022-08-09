fetchData();
let birds;


const statusColors = new Map();
statusColors.set('Not Threatened', '#02a028');
statusColors.set('Naturally Uncommon', '#649a31');
statusColors.set('Relict', '#99cb68');
statusColors.set('Recovering', '#fecc33');
statusColors.set('Declining', '#fe9a01');
statusColors.set('Nationally Increasing', '#c26967');
statusColors.set('Nationally Vulnerable', '#9b0000');
statusColors.set('Nationally Endangered', '#660032');
statusColors.set('Nationally Critical', '#320033');
statusColors.set('Extinct', '#000000');
statusColors.set('Data Deficient', '#000000');

const searchInput = document.querySelector('[data-search]');
searchInput.addEventListener("input", e => {
    const value = e.target.value.toLowerCase();

    birds.forEach(bird => {
        const isVisible = bird.primary_name.toLowerCase().includes(value) || bird.english_name.toLowerCase().includes(value) || bird.scientific_name.toLowerCase().includes(value) || bird.family.toLowerCase().includes(value) || bird.order.toLowerCase().includes(value);
        bird.articleElement.classList.toggle('hide', !isVisible);

    })



})






function createBirdElement(bird) {
    const birdArticle = document.createElement('article');
    birdArticle.setAttribute('class', 'birdArticle');
    birdArticle.append(newImgElement('bird-main-img', bird));
    birdArticle.append(newBirdHeaderElement('bird-header', bird));
    birdArticle.append(newBirdTextElement('bird-textbox', bird));

    document.querySelector('#bird-content-container').prepend(birdArticle);
    return birdArticle;
}

function newCircleOverlayElement(className, bird) {
    const circleOuter = document.createElement('span');
    circleOuter.setAttribute('class', className);

    const circleInner = document.createElement('span');
    circleInner.setAttribute('class', 'circle-status');
    circleInner.style.backgroundColor = statusColors.get(bird.status);

    circleOuter.append(circleInner);



    return circleOuter;
}

function newBirdHeaderElement(className, data) {
    const header = document.createElement('h3');
    header.innerHTML = data.english_name;
    header.setAttribute('class', 'article-header');

    return header;
}



function newImageOverlayElement(className, data) {
    const container = document.createElement('div');
    const name = document.createElement('h2');
    const credit = document.createElement('h4');

    name.innerHTML = data.primary_name;
    name.setAttribute('class', 'overlay-name');
    credit.innerHTML = "Photo by " + data.photo.credit;
    credit.setAttribute('class', 'overlay-credit');
    container.setAttribute('class', className);

    container.append(name);
    container.append(credit);

    return container;
}


function newImgElement(className, data) {
    const container = document.createElement('div');
    const img = document.createElement('img');
    img.setAttribute('class', className);
    img.setAttribute('src', data.photo.source);
    img.setAttribute('alt', data.english_name);
    container.setAttribute('class', 'overlay-container');

    container.append(img);
    container.append(newCircleOverlayElement('circle-overlay', bird));
    container.append(newImageOverlayElement('bird-img-text', bird));

    return container;
}





function newBirdTextElement(className, data) {
    const textBox = document.createElement('dl');
    textBox.setAttribute('class', className);


    newDescriptionKeyValue(textBox, 'scientific_name', data);
    newDescriptionKeyValue(textBox, 'family', data);
    newDescriptionKeyValue(textBox, 'order', data);
    newDescriptionKeyValue(textBox, 'status', data);
    newDescriptionKeyValue(textBox, 'weight', data);
    newDescriptionKeyValue(textBox, 'length', data);

    return textBox;
}

function newDescriptionKeyValue(textBox, key, data) {
    const valueLine = document.createElement('dd');
    const keyLine = document.createElement('dt');

    if (key === 'length' || key === 'weight') {
        valueLine.innerHTML = data.size[key].value + ' ' + data.size[key].units;
        keyLine.innerHTML = key[0].toUpperCase().bold() + key.replaceAll('_', ' ').substring(1).bold();

    } else {
        valueLine.innerHTML = data[key];
        keyLine.innerHTML = key[0].toUpperCase().bold() + key.replaceAll('_', ' ').substring(1).bold();
    }

    textBox.append(keyLine);
    textBox.append(valueLine);

}














function fetchData() {
    // fetch('http://127.0.0.1:5500/nzbird.json') // fetch data from API
    fetch('./data/nzbird.json') // fetch data from API
        .then(response => response.json()) // parse to JSON
        .then(data => {

            for (bird of data) {
                bird.articleElement = createBirdElement(bird);
            }
            birds = data;


        }) // use the data





        .catch(error => console.error(error)) // error handling
}
