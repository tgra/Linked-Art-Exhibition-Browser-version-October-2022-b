import type { NextApiRequest, NextApiResponse } from 'next'
import fetch from 'unfetch'
import { exit } from 'process';

const fetcher = url => fetch(url).then(r => r.json())


var fs = require('fs');
var path = require('path');





export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
    // support paging of results
    let { page } = req.query.page ? req.query : { page: 1 };
    page = parseInt(page)

    // number of records to display per page
    let { pp } = req.query.pp ? req.query : { pp: 50 };
    pp = parseInt(pp)

    let dir = "data/person";
    let persons = [];
    let perPage = 500;
    
    fs.readdir(dir, function (err, files) { 
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
          }

          let meta = {
            success: true,
            totalCount: 0,
            pageCount: 0,
            currentPage: page,
            perPage: pp,
          }
          // total number of files in dir
          meta.totalCount = files.length;
          let pageCount = files.length/pp;
          meta.pageCount = Math.ceil(pageCount);
      
          let counter = 0;
          let startRecord = ((page - 1) * pp);

         
          files.sort();
          files.forEach(function (file) {

            counter = counter + 1;
            
            if (counter > (startRecord + pp)){
              let all_persons = { meta: meta, result: persons };
              res.status(200).json(all_persons);
              exit 
            }

            if (counter > startRecord){
              let filepath = dir + '/' + file;

              let rawdata = fs.readFileSync(filepath);
              let person = JSON.parse(rawdata);
              
              let label = person._label;

              let name = ("identified_by" in person && person.identified_by[0].type == 'Name' ) ? person.identified_by[0].content : ""
              let filename = file;
              let id = file.split('.')[0];

              let id_uri = person.id.split(/\:\d*/)[2]
              
              persons.push({id:id,filename:filename,label:label, id_uri:id_uri, name:name});
             
            }
          });
            
          
    
       
    });
    
   

}




