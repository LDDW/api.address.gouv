const search = document.getElementById('search');
const result = document.getElementById('result');

window.addEventListener('click', function(event){
    const target = event.target;

    if (target.closest('li')){
        search.value = target.textContent;
        result.classList.add('hidden');
    } else {
        result.classList.add('hidden');
    }

})

search.addEventListener('keyup', function(event){

    // Stop propagation by default
    event.preventDefault();
    event.stopPropagation();

    // Get data of 'api gouv adresse'
    setTimeout(() => {
        if(search.value.length > 2){
            fetch('https://api-adresse.data.gouv.fr/search/?q=' + search.value + '&type=housenumber&autocomplete=1&limit=5')
            .then(response => response.json())
            .then(data => {
                result.innerHTML = '';
                if(data.features.length > 0){
                    data.features.forEach(element => {
                        result.innerHTML += `
                            <li class="p-3 border-b-[0.5px] border-slate-400 bg-slate-50 hover:bg-slate-200 cursor-pointer" data-street="${element.properties.name}" data-postcode="${element.properties.postcode}" data-city="${element.properties.city}">${element.properties.label}</li>
                        `;
                    });
                    result.classList.remove('hidden')
                }
            })
            .catch(function(err){
                console.log(err.message);
            });
        }
    }, 500);
});



