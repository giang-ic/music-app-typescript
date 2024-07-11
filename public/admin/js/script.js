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


// change status
const listButtonChangeStatus = document.querySelectorAll("[button-change-id]");
if(listButtonChangeStatus.length > 0){
    listButtonChangeStatus.forEach(button => {
        button.addEventListener("click", (event) => {
            const topicID = button.getAttribute("button-change-id");
            const elementContainStatus = button.querySelector("[button-change-data]");
            let status  = elementContainStatus.getAttribute("button-change-data");

            status = (status === "active" ? "inactive" : "active"); //toggle status

            // API
            fetch(`/admin/topics/change-status/${status}/${topicID}`, {
                method: 'PATCH'
            })
                .then(response => response.json())
                .then(response => {
                    if(response.code === 200){
                        const topicID = response.topicID;
                        const status = response.status;

                        // remove element
                        button.removeChild(elementContainStatus);

                        // create element
                        const child = document.createElement("a");
                        
                        // setting attribute
                        child.href = "javascript:;";
                        child.classList.add("badge");
                        child.classList.add(status === "active" ? "badge-success" : "badge-danger");
                        child.setAttribute("button-change-data", status);   
                        child.innerText = status === "active" ? "Hoạt động" : "Dừng hoạt động";

                        // append
                        button.appendChild(child);
                    }
                })
        });
    });
}
// end change status

// check box
const tableData = document.querySelector("[table-data]");
if(tableData){
    const checkBoxAll = tableData.querySelector('input[name="checkall"]');
    const checkBoxSingle = tableData.querySelectorAll('input[name="checkbox-single"]');
    
    // size of check box
    const sizeOfCheckBox = checkBoxSingle.length;
    console.log(sizeOfCheckBox);
    // if u check all or not
    checkBoxAll.addEventListener("click", (event) => {
        const checked = checkBoxAll.checked;
        checkBoxSingle.forEach(box => {
            box.checked = checked;
        });
    });
    // end if u check all or not

    // check single
    checkBoxSingle.forEach(box => {
        box.addEventListener("click", (event) => {
            // size of checked box
            const sizeOfCheckedBox = tableData.querySelectorAll('input[name="checkbox-single"]:checked').length;

            checkBoxAll.checked = (sizeOfCheckBox === sizeOfCheckedBox);
        });
    });
    // end check single

}
// end check box

// change multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit", (event) => {
        event.preventDefault();
        const inputContainID = formChangeMulti.querySelector('input[name="ids"]');
        const checkedBoxSingle = tableData.querySelectorAll('input[name="checkbox-single"]:checked');

        if(!checkedBoxSingle.length){
            // alert
            return;
        }

        const isConfirm = confirm("Bạn có muốn thay đổi nhiều...");
        if(!isConfirm){
            return;
        }
        
        // get type change multi 
        const type = formChangeMulti.querySelector('select[name="type"]').value;

        // get id checked box
        const listID = [];
        checkedBoxSingle.forEach(box => {
            const id = box.value;

            if(type === "position"){
                // gửi kèm vị trí [id-vị trí]
                const parent = box.closest("tr");
                const position = parent.querySelector('input[name="position"]').value;
                listID.push(`${id}-${position}`);
            }
            else{
                listID.push(id);
            }
            
        });
        // end get id checked box

        // into input contain list id
        inputContainID.value = listID.join(", ");
        // end into input contain list id

        formChangeMulti.submit();
    });
}
// end change multi
