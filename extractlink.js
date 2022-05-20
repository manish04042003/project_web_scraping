const cheerio = require('cheerio');
const request = require('request');

const scorcard = require('./scorcard');

function extractlink(html){
    let $ = cheerio.load(html);
    let anchor = $('a[data-hover="View All Results"]')
    let link = anchor.attr('href')
    let finallink= 'https://www.espncricinfo.com'+link ;
    request(finallink, fnx1)
}

function fnx1(err,responce , html){
   if(err){
       console.log(err); 
   }else{
       extract_score_link(html);
   }

}

function extract_score_link(html){
   let $ = cheerio.load(html);
   
   let scor_array = $('a[data-hover="Scorecard"]')
   for(let i=0;i<scor_array.length;i++){
       let link = $(scor_array[i]).attr('href')
   let finallink= 'https://www.espncricinfo.com'+link ;
   scorcard.getdetails(finallink)
   }
   
}

module.exports={
     extractkink :extractlink,
}