import type { NextApiRequest, NextApiResponse } from 'next'

import { exit } from 'process';

var fs = require('fs');





export default function handler(req: NextApiRequest, res: NextApiResponse) {
    

  let { page } = req.query.page ? req.query : { page: 1 };
    page = parseInt(page)

    // number of records to display per page
    let { pp } = req.query.pp ? req.query : { pp: process.env.NEXT_PUBLIC_RECORDS_PER_PAGE };
    pp = parseInt(pp)

    let { orderby } = req.query.orderby ? req.query : { orderby: "label" };
  
    let { sort } = req.query.sort ? req.query : { sort: "asc" };



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

          
          let startRecord = ((page - 1) * pp);
 
          files.forEach(function (file) {


            let filepath = dir + '/' + file;
                let rawdata = fs.readFileSync(filepath);
                let group = JSON.parse(rawdata);
            

                let label = ("_label" in group) ? group._label : "";
                let filename = file;
             
                groups.push({id:group.id,filename:filename,label:label});
        
            
      });
            
      if (sort == "desc") {

        groups.sort((g1, g2) => {
          return compareObjects(g2, g1, orderby)
        })
      } else {
        groups.sort((g1, g2) => {
          return compareObjects(g1, g2, orderby)
        })
      }
  
      
        let all_groups = { meta: meta, result: groups.slice(startRecord,startRecord + pp) };
        res.status(200).json(all_groups);
        exit       
      
       
    });
   
   
    

}



function compareObjects(object1, object2, key) {
  const obj1 = object1[key].toUpperCase()
  const obj2 = object2[key].toUpperCase()

  if (obj1 < obj2) {
    return -1
  }
  if (obj1 > obj2) {
    return 1
  }
  return 0
}


