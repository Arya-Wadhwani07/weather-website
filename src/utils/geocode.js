const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYXJ5YXdhZGh3YW5pIiwiYSI6ImNrcXptM2VqczA4ZHMyc2xnaTVzZ2twMDUifQ.eUgrfz0KJAy4V0k_WfnZzg&limit=1'

    request({ url:url, json: true}, (error,{body}={})=>{
        if(error){
            callback('Unable to connect to location services',undefined)
        } else if(body.message){
            callback('Unable to find the data. Try another search',undefined)
        } else {
            const {place_name,center}=body.features[0]
            callback(undefined,{
                place_name,//: response.body.features[0].place_name,
                lattitude:center[0],//: response.body.features[0].center[0],
                longitude:center[1]//: response.body.features[0].center[1]
            })
        }
    })

}

module.exports= geocode