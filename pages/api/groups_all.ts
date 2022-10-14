import type { NextApiRequest, NextApiResponse } from 'next'

import { exit } from 'process';

var fs = require('fs');


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    



    let dir = process.env.GROUP_DATA_PATH;


    let groups = [];
    

    fs.readdir(dir, function (err, files) { 
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
          }

          let meta = {
            success: true,
            totalCount: 0
           
          }
          // total number of files in dir
          meta.totalCount = files.length;
        

          
          
 
          files.forEach(function (file) {


            let filepath = dir + '/' + file;
                let rawdata = fs.readFileSync(filepath);
                let group = JSON.parse(rawdata);
            

                let label = ("_label" in group) ? group._label : "";
                let filename = file;
             
                groups.push({id:group.id,filename:filename,label:label});
        
            
      });
            
     
        let all_groups = { meta: meta, result: groups };
        res.status(200).json(all_groups);
        exit        
    });
   
}




