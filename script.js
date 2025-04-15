const url="https://api.frankfurter.app/latest";

const dropdowns=document.querySelectorAll(".dropdown select");

for (const select of dropdowns) {
    for (currCode in countryList) {
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if (select.name=="from" && currCode=="USD") {
            newOption.selected="selected";
        }
        if (select.name=="to" && currCode=="INR") {
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        changeFlag(evt.target);
    });
}

const changeFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
}

const btn=document.querySelector("form button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amountVal=amount.value;
    if (amountVal==""||amountVal<=0) {
        amountVal=0;
        amount.value=0;
    }
    const newUrl=`${url}?from=${fromCurr.value}&to=${toCurr.value}`;
    let response=await fetch(newUrl);
    let data=await response.json();
    let rate=data.rates[toCurr.value];
    
    let finalAmount=amountVal*rate;
    msg.innerText=`${amountVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
})