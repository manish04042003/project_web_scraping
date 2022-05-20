 const url = "https://www.espncricinfo.com/series/ipl-2020-21-1210595";

const path = require('path')
const fs = require('fs')
const request = require('request');
const cheerio = require('cheerio');
const allmatch = require('./extractlink')


 request(url, fnx)

function fnx(err,responce , html){
     if(err){
         console.log(err); 
     }else{
         allmatch.extractkink(html)
     }

}
  let iplpath = path.join(__dirname,'IPL');
  makedir(iplpath)

function makedir(path) {
    if(fs.existsSync(path)==false){
        fs.mkdirSync(path)
    }
}