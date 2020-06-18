const fs = require('fs');
const path = require('path');
const shell = require('shelljs');

const CI = require('miniprogram-ci');

let manifest = fs.readFileSync('./src/manifest.json');

let manifestJSON = JSON.parse(manifest.toString());

let appId = manifestJSON['mp-weixin'].appid;

let packageStr = fs.readFileSync('./package.json');

let packageJSON = JSON.parse(packageStr.toString());


function resolve(dir) {
    return path.join(__dirname,dir);
}

if (!appId) {
    shell.echo('ERROR:NONE WECHAT APPID,UNABLE TO FOLLOW');
    shell.exit(1);
}

(async ()=>{
    const project = new CI.Project({
        appid:appId,
        type:'miniProgram',
        projectPath:resolve('./dist/build/mp-weixin'),
        privateKeyPath:resolve(`./private.${appId}.key`)
    })
    try {
        await CI.upload({
            project,
            version:packageJSON.version,
            desc:packageJSON.description,
            onProgressUpdate:console.log,
            qrcodeFormat: 'image', 
            qrcodeOutputDest:'qrcode/preview-qrcode.jpg'
        })
        shell.echo('SUCCESS');
        shell.exit(0);
    } catch (error) {
        shell.echo('FAILD:',JSON.stringify(error))
        shell.exit(1);
    }
})()


