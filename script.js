



function createBirdElement(bird) {
    const birdArticle = document.createElement('article');
    birdArticle.setAttribute('class', 'birdArticle')
    birdArticle.append(newImgElement('bird-main-img', bird));
    birdArticle.append(newBirdTextElement('bird-textbox', bird));







    document.querySelector('#bird-content-container').prepend(birdArticle);
}

function newBirdTextElement(className, data) {
    const textBox = document.createElement('div');
    textBox.setAttribute('class', className);

    const header = document.createElement('h3');
    header.innerHTML = data.english_name;
    header.setAttribute('class', 'article-header');
    textBox.append(header);




    for (key in data) {
        const line = document.createElement('p');
        line.innerHTML = key.replaceAll('_', ' ') + ' ' + data[key];
        textBox.append(line);

    }



    return textBox;
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