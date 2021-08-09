const request = require('request')

const forecast = (lattitude,longitude,callback)=>{

    const url='http://api.weatherstack.com/current?access_key=080da269d67d1cfbbb9f9074040fe2e7&query='+encodeURIComponent(longitude)+','+encodeURIComponent(lattitude)+'&units=f'
    request({url, json:true}, (error,{body})=>{
        if(error){
            callback('Unable to connect to weather API!',undefined)
        } else if(body.error){
            callback('Unable to find the location',undefined)
        } else{
            const{weather_descriptions,temperature,feelslike}=body.current
            callback(undefined,weather_descriptions[0]+". It is currently "+temperature+" degrees out. It feels like "+feelslike+" degrees out")
        }
    })

}

module.exports=forecast