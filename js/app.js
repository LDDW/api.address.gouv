class Address {
    
    /**
     * @function
     * @param {*} data 
     * @returns response
     */
    #requestApi(data){
        try {
            if(data.length > 2){
                return fetch('https://api-adresse.data.gouv.fr/search/?q=' + data + '&type=housenumber&autocomplete=1&limit=5')
                .then((response) => response.json())
                .then((data) => data)
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * @async
     * @function
     * @param {*} data 
     * @returns html
     */
    async getResult(data){
        const requestApi = await this.#requestApi(data);
        let html = '';
        if(requestApi !== undefined){
            requestApi.features.forEach(address => {
                html += `
                    <li class="result_item" data-street="${address.properties.name}" data-postcode="${address.properties.postcode}" data-city="${address.properties.city}">${address.properties.label}</li>
                `;
            });
        }
        return html;
    }

}

const address = new Address();
const searchInput = document.getElementById('search');
const resultContainer = document.getElementById('result');
const street = document.getElementById('street');
const postcode = document.getElementById('postcode');
const city = document.getElementById('city');
let timeoutId;

searchInput.addEventListener('keypress', function(){
    clearTimeout(timeoutId);
    timeoutId = setTimeout(async () => {
        resultContainer.innerHTML = await address.getResult(searchInput.value);
        resultContainer.classList.remove('hidden');
    }, 500);
});

window.addEventListener('click', function(event){
    const target = event.target;
    if (target.closest('li')){
        street.value = target.getAttribute('data-street');
        postcode.value = target.getAttribute('data-postcode');
        city.value = target.getAttribute('data-city');
        result.classList.add('hidden');
    } else {
        result.classList.add('hidden');
    }
});