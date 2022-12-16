function renderJobs (array){

    let section = document.querySelector('.section-1')

    array.forEach((job)=>{

        let template = createJobs(job)
        section.appendChild(template)
    })

}

renderJobs(jobsData)


function createJobs(job){
    const {id, title, enterprise, location, description, modalities} = job

    let divCard = document.createElement('div')
    divCard.classList = 'card m-bottom'
    
    let h4 = document.createElement('h4')
    h4.innerText = title
    let div1 = document.createElement('div')
    div1.classList = 'flex gap'
    let p1 = document.createElement('p')
    p1.innerText = enterprise
    let p2 = document.createElement('p')
    p2.innerText = location

    let p3 = document.createElement('p')
    p3.innerText = description

    let div2 = document.createElement('div')
    div2.classList = 'flex justify-between'
    let button1 = document.createElement('button')
    button1.classList = 'modalidade'
    button1.innerText = modalities[0]
    let button2 = document.createElement('button')
    button2.classList = 'candidatar'
    button2.innerText = 'Candidatar'
    button2.dataset.id = id
    button2.id = id
    

    button2.addEventListener('click',()=>{
        
       
        favoriteAndRemove(job, button2)
    })


    div1.append(p1, p2)
    div2.append(button1, button2)

    divCard.append(h4, div1, p3, div2)

    return divCard


}

function getLocalStorage(){

     return JSON.parse(localStorage.getItem('Webwomen')) || []
}

function jobExists (job){

    return getLocalStorage().findIndex((elt)=> elt.id === job.id)
}

function favoriteAndRemove(job, button){

    const jobExist = jobExists(job)
    let favoriteJobs = getLocalStorage()

     let aside = document.querySelector('.aside')
     
     aside.innerHTML = ''

    if(jobExist <0){
        favoriteJobs.push(job)
        button.innerText = 'Remover Candidatura'

        favoriteJobs.forEach((job)=>{

            let template = createCard(job, button)
            aside.appendChild(template)

        })
    }else {

        favoriteJobs.splice(jobExist, 1)

          favoriteJobs.forEach((job)=>{

            let template = createCard(job, button)
            aside.appendChild(template)

        })
        button.innerText = 'Candidatar'
    }

    localStorage.setItem('Webwomen', JSON.stringify(favoriteJobs))
}




function createCard(job, btn){
    const {id, title, enterprise, location, description, modalities} = job

    let divMain = document.createElement('div')
    divMain.classList = 'card-2'

    let div1 = document.createElement('div')
    div1.classList = 'flex justify-between'
    let h4 = document.createElement('h4')
    h4.innerText = title
    let button = document.createElement('button')
    button.classList = 'lixeira'
    button.id = id

    button.addEventListener('click',()=>{
        let aside = document.querySelector('.aside')
        aside.innerHTML = ''

      
       let botoes = document.querySelectorAll('[data-id]')
       botoes.forEach((botao)=>{
        if(botao.id === button.id){
            botao.innerText = 'Candidatar'
        }

       })
      
       
        removeFromLocalStorage(job)
        
        let local = getLocalStorage()
        local.forEach((job)=>{

            let template = createCard(job)
            aside.appendChild(template)
        
        })
        
    })

    
    
    let div2 = document.createElement('div')
    div2.classList = 'flex gap'
    let p1 = document.createElement('p')
    p1.innerText = enterprise
    let p2 = document.createElement('p')
    p2.innerText = location

    div1.append(h4, button)
    div2.append(p1, p2)

    divMain.append(div1, div2)

    return divMain

}


function removeFromLocalStorage(job){

    let jobExist = jobExists(job)
    let favoriteJobs = getLocalStorage()

    if(jobExist >= 0){
        favoriteJobs.splice(jobExist, 1)

    }

    localStorage.setItem('Webwomen', JSON.stringify(favoriteJobs))

}

