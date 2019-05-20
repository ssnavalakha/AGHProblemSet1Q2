const imgDiv = document.getElementById('img')
var state={
    images:[],
    imgPointer:0
}
function getImages() {
    fetch("https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=2000&page=1\n" +
        "&api_key=e6qeMVwVAobScq3QGBBCsWdk4haOxrTmcBfB3RPI")
        .then((res) => res.text())
        .then((text) => text.length ? JSON.parse(text) : {})
        .then(imgs=>{
            hideAndShow("get-img");
            state.images=imgs.photos;
            displayImages();
        });
}

function hideAndShow(id) {
    var x = document.getElementById(id);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}

function displayImages() {
    var imgEle=document.getElementById("the-img");
    if(imgEle==undefined)
    {
        hideAndShow("next-img");
        hideAndShow("prev-img");
        var ele = document.getElementById("img");
        var img=new Image();
        img.id="the-img";
        img.src=state.images[state.imgPointer].img_src;
        ele.appendChild(img);
    }
    else
    {
        imgEle.src=state.images[state.imgPointer].img_src;
    }
}
function getNextImage()
{
    state.imgPointer=state.imgPointer+1;
    if(state.imgPointer>=state.images.length)
        state.imgPointer=0;
    displayImages();
}

function getPrevImage()
{
    state.imgPointer=state.imgPointer-1;
    if(state.imgPointer<0)
        state.imgPointer=state.images.length-1;
    displayImages();
}
