const form = document.querySelector('#search');
const mainSearch = document.querySelector('.mainSearch');
const mainDiv = document.querySelector('#mainContainer');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    deleteImg();
    const search = this.elements.query.value;
    const res = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${search}`);
    const resBack = res.data.results;
    displayImg(resBack);
    form.elements.query.value = '';
    mainSearch.classList.remove('bund');
    deleteRes(search);
    showingRes(search);
})

// function displayImg(shows) {
//     for (let results of shows) {
//         if (results.image_url) {
//             const div = document.createElement('div');
//             div.classList.add('card');
//             const img = document.createElement('img');
//             let h1 = document.createElement('h1');
//             img.src = results.image_url;
//             h1.innerText = results.title;
//             div.append(img);
//             div.append(h1);
//             mainDiv.append(div);
//         }
//     }
// }

function displayImg(shows) {
    if (shows.length > 1) {
        for (let i = 0; i < shows.length; i++) {
                const div = document.createElement('div');
                div.classList.add('card');
                const img = document.createElement('img');
                let h1 = document.createElement('h1');
                img.src = shows[i].image_url;
                h1.innerText = shows[i].title;
                let mal_id = shows[i].mal_id;
                div.showId = mal_id;
                div.append(img);
                div.append(h1);
                mainDiv.append(div);
        }
    } else {
        const div = document.createElement('div');
        div.classList.add('cardSelected');
        const img = document.createElement('img');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        let button = document.createElement('button');
        button.innerText = 'Find Similar Anime';
        button.classList.add('recommend');
        img.src = shows.image_url;
        h1.innerText = shows.title;
        p.innerText = 
        `Synopsis:
        
        ${shows.synopsis}`;
        div.append(p);
        div.append(img);
        div.append(button);
        div.append(h1);
        mainDiv.append(div);
        recommend();
        return
    }
    select();
}

function deleteImg() {
    let imgTotal = document.querySelectorAll('.card');
    let imgTotals = document.querySelectorAll('.cardSelected')
    for (let i = 0; i < imgTotal.length; i++) {
        imgTotal[i].remove();
    }
    for (let i = 0; i < imgTotals.length; i++) {
        imgTotals[i].remove();
    }
}

function deleteSearch() {
    mainSearch.remove();
}

let selectedShowId = 0;

function select() {
    let cardTotal = document.querySelectorAll('.card');
    let cardtotals = document.querySelectorAll('.cardSelected')
    for(let res of cardTotal) {
        res.addEventListener('click', function () {
            selectedShowId = this.showId;
            deleteImg();
            deleteRes();
        })
        res.addEventListener('click', function () {
            displayInfo();
        })
    }
    for(let res of cardtotals) {
        res.addEventListener('click', function () {
            selectedShowId = this.showId;
            deleteImg();
        })
        res.addEventListener('click', function () {
            displayInfo();
        })
    }
}

recommend = function () {
    let recButton = document.querySelector('.recommend');
    recButton.addEventListener('click', () => {
                searchRecommend();
                deleteImg();
            })
}

searchRecommend = async () => {
    const res = await axios.get(`https://api.jikan.moe/v3/anime/${selectedShowId}/recommendations`);
    const resBack = res.data.recommendations;
    displayImg(resBack);
}

displayInfo = async () => {
    const res = await axios.get(`https://api.jikan.moe/v3/anime/${selectedShowId}`);
    const resBack = res.data;
    displayImg(resBack);
}

showingRes = function (search) {
    let h2 = document.createElement('h2');
    h2.innerText = `Showing results for: ${search}`;
    mainSearch.append(h2);
}

deleteRes = function() {
    let del = mainSearch.getElementsByTagName('h2');
    for(let res of del) {
        res.remove();
    }
}