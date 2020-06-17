const path = require('path');

const fs = require('fs');


console.log(process.env.VUE_APP_WEIXIN_ID);

function resolve(dir) {
    return path.join(__dirname,dir);
}

let manifest = fs.readFileSync('./src/manifest.json');



let manifestJSON = JSON.parse(manifest.toString());

manifestJSON['mp-weixin'].appid = process.env.VUE_APP_WEIXIN_ID;

let manifestStr = JSON.stringify(manifestJSON);

fs.writeFile('./src/manifest.json',manifestStr,function (err) {
    let manifestNew = fs.readFileSync('./src/manifest.json');
    let manifestNewJSON = JSON.parse(manifestNew.toString());
    
    console.warn('wechat App ID is Changed to' + process.env.VUE_APP_WEIXIN_ID)

})


