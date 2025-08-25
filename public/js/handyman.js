document.addEventListener("DOMContentLoaded", () => {
    const handymanForm = document.getElementById("handyman-form");
    if (!handymanForm) return;

    const fileInput = document.getElementById("projectPhotos");
    const fileList = document.getElementById("file-list");

    if (fileInput && fileList) {
        fileInput.addEventListener("change", () => {
            fileList.innerHTML = ""; // clear previous filenames
            for (const file of fileInput.files) {
                const li = document.createElement("li");
                li.textContent = file.name;
                fileList.appendChild(li);
            }
        });
    }
});