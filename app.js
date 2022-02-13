const form = document.querySelector('#search');
const mainDiv = document.querySelector('#mainContainer');

form.addEventListener('submit', async function(e) {
    e.preventDefault();
    deleteImg();
    const search = this.elements.query.value;
    const res = await axios.get(`https://api.jikan.moe/v3/search/anime?q=${search}&limit=15`);
    const resBack = res.data.results;
    displayImg(resBack);
    form.elements.query.value = '';
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
        div.classList.add('card');
        const img = document.createElement('img');
        let h1 = document.createElement('h1');
        let p = document.createElement('p');
        img.src = shows.image_url;
        h1.innerText = shows.title;
        p.innerText = shows.synopsis;
        div.append(p);
        div.append(img);
        div.append(h1);
        mainDiv.append(div);
    }
    select();
}

function deleteImg() {
    let imgTotal = document.querySelectorAll('.card');
    for (let i = 0; i < imgTotal.length; i++) {
        imgTotal[i].remove();
    }
}

let selectedShowId = 0;

function select() {
    let cardTotal = document.querySelectorAll('.card');
    for(let res of cardTotal) {
        res.addEventListener('click', function () {
            selectedShowId = this.showId;
            deleteImg();
        })
        res.addEventListener('click', function () {

        })
    }
}

recommend = async () => {
    const res = await axios.get(`https://api.jikan.moe/v3/anime/${selectedShowId}/recommendations`);
    const resBack = res.data.recommendations;
    displayImg(resBack);
}

displayInfo = async () => {
    const res = await axios.get(`https://api.jikan.moe/v3/anime/${selectedShowId}`);
    const resBack = res.data;
    displayImg(resBack);
    // console.log(resBack.image_url)
}