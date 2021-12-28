let find = (e) => {
    return document.querySelector(e);
}

let finds = (e) => {
    return document.querySelectorAll(e);
}

let hide = (e) => {
    e.style.display = "none";
}

let show = (e) => {
    e.style.display = "block";
}

let changeBody = (message) => {
    if(!message) {
        document.body.classList.remove("document");
        document.body.style.backgroundColor = "#22b14c";
    }
    else document.body.classList.add("document");
}