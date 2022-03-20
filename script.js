let get = element => document.querySelector(element)

get('.busca').addEventListener('submit', async (e)=>{
    e.preventDefault(); 

    let input = get('#searchInput').value;
    if(input !== ''){
        clearInfo()
        showWarning('Carregando...')
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=fec0cfc215c206dff7c421ec90c42a51&units=metric&lang=pt_br`
        
        let results = await fetch(url);
        let json = await results.json();
        console.log(json)

        if(json.cod === 200){
            showInfo({
                name: json.name, 
                country: json.sys.country, 
                city: json.name,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAng: json.wind.deg,
            })
        } else{
            clearInfo()
            showWarning('Não encontramos essa localização.')
        }
    }
})

//Functions
function showWarning(msg){
    get('.aviso').innerHTML = msg;
}

function showInfo(json){
    showWarning('')
    get('.titulo').innerHTML = `${json.name}, ${json.country}`;
    get('.tempInfo').innerHTML = `${json.temp}<sup>ºC</sup>`
    get('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`
    get('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    get('.ventoPonto').style.transform = `rotate(${json.windAng - 90}deg)`

    get('.resultado').style.display = 'block';
}
function clearInfo(){
    showWarning('')
    get('.resultado').style.display = 'none';
}