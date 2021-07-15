const {execSync} = require('child_process');

try{
    const result = child_process.execSync(`du -sh`).toString();
    console.log(result);
}
catch(err){
    console.log(`Error: ${err}`);
}