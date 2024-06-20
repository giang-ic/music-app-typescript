// APlayer
const aplayerExist = document.querySelector("#aplayer");
if(aplayerExist){

    // Get data's song & convert to JS
    let dataSong = aplayerExist.getAttribute("data-song");
    dataSong = JSON.parse(dataSong);

    // Get data's singer & convert to JS
    let dataSinger = aplayerExist.getAttribute("data-singer");
    dataSinger = JSON.parse(dataSinger);

    const ap = new APlayer({
        container: aplayerExist,
        audio: [{
            name: dataSong.title,
            artist: dataSinger.fullName,
            url: dataSong.audio,
            cover: dataSong.avatar,
            preload: 'none'
        }]
    });

    // listen event 
    const innerAvatar = document.querySelector(".inner-avatar"); // image disk rotate
    ap.on('play', function () {
        innerAvatar.style.animationPlayState = "running";
    });

    ap.on('pause', function () {
        innerAvatar.style.animationPlayState = "paused";
    });
}
// End APlayer

// Like Song
const buttonLikeSong = document.querySelector("[button-like]");
if(buttonLikeSong){
    buttonLikeSong.addEventListener("click", (event) => {
        const id = buttonLikeSong.getAttribute("button-like");

        const status = buttonLikeSong.classList.contains("active") ? "dislike" : "like";

        fetch(`/songs/like/${status}/${id}`, {
            method: 'PATCH'
        })
            .then(response => response.json())
            .then(response => {
                if(response.code === 400){
                    alert('Vui lòng đăng nhập');
                }
                else {
                    const innerNumber = buttonLikeSong.querySelector(".inner-number");
                    innerNumber.innerHTML = response.like;
                    buttonLikeSong.classList.toggle("active");
                }
                
            });
    });
}
// End Like Song

// Favorite Song
const listButtonFavoriteSong = document.querySelectorAll("[button-favorite]");
if(listButtonFavoriteSong.length > 0){
    listButtonFavoriteSong.forEach(button => {
        button.addEventListener("click", (event) => {
            const id = button.getAttribute("button-favorite");
            const status = button.classList.contains("active") ? "unfavorite" : "favorite";
    
            fetch(`/songs/favorite/${status}/${id}`, {
                method: 'PATCH'
            })
                .then(response => response.json())
                .then(response => {
                    if(response.code === 400){
                        alert('Vui lòng đăng nhập');
                    }
                    else {
                        button.classList.toggle("active");
                    }
                });
        });
    });
   
}
// End Favorite Song
