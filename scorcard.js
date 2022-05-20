const url = 'https://www.espncricinfo.com/series/ipl-2020-21-1210595/mumbai-indians-vs-chennai-super-kings-1st-match-1216492/full-scorecard'

const request = require('request');
const cheerio = require('cheerio')

const xlsx = require('xlsx');
const path = require('path')
const fs = require('fs');
// const path = require('path');

function getdetailsfromurl(url){
    request(url,cb)
}



function cb(err,responce,html){
    if(err){
        console.log(err);
    }else{
        extractmatchdetails(html)
    }
}

function extractmatchdetails(html){
    let $ = cheerio.load(html);
    let desele = $('.header-info .description').text() 
    let des_ele_arr = desele.split(',');
    let venue = des_ele_arr[1].trim()
    let date =des_ele_arr[2].trim()
    let result = $('.match-info.match-info-MATCH.match-info-MATCH-half-width .status-text').text()
    // console.log(result.trim());
    let innings = $('.match-scorecard-page .Collapsible');
    let inningsStr = '';
    for(let i=0;i<innings.length;i++){
        inningsStr= $(innings[i]).html()+inningsStr
        let team = $(innings[i]).find('h5').text()
        team = team.split('INNINGS')[0].trim()
        let oppidx = i==0 ? 1:0 ;
        let opponent = $(innings[oppidx]).find('h5').text()
        opponent = opponent.split('INNINGS')[0].trim()
        // console.log(team,'Vs',opponent,date,venue,result)
        let cInning = $(innings[i]);



        let allrows = cInning.find('.table.batsman tbody tr');
        for(let j=0;j<allrows.length;j++){
            let allcol = $(allrows[j]).find('td');
            let iswarthy = $(allcol[0]).hasClass('batsman-cell');
            if(iswarthy){
                let playerName = $(allcol[0]).text().trim()
                             let runs = $(allcol[2]).text().trim()
                             let balls = $(allcol[3]).text().trim()
                             let fours = $(allcol[5]).text().trim()
                             let sixes = $(allcol[6]).text().trim() 
                             let STR = $(allcol[7]).text().trim()
                             


                             console.log(`${playerName} | ${runs} | ${balls} | ${fours} | ${sixes} | ${STR}`)
                             processPlayer(team,playerName,runs,balls,fours,sixes,STR,date,venue,result);
                            
            }
            
        }
        console.log('~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')




    }
}



function processPlayer(team,playerName,runs,balls,fours,sixes,STR,date,venue,result){
    let teampath = path.join(__dirname,"IPL",team);
            makedir(teampath); 
    let filepath = path.join(teampath,playerName+".xlsx");

    let content = excelread(filepath,playerName)
    let playerobj = {
        team,playerName,runs,balls,fours,sixes,STR,date,venue,result
    }
    content.push(playerobj)
    excelwrite(filepath,content,playerName);
}
function makedir(path) {
    if(fs.existsSync(path)==false){
        fs.mkdirSync(path)
    }
}




function excelwrite (filepath,jsondata,sheet){
    
    let newWB = xlsx.utils.book_new();
    let newWS = xlsx.utils.json_to_sheet(jsondata);
    xlsx.utils.book_append_sheet(newWB, newWS,sheet);
    xlsx.writeFile(newWB,filepath);
    }
    
function excelread(filepath,sheetname){
        if(fs.existsSync(filepath)==false){
            return [];
        }
    let wb = xlsx.readFile(filepath);
        let excelData = wb.Sheets[sheetname];
        let ans = xlsx.utils.sheet_to_json(excelData);
        return ans;
    }

module.exports={
    getdetails : getdetailsfromurl
}