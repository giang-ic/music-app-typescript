// Search Suggest
const boxSearch = document.querySelector('.box-search');
if(boxSearch){
    const elementSearch = boxSearch.querySelector('input[name="keyword"]');
    
    // Listen event "keyup"
    elementSearch.addEventListener("keyup", (event) => {
        const keyword = elementSearch.value;

        // fetch api: /search/:type
        fetch(`/search/suggest?keyword=${keyword}`)
            .then(response => response.json())
            .then(data => {
                if(data.code === 200){
                    const songs = data.songs;
                    // get element
                    const innerSuggest = boxSearch.querySelector('.inner-suggest');
                    const innerList = innerSuggest.querySelector('.inner-list');
                    
                    const htmlArray = [];

                    if(songs.length > 0){
                        for(const song of songs){
                            const slug = song.slug;
                            const avatar = song.avatar;
                            const title = song.title;
                            const singer = song.singer;

                            const html = `
                                <a href=/songs/detail/${slug} class="inner-item">
                                    <div class="inner-image">
                                        <img src=${avatar}/>
                                    </div>
                                    <div class="inner-info">
                                        <div class="inner-title">${title}</div>
                                        <div class="inner-singer">${singer}</div>
                                    </div>
                                </a>
                            `;

                            htmlArray.push(html);
                        }
                        innerList.innerHTML = htmlArray.join('');  
                        innerSuggest.classList.add("show");
                    }
                    else {
                        innerList.innerHTML = ``;
                        innerSuggest.classList.remove("show");
                    }
                }
            });
    });
}
// End Search Suggest