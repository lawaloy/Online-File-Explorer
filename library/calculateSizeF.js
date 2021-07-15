const calculateSizeF = stats =>
{   
    const fileSizeBytes = stats.size;
    const units = "BKMGT";

const fileSizeHuman = (fileSizeByte/Math.pow(1000, index)).toFixed(1);
    
    fileSize = `${fileSizeHuman}${unit}`);


    return [fileSize, fileSizeBytes];
}
module.exports = calculateSizeF;