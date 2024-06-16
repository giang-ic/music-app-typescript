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
            cover: dataSong.avatar
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
