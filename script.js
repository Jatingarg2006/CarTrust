
const form = document.querySelector("form");
const result = document.getElementById("result");

const brandInput = document.getElementById("brand");
const modelInput = document.getElementById("model");
const yearInput = document.getElementById("year");
const kmsInput = document.getElementById("kms");
const fuelInput = document.getElementById("fuel");
const anaylze_button = document.getElementById("analyze");

const currentYear = new Date().getFullYear();

for (let y = currentYear; y >= 1980; y--) {
    yearInput.innerHTML += `<option value="${y}">${y}</option>`;
}

function delay(){
    return new Promise((resolve) => {
        setTimeout(() => {resolve("delayed");}, 2000);
    });
}

//DEMO FETCH API FOR ASYNC PRACTICE
// async function getCarTips(){
//     const response = await fetch("https://jsonplaceholder.typicode.com/posts/1");
//     const data = await response.json();
//     return data;
// }

function analyzeScore(year, kms, fuel){

    const currentYear = new Date().getFullYear();
    const carAge = currentYear - year;

    let score = 10;
    let condition;
    let usageRisk;
    let recommendation;

    if(carAge <= 3){
        condition = "Excellent Condition";
    }
    else if(carAge <= 7){
        condition = "Good Condition";
        score -= 2;
    }
    else{
        condition = "High Maintenance Risk";
        score -= 5;
    }

    if(kms < 30000){
        usageRisk = "Low Usage";
    }
    else if(kms < 80000){
        usageRisk = "Moderate Usage";
        score -= 2;
    }
    else{
        usageRisk = "Heavy Usage";
        score -= 4;
    }

    if(fuel === "diesel"){
        score -= 1;
    }

    if(score < 0){
        score = 0;
    }

    let scoreColor;

    if(score>=8){
        scoreColor = "green";
    }
    else if(score >= 5){
        scoreColor = "orange";
    }
    else{
        scoreColor = "red";
    }

    if(condition === "Excellent Condition"
        && usageRisk === "Low Usage"){
        recommendation = "Great Deal";
    }
    else if(
        condition === "High Maintenance Risk"
        || usageRisk === "Heavy Usage"
    ){

        recommendation = "Buy Carefully";

    }
    else{

        recommendation = "Average Deal";

    }

    return {
        score,
        condition,
        usageRisk,
        recommendation,
        carAge,
        scoreColor
    };
}

form.addEventListener("submit", async function(event){
    event.preventDefault();

    const brand = brandInput.value;
    const model = modelInput.value;
    const year = Number(yearInput.value);
    const kms = Number(kmsInput.value);
    const fuel = fuelInput.value;
    const currentYear = new Date().getFullYear();
    
    result.innerHTML = `<p class="loading">Analyzing Car Data...</p>`;
    await delay();
    if(!brand || !model || !year || !kms || !fuel){
        result.innerHTML = `<p class="error">Please Fill All Fields ⚠️</p>`;
        return;
    }
    
    const analysis = analyzeScore(year, kms, fuel);
    
    try{
        // const apiData = await getCarTips();
        // console.log(apiData.title);
        
        result.innerHTML = `
        <div class="analysis-card">
        <h3 id="result-heading">${brand} ${model}</h3>
        <div class="score-box">
        <p style="color: ${analysis.scoreColor}"><strong>Overall Score: </strong>${analysis.score}/10</p>
        </div>
        <p><strong>Condition: </strong>${analysis.condition}</p>
        <p><strong>Usage: </strong>${analysis.usageRisk}</p>
        <p class="recommendation"><strong>Recommendation: </strong>${analysis.recommendation}</p>
        </div>
        `;
    }
    catch(error){
        console.error(error);
        result.innerHTML = `<p class="error">Something Went Wrong</p>`;
        return;
    }

    console.log("Form Submitted");
});
