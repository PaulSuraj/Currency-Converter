const Base_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown = document.
querySelectorAll(".dropdown select");
const btn =document.querySelector("form button");const fromCurr = document.querySelector(".from select");
const toCurr =document.querySelector(".to select");
const msg = document.querySelector(".msg");

for( let select of dropdown){
    for(currCode in countryList){
        let newOPtion = document.createElement("option");
       newOPtion.innerText=currCode;
        newOPtion.value = currCode;
        if (select.name === "from" &&
             currCode ==="USD"){
            newOPtion.selected ="selected";

        }
else if(select.name === "to" && currCode === "INR"){
    newOPtion.selected ="selected";
}
select.append(newOPtion);
    }

select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}


const updateFlag =(element)=>{
    let currCode = element.value;
    let CountryCode=countryList[currCode];
    let newSrc = `https://flagsapi.com/${CountryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src= newSrc;
};

const updateExchnageRate = async ()=>{
    let amount = document.querySelector
    (".amount input");
    let amtVal = amount.value;
    if(amtVal === "" || amtVal < 1){
        amtVal =1;
        amount.value ="1";
    }


// update URL structure
const URL =`${Base_URL}/${fromCurr.value.toLowerCase()}.json`;

let response = await fetch(URL);
let data = await response.json();
let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];

let finalAmount = amtVal * rate;
msg.innerText =`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

};

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchnageRate();
});

window.addEventListener("load",()=>{
    updateExchnageRate();
 });