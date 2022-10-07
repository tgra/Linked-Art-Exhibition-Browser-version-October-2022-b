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
    let  pp = process.env.NEXT_PUBLIC_RECORDS_PER_PAGE;
   
    let dir = process.env.GROUP_DATA_PATH;


    let groups = [];
    

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

          
          files.forEach(function (file) {

            counter = counter + 1;
            
            if (counter > (startRecord + parseInt(pp))){
              let all_groups = { meta: meta, result: groups };
              res.status(200).json(all_groups);
              exit 
            }
            
            if (counter > startRecord){
                let filepath = dir + '/' + file;
                let rawdata = fs.readFileSync(filepath);
                let group = JSON.parse(rawdata);
            

                let label = ("_label" in group) ? group._label : "";
                let filename = file;
             
                groups.push({id:group.id,filename:filename,label:label});
        }
            
      });
            
          
    
       
    });
    
   

}



