const url = require('url');
const path = require('path');
const fs = require('fs');
//file import
const buildBreadcrumb = require('./breadcrumb.js')
const buildMainContent = require('./mainContent.js')
const getMimeType = require('./getMimeType.js')


const staticBasePath = path.join(__dirname, '..', 'static');


const respond = (request, response) => {
    let pathname = url.parse(request.url, true).pathname;
    
    if(pathname === '/favicon.ico'){
        return false;
    }
//    console.log(pathname);
    pathname = decodeURIComponent(pathname);
    
    const fullStaticPath = path.join(staticBasePath, pathname);
    
    if(!fs.existsSync(fullStaticPath)){
        console.log(`${fullStaticPath} does not exist`);
        response.write('404: FILE NOT FOUND!');
        response.end();
        return false;
    }
    //else{
       // response.write('File Found!');
        //response.end();
    // }
    let stats;
    try{
        stats = fs.lstatSync(fullStaticPath);
    }
    catch(err){
        console.log(`lstatSync Error: ${err}`);
    }
    
    if (stats.isDirectory()){
        let data = fs.readFileSync(path.join(staticBasePath, 'Project_files/index.html'), 'utf-8');
        let pathElements = pathname.split('/').reverse();
        pathElements = pathElements.filter(element => element !== '');
        const folderName = pathElements[0];
        data = data.replace('File Explorer', folderName);
        
        // MainContent
        const mainContent = buildMainContent(fullStaticPath, pathname);
        
        // Build BreadCrumb
        const breadcrumb = buildBreadcrumb(pathname);
        data = data.replace('pathname', breadcrumb);
        data = data.replace('mainContent', breadcrumb);
        
        response.statusCode = 200;
        response.write(data);
        response.end();
    }
    
    if(!stats.isFile()){
        response.statusCode = 401;
        response.write('401: Access denied!');
        console.log('Not a File');
        return respond.end();
    }
    response.write(stats.isDirectory().toString());
    response.end();
    }
    let fileDetails = {};
    fileDetails.extname = path.extname(fullStaticPath);
    console.log(fileDetails.extname);

    // File Size
let stat;
    try{
        stat = fs.statSync(fullStaticPath);
        
    }catch(err){
        console.log(`error: ${err}`);
    }
    fileDetails.size = stat.size;
    
    getMimeType(fileDetails.extname).then(mime => {
//        console.log(mime);
//        response.status = 200;
//        response.write(`status code in getMimeType function: ${mime}`);
//        return response.end();
        let head ={};
        let statusCode = 200;
        head['Content-Type'] = mime;
        
        // PDF File opening in browser
        
        if(fileDetails.extname === '.pdf'){
            head['Content-Disposition'] = 'inline';
            
            // Download as an attachment
//            head['Content-Disposition'] = 'attachment; filename=file.pdf';
        }
        // Audio streaming
        if(RegExp('audio').test(mime) || RegExp('video').test(mime)){
            head['Accept-Ranges'] = 'bytes';
            
            const range = request.headers.range;
            if(range){
                const start_end = range.replace(/bytes=/,"").split('-');
                const start = partseInt(start_end[0]);
                const end = start_end[1] ? parseInt(start_end[1]): fileDetails.size -1
                let stat;
            try{
                const stat = fs.statSync(fullStaticPath);
            }
                catch(err){
                console.log(`error: ${err}`);
        }
            
            head['Content-Range'] = `bytes ${start}-{end}/${fileDetails.size}`;
            head['Content-Length'] = end-start +1;
            statusCode= 206;
            
                options = {start, end};
            }

}
        
//        fs.promises.readFile(fullStaticPath, 'utf-8').then(data => {
//             response.writeHead(statusCode, head);
//                response.write(data);
//                return response.end();
//        });
        
        const fileStream = fs.createReadStream(fullStaticPath, options);
        fileStream.writeHead(statusCode, head);
        fileStream.pipe(response);
        
        fileStream.on('close', () => {
            return response.end();
        });
        
        fileStrea,.on('error', error => {
            response.statusCode = 404;
            response.write('404: File streaming error!');
            return response.end();
        });
        
    })
    .catch(err => {
        response.statusCode = 500;
        response.write('500: Internal Server Error!');
        console.log(`Promise erro: ${err}`);
        return response.end();
    })

module.exports = respond;