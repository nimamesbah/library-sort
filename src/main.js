const root = document.getElementById("root")
const filters = document.getElementById("filters")
const favRoot = document.getElementById("favBar")
const body = document.querySelector("body")

const selectedAuthors = [];
const selectedLanguages = [];
const selectedGenres = [];
let count = JSON.parse(localStorage.getItem("countSave"))|| 0

const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
favRoot.innerHTML = JSON.parse(localStorage.getItem("saveFav")) || `<h5 class="mt-[4.5rem] sm:mt-0 text-center py-2 duration-200 bg-[#E7E8D1]">سبد شما خالیست!</h5>`;

let favBarItems = []



function render(list) {
    const template = list.map(book => {
        return `
        <div class=" text-white rounded-md overflow-hidden border border-[#CCFFFF] shadow-lg relative scale-[0.9]">
        <img src="./image/${book.imgSrc}" width="300" alt="" class="w-full h-[300px] object-cover">
        <div class="p-4">
            <h2>${book.title}</h2>
            <p>اثر: ${book.author}</p>
            ${favorites.includes(book.id) ? (

                `<button onclick="removeFav(${book.id})" class="bg-red-400 px-4 py-2 mt-4 text-white rounded-3xl cursor-pointer ">حذف از علاقمندی ها</button>`
            ) : (
                `<button onclick="addFav(${book.id})" class="bg-blue-400 px-4 py-2 mt-4 text-white rounded-3xl cursor-pointer  ">اضافه به علاقمندی</button>`
            )}
        </div>
        <span class="genre">${book.genre}</span>
        <span class="p-date">${book.published_date}</span>
    </div>
        `
    }).join("")
    



    root.innerHTML = template
}
render(BOOKS)
favCounter()
favToggler()
favToggler()




function addFav(id) {
    // debugger
    
    favorites.push(id)
    
    
    
    // if(favorites.length!==0){
        //     let element= document.querySelector("h5")
        //     element.classList.add("opacity-0")
        //     element.classList.remove("opacity-1")
        
        // }
        
        
        
        
        
        for(let i = 0; i<favorites.length;i++){
            if(favorites[i]===undefined){
                favorites.splice(i,1)
                console.log(favorites)
                favCounter()
                
            }
        }
        // console.log(element)
        localStorage.setItem("favorites", JSON.stringify(favorites));
        calcFilters()
        
        favRender1(id)
        favCounter()
        document.querySelector("h5").classList.add("hidden")
        toast()
    
    
    
    
    
    
}
// function antiUndefined(){
//     debugger
    
//     for(let i = 0; i<favorites.length;i++){
//         if(favorites[i]===undefined){
//             favorites.splice(i,1)
//             console.log(favorites)

//         }
//     }
//     favCounter()
    

// }
    // favRender()
    if(favorites.length!==0){
        document.querySelector("h5").classList.add("hidden")
        
    }
    
    
function removeFav(id) {
    
    const foundIndex = favorites.findIndex(item => item == id);
    favorites.splice(foundIndex, 1)
    localStorage.setItem("favorites", JSON.stringify(favorites));
    calcFilters()
    favBarItemsDel(id)
    favCounter()
    if(favorites.length===0){
        document.querySelector("h5").classList.remove("hidden")
        
    }
    
}
function toast(){
    const temp = `<div id="toast" onclick="clickToast()" class="bg-blue-400 cursor-pointer rounded-2xl hover:bg-red-400 text-blue-100 duration-200 fixed left-5 top-12 w-max py-2 px-3 -translate-x-[270px] ">
    ثبت شد. برای بازگشت کلیک کنید 
    
    </div>`
    root.innerHTML+=temp
    setTimeout(()=> document.querySelector("#toast").classList.remove("-translate-x-[270px]"))
    setTimeout(()=> {
    if(document.querySelector("#toast"))
        document.querySelector("#toast").classList.add("-translate-x-[270px]")
    
    },3000)
    
    
}
function clickToast(){
    favBarItemsDel(favorites[favorites.length-1])
        favorites.splice(favorites.length-1,1)
        localStorage.setItem("favorites",JSON.stringify(favorites))
        
       
        favCounter()
        render(BOOKS)
        
}

function renderFilters() {
    filters.innerHTML = authorsTemplate();
    filters.innerHTML += langsTemplate();
    filters.innerHTML += generTemplate();
    if(favorites.length===0)
    document.querySelector("h5").classList.remove("hidden")
}
renderFilters()

function langsTemplate() {
    const langs = []

    for (const book of BOOKS) {
        if (!langs.includes(book.language)) {
            langs.push(book.language)
        }
    }

    const template = langs.map(lang => {
        return `
            <div>
                <label for="${lang}">${lang}</label>
                <input onchange="handleChangeLanguage(event)" id="${lang}" value="${lang}" type="checkbox" />
            </div>
        `
    }).join("")

    const res = `
        <div class="border-b-2 py-4">
            <h2 class="text-lg">زبان ها:</h2>
            ${template}
        </div>

    `;

    return res;
}

