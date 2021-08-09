const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname,'../public'))

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setting up handlebars and the path of views folder
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

// Set up Static Directory 
app.use(express.static(publicDirectoryPath))

// Setting up Various routes
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: "Arya Wadhwani"
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Arya Wadhwani'
    })
})


app.get('/help',(req,res)=>{
    res.render('help',{
       helpText:"This is some helpful text.",
       title:'Help Page',
       name:'Arya Wadhwani'
    })
})


app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Please provide address"
        })
    }
    geocode(req.query.address,(error, {lattitude,longitude,place_name} = {})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(lattitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
            forecast:forecastData,
            location:place_name,
            address:req.query.address
            })
        })
    })
})

// app.get('/products',(req,res)=>{
//     if(!req.query.search){
//         return res.send({
//             error:'You must provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         products:[]
//     })
//     // console.log(req.query)
// })

app.get('/help/*',(req,res)=>{
    res.render('error',{
        errors:"Help article not found",
        name:'Arya Wadhwani',
        title:"404"
    })
})

app.get('*', (req,res) =>{
    res.render('error',{
        errors:"Page not found",
        name:'Arya Wadhwani',
        title:'404'
    })
})

app.listen(port, ()=>{
    console.log('Server is up at '+port)
})