const loadData = async (id) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    const res = await fetch(url);
    const data = await res.json();
    displayData(data.data.tools, id)
    // console.log(data)
    // console.log(data.data.tools[0].description)
    // console.log(data.data.tools[0].pricing)
    // console.log(data.data.tools[0].pricing[0].price)
    


}
const displayData = (data, dataLimit) =>{
    const aiHubContainer = document.getElementById('aiHub-container')
    aiHubContainer.innerText =''
    const seeMore = document.getElementById('btn-see-more')
    if(dataLimit && data.length>6){
        data = data.slice(0,6);
        seeMore.classList.remove('hidden')
    }
    else{
        seeMore.classList.add('hidden')
    }
    data.forEach(aiHub => {
        const aiHubDiv = document.createElement('div')
        const features = aiHub.features
        aiHubDiv.innerHTML=`
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
            <button onclick="loadAIHubDetails('${aiHub.id}')"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-9 h-9 bg-rose-50 p-2 rounded-full text-red-500">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
          </svg></button>
              
        </div>
    </div>`
   
    aiHubContainer.appendChild(aiHubDiv)
    
        
    });

}
const loadAIHubDetails = async (hubId) =>{
    const url = `https://openapi.programming-hero.com/api/ai/tool/${hubId}`
    const res = await fetch(url)
    const data = await res.json();
    console.log(data.data.description)
    console.log(data.data.pricing[0].plan)
    console.log(data.data.pricing[0].price)
    console.log(data.data.features['1'].feature_name)
    console.log(data.data.integrations[0])
    console.log(data.data.image_link[0])
    console.log(data.data.input_output_examples[0].input)
    console.log(data.data.input_output_examples[0].output)
    console.log(data.data.accuracy.score)
  
    // displayPhoneDetail(data.data)
}
loadData(6)
document.getElementById('btn-see-more').addEventListener('click',function(){
loadData()

})