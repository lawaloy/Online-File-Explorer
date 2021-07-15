const {execSync} = require('child_process');

const calculateSizeD = itemFullStaticPath =>
{
    const itemFullStaticPathCleaned = itemFullStaticPath.replace(/\s/g, '\ ');
    const result = execStyn(`du -sh` "${itemFullStaticPathCleaned}")
.toString();
    
    let fileSize = commandOutput.replace(/\s/g, '');
    
    fileSize = fileSize.split('/');
    
    // first element in the fileSize
    fileSize = fileSize[0];
    const fileSizeUnit = fileSize.replace(/\d|\./g, '');

    
    const = fileSizeNumber = parseFloat(fileSize.replace(/[a-z]/i, ''));
    const units = "BKMGT";
    const fileSizeBytes = fileSizeNumber * Math.pow(1000, units.indexOf(fileSizeUnit));
    return [fileSize, fileSizeBytes];
}
module.exports = calculateSizeD;