// function to sort data by data
const sortingDate = (first, second) => {
    const firstDate = new Date(first.published_in)
    const secondDate = new Date(second.published_in)
    if (firstDate > secondDate) {
        return 1;
    }
    else if (firstDate < secondDate) {
        return -1;
    }
    else {
        return 0;
    }
}

const loadData = async (id) => {
    loadSpinner(true); //start spinner
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, id);


}

let limit =0;
let sortClicked =0;
// function to load sorted array
const sortLoadData = async (id) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    let sortData = data.data.tools
    if(id){
        sortData = sortData.slice(0, 6);
        sortData = sortData.sort(sortingDate);
        displayData(sortData,6)   
    }
    else if(sortClicked===2){
        sortDataFirstPart = sortData.slice(0, 6)
        sortDataFirstPart = sortDataFirstPart.sort(sortingDate);
        Array.prototype.splice.apply(sortData, [0, sortDataFirstPart.length].concat(sortDataFirstPart));
        displayData(sortData);
    }
    else{
        sortData = sortData.sort(sortingDate);
        displayData(sortData)
    }

}
document.getElementById('sort-data').addEventListener('click',function(){
    sortClicked =1;
    sortLoadData(limit);

})

// function for displaying data
const displayData = (data, dataLimit) => {
    const aiHubContainer = document.getElementById('aiHub-container');
    aiHubContainer.innerText = '';
    const seeMore = document.getElementById('btn-see-more');
    if (dataLimit && data.length > 6) {
        limit = 6;
        data = data.slice(0, 6);
        seeMore.classList.remove('hidden');
    }
    else if(dataLimit){
        seeMore.classList.remove('hidden')
    }
    else {
        seeMore.classList.add('hidden');
    }
    data.forEach(aiHub => {
        const aiHubDiv = document.createElement('div');
        const features = aiHub.features;
        aiHubDiv.innerHTML = `
        <div class=" p-5 rounded border-2 rounded-xl max-sm:mb-5">
        <img class="rounded-xl w-full h-48" src="${aiHub.image}" alt="">
        <p class="text-xl font-semibold my-3">Features:</p>
        <ol class="h-24 text-gray-500 list-decimal list-inside leading-7">
        ${features.reduce((updated, latest) => updated.concat(`<li>${latest} </li>`), '')}
        </ol>
        <hr class="my-5">
        
        <div class="flex justify-between items-center">
            <div>
                <p class="text-xl font-semibold mb-3">${aiHub.name}</p>
            <div class="text-gray-500 flex gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                    stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round"
                        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                </svg>
                <p>${aiHub.published_in}</p>
    
            </div>
            </div>
            <button onclick="loadAIHubDetails('${aiHub.id}')" data-te-toggle="modal" data-te-target="#hubModal"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9 bg-rose-50 p-2 rounded-full text-red-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg></button>
              
        </div>
    </div>`;

        aiHubContainer.appendChild(aiHubDiv);


    });
    loadSpinner(false); //spinner stop

}
const loadAIHubDetails = async (hubId) => {
    const url = `https://openapi.programming-hero.com/api/ai/tool/${hubId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayAIHubDetail(data.data);
}
const displayAIHubDetail = (hubDetails) => {
    const hubDescription = document.getElementById('description');
    hubDescription.innerText = hubDetails.description;
    const priceContainer = document.getElementById('price-container');
    priceContainer.innerHTML=`
    <div class="text-green-500 text-xl font-bold rounded-xl bg-white p-3 py-5">
        <p>${hubDetails.pricing ? hubDetails.pricing[0].price : 'Free of Cost/'}</p>
        <p>${hubDetails.pricing ? hubDetails.pricing[0].plan : 'Basic'}</p>
        
    </div>
    <div class="text-orange-500 text-xl font-bold rounded-xl bg-white p-3 py-5 max-sm:my-5">
    <p>${hubDetails.pricing ? hubDetails.pricing[1].price : 'Free of Cost/'}</p>
    <p>${hubDetails.pricing ? hubDetails.pricing[1].plan : 'Pro'}</p>
    </div>
    <div class="text-rose-500 text-xl font-bold rounded-xl bg-white p-3 py-5">
    <p>${hubDetails.pricing  ? hubDetails.pricing[2].price : 'Free of Cost/'}</p>
    <p>${hubDetails.pricing ? hubDetails.pricing[2].plan : 'Enterprise'}</p>
    </div>`;
    const hubFeatures = hubDetails.features;
    const listOfHubFeatures = document.getElementById('hub-feature-list');
    if(hubFeatures){
        const hubFeaturesKeys = Object.keys(hubFeatures)
        listOfHubFeatures.innerHTML=`
        <p class="text-2xl font-bold">Features</p>
        <ul class="list-disc text-gray-500 list-inside leading-7">
        ${hubFeaturesKeys.reduce((updated, latest) => updated.concat(`<li>${hubFeatures[latest].feature_name} </li>`), '')}
        </ul>`;
    }
    else{
        listOfHubFeatures.innerHTML=`
        <p class="text-2xl font-bold">Features</p>
        <p class="text-gray-500">No Feature found</p>`;

    }
    const hubIntegrations = hubDetails.integrations;
    const listOfHubIntegrations = document.getElementById('hub-integration-list')

    if(hubIntegrations){
        listOfHubIntegrations.innerHTML=`
        <p class="text-2xl font-bold">Integrations</p>
        <ul class="list-disc text-gray-500 list-inside leading-7">
        ${hubIntegrations.reduce((updated, latest) => updated.concat(`<li>${latest} </li>`), '')}
        </ul>`;
    }
    else{
        listOfHubIntegrations.innerHTML=`
        <p class="text-2xl font-bold">Integrations</p>
        <p class="text-gray-500">No data found</p>`;

    }
    
    const modalImage = document.getElementById('modal-image');
    modalImage.src = hubDetails.image_link[0];
    const hubAccuracy = document.getElementById('accuracy');
    const accuracyContainer = document.getElementById('accuracy-container')
    if(hubDetails.accuracy.score){
        hubAccuracy.innerText = hubDetails.accuracy.score * 100;
        accuracyContainer.classList.remove('hidden');
    }
    else{
        accuracyContainer.classList.add('hidden');
    }
    const inOutContainer = document.getElementById('input-output-example');
    const inputOutput =  hubDetails.input_output_examples;
    
    
    if(hubDetails.input_output_examples){
        inOutContainer.innerHTML=`${inputOutput.reduce((updated, latest) => updated.concat(`<p class="my-1 leading-7"><span class="font-bold text-2xl">${latest.input}</span><br><span class="text-gray-500">${latest.output}</span> </p>`), '')}`;
    }
    else{
        inOutContainer.innerHTML=`
        <p class="font-bold text-2xl my-5 leading-7">Can you give any example?</p>
        <p class="text-gray-500 mb-20 leading-7">No! Not Yet! Take a break!!!</p>`;
    }

}
// spinner function
const loadSpinner = isLoading => {
    const spinnerSection = document.getElementById('spinner-loader')
    if(isLoading){
        spinnerSection.classList.remove('hidden')
    }
    else{
        spinnerSection.classList.add('hidden')
    }
}

loadData(6)
document.getElementById('btn-see-more').addEventListener('click', function () {
    limit=0;
    if(sortClicked === 1){
        sortClicked=2;
        sortLoadData();

    }
    else{
        loadData();
    }

})