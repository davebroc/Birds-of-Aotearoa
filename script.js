fetchData();
let birds;

const statuses =
    [
        {
            threat_level: 0,
            status: 'Not Threatened',
            color: '#02a028'
        },
        {
            threat_level: 1,
            status: 'Naturally Uncommon',
            color: '#649a31'
        },
        {
            threat_level: 2,
            status: 'Relict',
            color: '#99cb68'
        },
        {
            threat_level: 3,
            status: 'Recovering',
            color: '#fecc33'
        },
        {
            threat_level: 4,
            status: 'Declining',
            color: '#fe9a01'
        },
        {
            threat_level: 5,
            status: 'Nationally Increasing',
            color: '#c26967'
        },
        {
            threat_level: 6,
            status: 'Nationally Vulnerable',
            color: '#9b0000'
        },
        {
            threat_level: 7,
            status: 'Nationally Endangered',
            color: '#660032'
        },
        {
            threat_level: 8,
            status: 'Nationally Critical',
            color: '#320033'
        },
        {
            threat_level: 9,
            status: 'Extinct',
            color: '#000000'
        },
        {
            threat_level: 10,
            status: 'Data Deficient',
            color: '#000000'
        },
    ];
createStatusKeyElements();


const sortAZ = (x, y) => {
    let a = x.primary_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let b = y.primary_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return (a == b ? 0 : a > b ? 1 : -1);
}
const sortZA = (x, y) => {
    let b = x.primary_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let a = y.primary_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return (a == b ? 0 : a > b ? 1 : -1);
}
const sortLeastThreat = (x, y) => {
    let a, b;
    statuses.forEach(obj => {
        if (obj.status === x.status)
            a = obj.threat_level;
        if (obj.status === y.status)
            b = obj.threat_level;
    });
    return (a == b ? 0 : a > b ? 1 : -1);
}
const sortMostThreat = (x, y) => {
    let a, b;
    statuses.forEach(obj => {
        if (obj.status === x.status)
            b = obj.threat_level;
        if (obj.status === y.status)
            a = obj.threat_level;
    });
    return (a == b ? 0 : a > b ? 1 : -1);
}

const sortLightest = (x, y) => {
    return x.size.weight.value - y.size.weight.value;
}
const sortHeaviest = (x, y) => {
    return y.size.weight.value - x.size.weight.value;
}
const sortSmallest = (x, y) => {
    return x.size.length.value - y.size.length.value;
}
const sortLargest = (x, y) => {
    return y.size.length.value - x.size.length.value;
}
const sortFunctions = new Map();
sortFunctions.set('A-Z', sortAZ);
sortFunctions.set('Z-A', sortZA);
sortFunctions.set('Least Threatened', sortLeastThreat);
sortFunctions.set('Most Threatened', sortMostThreat);
sortFunctions.set('Lightest', sortLightest);
sortFunctions.set('Heaviest', sortHeaviest);
sortFunctions.set('Smallest', sortSmallest);
sortFunctions.set('Largest', sortLargest);


// clearButton.addEventListener("click", e => {
//     searchInput.value = "";
//     statusFilter.value = "All";
//     sortby.value = "A-Z";

//     filterButton.click();
// });

const searchInput = document.querySelector('[data-search]');
const filterButton = document.querySelector('#filter-button');

searchInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        filterButton.click();
    }
});


filterButton.addEventListener('click', e => {
    const searchInput = document.querySelector('[data-search]');
    const searchValue = searchInput.value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const statusFilter = document.querySelector('#conservation-selector');
    const statusValue = statusFilter.value;
    const isStatusAll = statusValue === "All";

    const sortby = document.querySelector('#sortby');
    birds.sort(sortFunctions.get(sortby.value));

    const countLabel = document.querySelector('#results-counter');

    let i, count = 0;
    birds.forEach(bird => {
        const isSearched = bird.primary_name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(searchValue) || bird.english_name.toLowerCase().includes(searchValue) || bird.scientific_name.toLowerCase().includes(searchValue) || bird.family.toLowerCase().includes(searchValue) || bird.order.toLowerCase().includes(searchValue);
        const isStatus = bird.status.includes(statusValue) || isStatusAll;

        const isVisible = isStatus && isSearched;
        bird.articleElement.classList.toggle('hide', !isVisible);

        bird.articleElement.style.order = i++;
        if (isVisible) count++;
    });
    const labelString = count === 1 ? " result" : " results";
    countLabel.innerHTML = count.toString().concat(labelString);
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function createStatusKeyElements() {
    const statusTable = document.querySelector('#status-table');

    statuses.forEach(obj => {
        const circle = document.createElement('dt');
        const label = document.createElement('dd');

        circle.setAttribute('class', 'circle-key');

        circle.style.backgroundColor = obj.color;
        label.innerHTML = obj.status;

        statusTable.append(circle);
        statusTable.append(label);

    });

}



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
    statuses.forEach(obj => {
        if (obj.status === bird.status) {
            circleInner.style.backgroundColor = obj.color;
            return;
        }

    });

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

        // } else if ((key === 'family' || key === 'order')) {

        //     const valueLink = document.createElement('a');
        //     valueLink.addEventListener('click', e => {
        //         searchInput.value = data[key];
        //         filterButton.click();
        //     });

        //     valueLink.innerHTML = data[key];
        //     keyLine.innerHTML = key[0].toUpperCase().bold() + key.replaceAll('_', ' ').substring(1).bold();
        //     valueLine.append(valueLink);

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
            filterButton.click();


        }) // use the data





        .catch(error => console.error(error)) // error handling
}
