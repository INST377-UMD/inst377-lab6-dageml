
async function mapUnitedStates() {
    var map = L.map('map').setView([31.19, -98.71], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    for(let i = 0; i<3;i++) {
        const latCoord = getRandomInRange(30, 35, 3);
        const longCoord = getRandomInRange(-90, -100, 3);
        //
        L.marker([latCoord, longCoord]).addTo(map);
        //console.log(`lat: ${latCoord}, long: ${longCoord}`)
        const locality = await getLocality(latCoord,longCoord)
        const city = locality.city
        const paragraphId = `marker${i+1}`
        console.log(paragraphId)
        const paragraphElement = document.getElementById(paragraphId)
        console.log(paragraphElement)
        paragraphElement.innerHTML = `Marker ${i+1}: Latitude: ${latCoord}, Longitude: ${longCoord}, Locality: ${city}`
        
        
         

    }

}
function getRandomInRange(from, to, fixed) {
    return (Math.random() * (to - from) + from).toFixed(fixed) * 1;
    // .toFixed() returns string, so ' * 1' is a trick to convert to number
    }



async function getLocality(latitude, longitude) {
    const localityData = await fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
    .then((res)=> res.json())
    //console.log(localityData['city'])
    return localityData
}



window.onload = mapUnitedStates;
