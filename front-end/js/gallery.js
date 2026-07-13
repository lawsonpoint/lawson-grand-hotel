const images =
document.querySelectorAll(".gallery-image");

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightboxImage");

const closeBtn =
document.querySelector(".close-lightbox");

const prevBtn =
document.querySelector(".prev");

const nextBtn =
document.querySelector(".next");

const counter =
document.getElementById("imageCounter");

let currentIndex = 0;

function showImage(index){

currentIndex=index;

lightbox.style.display="flex";

lightboxImage.src=
images[currentIndex].src;

counter.innerHTML=
`${currentIndex+1} / ${images.length}`;

}

images.forEach((image,index)=>{

image.addEventListener("click",()=>{

showImage(index);

});

});

nextBtn.onclick=()=>{

currentIndex++;

if(currentIndex>=images.length){

currentIndex=0;

}

showImage(currentIndex);

};

prevBtn.onclick=()=>{

currentIndex--;

if(currentIndex<0){

currentIndex=
images.length-1;

}

showImage(currentIndex);

};

closeBtn.onclick=()=>{

lightbox.style.display="none";

};

lightbox.onclick=(e)=>{

if(e.target===lightbox){

lightbox.style.display="none";

}

};

document.addEventListener("keydown",(e)=>{

if(lightbox.style.display!=="flex") return;

if(e.key==="ArrowRight"){

nextBtn.click();

}

if(e.key==="ArrowLeft"){

prevBtn.click();

}

if(e.key==="Escape"){

lightbox.style.display="none";

}

});