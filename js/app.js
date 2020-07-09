document.addEventListener('DOMContentLoaded', () => {
    const search = document.getElementById('search')
    const matchList = document.getElementById('match-list')

   
    // Create the fonction and filter 

    async function searchText(text){
        const response = await fetch('../data/state_capitals.json')
        const datas = await response.json()

        //  Get Match everytime we type something
        let matches = datas.filter(data => {
            const regex = new RegExp(`^${text}`, 'gi')
            return data.name.match(regex) || data.abbr.match(regex)
        })

        if (text.length === 0){
             matches = []
        }

        //console.log(matches)
        clear()
        outputHTML(matches)
        
    }

    // Show result Html
    function  outputHTML(matches){
        if (matches.length > 0){
            const text = matches.map(match => 
                `
                <div class="card card-body mb-1">
                    <h4>${match.name} (${match.abbr}) <span class="text-primary">${match.capital}</span></h4>
                    <small>Lat: ${match.lat} / Long:${match.long}</small>
                </div>`
            ).join('')
            matchList.innerHTML = text
        }   
    }

    function clear(){
        matchList.innerHTML = ''
    }
    
    search.addEventListener('input', () => searchText(search.value))
})