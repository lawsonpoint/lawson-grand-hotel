const contactForm =
document.getElementById("contactForm");

if(contactForm){

contactForm.addEventListener(
"submit",
async(e)=>{

e.preventDefault();

const contactBtn =
document.getElementById("contactBtn");

contactBtn.disabled = true;

contactBtn.innerHTML = `
<span class="spinner"></span>
Sending...
`;

try{

const response =
await fetch(
"http://localhost:5200/api/messages",
{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body: JSON.stringify({

    name:
    document.getElementById("name").value,

    email:
    document.getElementById("email").value,

    phone:
    document.getElementById("phone").value,

    message:
    document.getElementById("message").value

})

}

);

const result =
await response.json();

if(response.ok){

document.getElementById(
"contactMessage"
).innerHTML = `
<p class="success">
✅ Message Sent Successfully!
</p>
`;

contactForm.reset();

}else{

document.getElementById(
"contactMessage"
).innerHTML = `
<p class="error">
${result.error}
</p>
`;

}

}catch(error){

console.error(error);

document.getElementById(
"contactMessage"
).innerHTML = `
<p class="error">
Unable to connect to the server.
</p>
`;

}

contactBtn.disabled = false;

contactBtn.innerHTML =
"Send Message";

});

}