function authorsTemplate() {
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
                <input onchange="handleChangeAuthor(event)" value="${author}" type="checkbox" id="${author}" />
            </div>
        `
    }).join("")

    const temp = `
        <div class="border-b-2 py-4">
            <h2 class="text-lg">نویسنده ها:</h2>
            ${template}
        </div>
    `

    return temp

}

function generTemplate() {
    const genres = [];

    for (const book of BOOKS) {
        if (!genres.includes(book.genre)) {
            genres.push(book.genre)
        }
    }

    const template = genres.map(genre => {
        return `
        <div>
            <label for="${genre}">${genre}</label>
            <input onchange="handleChangeGenre(event)" type="checkbox" value="${genre}" id="${genre}" />
        </div>
        `
    }).join("")

    const temp = `
        <div class="border-b-2 py-4">
            <h2 class="text-lg">ژانر ها:</h2>
            ${template}
        </div>
    `

    return temp
}

function filtersToggler() {
    filters.classList.toggle("scale-y-0")
}

function handleChangeAuthor(evt) {
    if (evt.target.checked) {
        selectedAuthors.push(evt.target.value)
    } else {
        // selectedAuthors = selectedAuthors.filter(item => item !== evt.target.value);
        const foundIndex = selectedAuthors.findIndex(item => item === evt.target.value);
        selectedAuthors.splice(foundIndex, 1);
    }

    calcFilters();
}

function handleChangeGenre(evt) {
    if (evt.target.checked) {
        selectedGenres.push(evt.target.value)
    } else {
        // selectedAuthors = selectedAuthors.filter(item => item !== evt.target.value);
        const foundIndex = selectedGenres.findIndex(item => item === evt.target.value);
        selectedGenres.splice(foundIndex, 1);
    }

    calcFilters();
}

function handleChangeLanguage(evt) {
    if (evt.target.checked) {
        selectedLanguages.push(evt.target.value)
    } else {
        // selectedAuthors = selectedAuthors.filter(item => item !== evt.target.value);
        const foundIndex = selectedLanguages.findIndex(item => item === evt.target.value);
        selectedLanguages.splice(foundIndex, 1);
    }

    calcFilters();
}

function calcFilters() {
    let result = [...BOOKS]
    
    if (selectedAuthors.length != 0) {
        result = result.filter(book => selectedAuthors.includes(book.author))
    }

    if (selectedGenres.length != 0) {
        result = result.filter(item => selectedGenres.includes(item.genre))
    }

    if (selectedLanguages.length != 0) {
        result = result.filter(item => selectedLanguages.includes(item.language))
    }

    render(result)
}
// function favRender(){
    
//     // debugger
//     let result =favBarItems.map(item => {
//         let foundIndex=BOOKS.findIndex(book => book.id === item)
//         console.log(foundIndex)
//         if(favorites.includes(item)){
//            let temp =`<div id="${item}" class="rounded-md overflow-hidden border shadow-lg relative">
//         <img src="./image/${BOOKS[foundIndex].imgSrc}" width="300" alt="" class="w-full h-[300px] object-cover">
//         <div class="p-4">
//             <h2>${BOOKS[foundIndex].title}</h2>
//             <p>اثر: ${BOOKS[foundIndex].author}</p>
            
//         </div>
//         <span class="genre">${BOOKS[foundIndex].genre}</span>
//         <span class="p-date">${BOOKS[foundIndex].published_date}</span>
//     </div>`
    
//     return temp
//         }
        
        
        
        
//     }).join("")
    
//     favBarItems=[]
//     console.log(result)
//     return favRoot.innerHTML+=result
// }
// favRender()
function favRender1(input){
    let foundIndex = BOOKS.findIndex(book => book.id === input)
    let temp=`<div id="${input}" class="rounded-md overflow-hidden border shadow-lg min-h-[400px] relative">
        <img src="./image/${BOOKS[foundIndex].imgSrc}" width="300" alt="" class="w-full h-[300px] object-cover">
        <div class="p-4 flex flex-col justify-between gap-3.5 items-center w-full flex-wrap">
            <div class="w-full flex justify-between">
                <h2 class="">${BOOKS[foundIndex].title}</h2>
                <p>اثر: ${BOOKS[foundIndex].author}</p>
            
            </div>
            <p onclick="removeFav(${input})" class="px-4 py-2 rounded-3xl bg-[#A7BEAE] w-max cursor-pointer">حذف<p>
            
        </div>
        <span class="genre">${BOOKS[foundIndex].genre}</span>
        <span class="p-date">${BOOKS[foundIndex].published_date}</span>
    </div>`

    
    let result = favRoot.innerHTML+=temp
    localStorage.setItem("saveFav",JSON.stringify(result))
    
    

    return result


    }
// favRender1()

function favBarItemsDel(input){
    document.getElementById(`${input}`).remove()
    localStorage.setItem("saveFav",JSON.stringify(favRoot.innerHTML))
    
    
    

}
function favToggler(){
    document.getElementById("favBar").classList.toggle("scale-x-0")
    document.getElementById("favImg").classList.toggle("rotate-[360deg]")
    root.classList.toggle("blur-xs")
    // if(favorites.length===0&&count===0){
    //     count++
    //     let element= document.createElement("h5")
    //     element.textContent="سبد شما خالیست!"
    //     element.classList.add('mt-[4.5rem]')
    //     element.classList.add("sm:mt-0")
    //     element.classList.add("text-center")
    //     element.classList.add("bg-[#E7E8D1]")
    //     element.classList.add("py-2")
    //     element.classList.add("duration-200")
        
    //     favRoot.appendChild(element)
    //     console.log(element)
    //     localStorage.setItem("countSave",JSON.stringify(count))
    // }else if(favorites.length===0){
    //      document.querySelector("h5").classList.remove("opacity-0")
    // }
    
        
}
function favCounter(){
    document.getElementById("favCounter").textContent=favorites.length
}



