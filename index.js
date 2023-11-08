const form = document.querySelector('form');
const chatContainer= documnent.querySelector("#chat-container");

let loadInterval;

function loader(element){
    element.textContent ="";

    loadInterval = setInterval(() =>{
        element.textContent+=".";
        if(element.textContent==="...."){
            element.textContent = "";
        }
    },300)
}

function typetext(element,text){
  let index = 0;

  let interval = setInterval(() =>{
    if(index<text.length){
        element.innerHTML = text.charAt(index);
        index++;
    }else{
        clearInterval(interval);
    }
  }, 20)
}

function generateuniqueid(){
    const timestamp = Date.now();
    const random = Math.random();
    const hexstring = random.toString(16);
    return `id-${timestamp}-${hexstring}`;
}

function chatstripe(isai,value,uniqueid){
    return (
        
        `
        <div class="wrapper"${isai && 'ai'}>
        <div class="chat">
        <div class ="profile">
        <img src ="${isai ? bot:user}"
        alt = "${isai? 'bot':'user'}"
        </div>
        </div>
        <div class="message" id=${uniqueid}>${value}</div>
        </div>
        `
    )
}

const handlesubmit = async(event)=>{
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    //user's chatstripe:
    chatContainer.innerHTML = chatContainer.innerHTML + chatstripe(false,data.get('prompt'))

    form.reset();

    //bot's chatstripe:
    const uniqueid = generateuniqueid();
    chatContainer.innerHTML = chatContainer.innerHTML +chatstripe(true, '', uniqueid);

    chatContainer.scrollTop = chatContainer.scrollHeight;
    

    const messageDiv = document.getElementById(uniqueid);
    loader(messageDiv);
}

form.addeventListener('submit', handleSubmit);
form.addeventListener('keyup', (e)=>{
    if(e.keyCode===13){
        handlesubmit(e);
    }
})