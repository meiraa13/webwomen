function getLocalStorage(){

    return JSON.parse(localStorage.getItem('Webwomen')) || []
}

function jobExists (job){

   return getLocalStorage().findIndex((elt)=> elt.id === job.id)
}




function removeFromLocalStorage(job){

    let jobExist = jobExists(job)
    let favoriteJobs = getLocalStorage()

    if(jobExist >= 0){
        favoriteJobs.splice(jobExist, 1)

    }

    localStorage.setItem('Webwomen', JSON.stringify(favoriteJobs))

}

