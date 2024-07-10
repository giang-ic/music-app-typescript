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

            if(status){
                url.searchParams.set("status", status); // add query params
                url.searchParams.set("page", 1);
            }
            else{
                url.searchParams.delete("status");
                url.searchParams.delete("keyword");
                url.searchParams.delete("page");
            }

            window.location.href = url.href; // redirect url
        });
    });
}
// end button filter status

// pagination
const listButtonPagination = document.querySelectorAll("[button-pagination]");
if(listButtonPagination.length > 0){
    let url = new URL(window.location.href);
    listButtonPagination.forEach(button => {
        button.addEventListener("click", (event) => {
            const page = button.getAttribute("button-pagination");
            console.log(page);
            if(page){
                url.searchParams.set("page", page);
            }
            else {
                url.searchParams.delete("page");
            }
            window.location.href = url.href;
        });
    });
}
// end pagination
