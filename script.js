const kushal = document.querySelector('.kushal');




function loader(element){
    element.textContent ="";

    loadInterval = setInterval(() =>{
        element.textContent+=".";
        if(element.textContent==="...."){
            element.textContent = "";
        }
    },300)
}

loader(kushal)