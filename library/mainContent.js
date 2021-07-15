const fs = require('fs');
const path = require('path');
const calculateSizeD = require('./calculateSizeD.js')
const calculateSizeF = require('./calculateSizeF.js')


const buildMainContent = (fullStaticPath, pathname) => {
    let mainContent = '';
    let items;
    try{
        items = fs.readdirSync(fullStaticPath);
    }catch(err){
        console.log(`readdirSync error: ${err}`);
    }
    items.forEach(item => {
        
        let itemDetails = {};
        itemDetails.name = item;
       const link = path.join(pathname, item); 
    // Item
        const itemFullStaticPath = path.join(fullStaticPath, item);
        
        try{
            itemDetails.stats = fs.statSync(itemFullStaticPath);}
        catch(err){
                console.log(`statSync error: ${err}`);
        mainContent = `<div class="alert alert-danger">Internal server error</div>`;
        return false;
            }
    
            if(stats.isDirectory()){
                itemDetails.icon = '<ion-icon name="folder"><i/ion-icon>';
              [filesize, filesizeBytes] = calculateSizeD(itemFullStaticPath);
           }else if(stats.isFile()){
                itemDetails.icon = '<ion-icon name="document"><i/ion-icon>';
               
        }
   
                //[itemDetails.size, itemDetails.itemsizeBytes] =  calculateSizeF();
        itemDetails.timeStamp = parseInt(itemDetails.stats.mtimeMs);
        
        itemDetails.date = new Date(itemDetails.timeStamp);
        
        itemDetails.date = itemDetails.date.toLocaleString();
        
        mainContent += `
<tr data-name="${itemDetails.name}" data-size="${itemDetails.sizeBytes}"> data-time="${itemDetails.timeStamp}">
    <td>${itemDetails.icon}<a href="${link}">${item}</a></td>
    <td>${itemDetails.size}</td>
    <td>${itemDetails.date}</td>
</tr>`;
    
    });

    
    

    return mainContent;
};
module.exports = buildMainContent;