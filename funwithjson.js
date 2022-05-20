const fs = require("fs");
const xlsx = require("xlsx");


let data = require('./example.json');




// data.push({
//     "name" : "nitin",
//     "last name" : "snjnd s",
//     "age" : 19,
//     "friends":["harish","manishk","manish"],
//     "address ":{
//         "state":"delhimssms",
//         "house No":"jswdw"
//     }
// })

// let makestring= JSON.stringify(data); 
// console.log(makestring);


// fs.writeFileSync("./example.json",makestring);


function exelwrite (filepath,jsondata,sheet){
    
let newWB = xlsx.utils.book_new();
let newWS = xlsx.utils.json_to_sheet(jsondata);
xlsx.utils.book_append_sheet(newWB, newWS,sheet);
xlsx.writeFile(newWB,filepath);
}

function exelread(filepath,sheetname){
    if(fs.existsSync(filepath)==false){
        return [];
    }
let wb = xlsx.readFile("filepath");
    let excelData = wb.Sheets[sheetname];
    let ans = xlsx.utils.sheet_to_json(excelData);
    return ans;
}
