const root = document.getElementById("root")
const filters = document.getElementById("filters")
const inputs = document.querySelectorAll("input")


function render() {
    const template = BOOKS.map(book => {
        debugger
        
        for (const input of inputs) {
            let isChecked=input.checked
            if(isChecked){
                let id=input.id
                if(book.author===id) 
                    return `
                <div class="card">
                <img src="./image/${book.imgSrc}" width="300" alt="">
                <div>
                    <h2>${book.title}</h2>
                    <span>اثر: ${book.author}</span>
                </div>
                <span class="genre">${book.genre}</span>
                <span class="p-date">${book.published_date}</span>
            </div>
                `

                
            }else{
            
            return `
            <div class="card">
            <img src="./image/${book.imgSrc}" width="300" alt="">
            <div>
            <h2>${book.title}</h2>
            <span>اثر: ${book.author}</span>
            </div>
            <span class="genre">${book.genre}</span>
            <span class="p-date">${book.published_date}</span>
            </div>
            `}
            }

            
        
        
    }).join("")



    root.innerHTML = template
}
render()

function renderFilters() {
    const authors = []

    for (const book of BOOKS) {
        if (!authors.includes(book.author)) {
            authors.push(book.author)
        }
    }

    const template = authors.map(author => {
        return `
            <div>
                <label for="${author}">${author}</label>
                <input onchange="renderAgain()" type="checkbox" id="${author}" />
            </div>
        `
    }).join("")
    const genres=[]

    for (const book of BOOKS) {
        if (!genres.includes(book.genre)) {
            genres.push(book.genre)
        }
    }
    const genresTemp = genres.map(genre => {
        return `
            <div>
                <label for="${genre}">${genre}</label>
                <input type="checkbox" id="${genre}" />
            </div>
        `
    }).join("")
    const langs= []
    for (const book of BOOKS) {
        if (!langs.includes(book.language)) {
            langs.push(book.language)
        }
    }
    const langsTemp = langs.map(langs => {
        return `
            <div>
                <label for="${langs}">${langs}</label>
                <input type="checkbox" id="${langs}" />
            </div>
        `
    }).join("")
    
    

    const temp = `
        <div class="right-dir">
            <h2>نویسنده ها:</h2>
            ${template}
        </div>
        <div class="right-dir">
            <h2>ژانر ها:</h2>
            ${genresTemp}
        </div>
        <div class="right-dir">
            <h2>زبان ها:</h2>
            ${langsTemp}
        </div>
    `

    filters.innerHTML = temp

}
function renderAgain(){
    debugger
    render()
}

renderFilters()