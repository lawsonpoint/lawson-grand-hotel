const chatCard = document.getElementById("chatCard");

const openChat = document.getElementById("openChat");

const closeChat = document.getElementById("closeChat");

window.addEventListener("load",()=>{

setTimeout(()=>{

if(localStorage.getItem("chatClosed")!=="true"){

chatCard.style.display="block";

}

},3000);

});

openChat.addEventListener("click",()=>{

chatCard.style.display="block";

});

closeChat.addEventListener("click",()=>{

chatCard.style.display="none";

localStorage.setItem("chatClosed","true");

});