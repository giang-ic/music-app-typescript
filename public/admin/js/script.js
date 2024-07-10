// upload preview image
const uploadImage = document.querySelector('[upload-image]');
if(uploadImage){
    const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
    const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");
    const closeImage = uploadImage.querySelector("[close-image]");

    uploadImageInput.addEventListener("change", (event) => {
        const image = event.target.files[0]; // corresponding: uploadImageInput.files[0]
        
        if(image){
            uploadImageInput.classList.add("opacity-file");
            uploadImagePreview.src = URL.createObjectURL(image);
            closeImage.classList.toggle("hide");

            uploadImagePreview.classList.remove("hide");
        }
    });

    // close image
    if(closeImage){
        closeImage.addEventListener("click", (event) => {
            closeImage.classList.add("hide");
            uploadImagePreview.classList.add("hide"); //
            uploadImagePreview.src = "";
            uploadImageInput.value = "";
        });
    }
    // end close image
}
// end upload preview image

// upload preview audio
const uploadAudio = document.querySelector("[upload-audio]");
if(uploadAudio){
    const uploadAudioInput = uploadAudio.querySelector("[upload-audio-input]");
    const uploadAudioPreview = uploadAudio.querySelector("[upload-audio-preview]");
    const sourceUploadAudioPreview = uploadAudioPreview.querySelector("source");
    const closeAudio = uploadAudio.querySelector("[close-audio]");

    uploadAudioInput.addEventListener("change", (event) => {
        const audio = uploadAudioInput.files[0];
        
        if(audio){
            sourceUploadAudioPreview.src = URL.createObjectURL(audio);
            uploadAudioPreview.load();
            uploadAudioPreview.classList.toggle("hide");
            closeAudio.classList.toggle("hide");
            // uploadAudioInput.classList.add("hide");
        }
    });
    // close audio
    if(closeAudio){
        closeAudio.addEventListener("click", (event) => {
            uploadAudioInput.value = "";
            sourceUploadAudioPreview.src = ""
            uploadAudioPreview.classList.toggle("hide");
            closeAudio.classList.toggle("hide");
        });
    }
    // end close audio
}
// end upload preview audio

// button filter status
const listButtonStatus = document.querySelectorAll("[button-status]");
if(listButtonStatus.length > 0){
    let url = new URL(window.location.href); // create new url
    listButtonStatus.forEach(button => {
        button.addEventListener("click", (event) => {
            const status = button.getAttribute("button-status");
            url.searchParams.set("status", status); // add query params
            window.location.href = url.href;
        });
    });
}
// end button filter status
