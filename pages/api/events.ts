import type { NextApiRequest, NextApiResponse } from 'next'

import { exit } from 'process';


var fs = require('fs');


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

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
  

  // support paging of results
    let { page } = req.query.page ? req.query : { page: 1 };
    page = parseInt(page)

    // number of records to display per page
    let { pp } = req.query.pp ? req.query : { pp: 50 };
    pp = parseInt(pp)

    let { orderby } = req.query.orderby ? req.query : { orderby: "label" };
  
    let { sort } = req.query.sort ? req.query : { sort: "asc" };
  
    let dir = process.env.ACTIVITY_DATA_PATH;
    let events = [];
    
    

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
              let event = JSON.parse(rawdata);
             // let label = event._label;

             let label = ("_label" in event) ? event._label : "identified_by" in event && event.identified_by[0].type == 'Name' ? event.identified_by[0].content : "";
              let filename = file;
              let id = file.split('.')[0];
              let start = event.timespan.begin_of_the_begin
              let end = event.timespan.end_of_the_end
              let venue = "" ; //event.took_place_at[0]._label
              let org = event.carried_out_by[0]._label

              events.push({id:id,filename:filename,label:label, start:start, end:end, location:venue, org:org});
  
      });

      if (sort == "desc") {

        events.sort((event1, event2) => {
          return compareObjects(event2, event1, orderby)
        })
      } else {
        events.sort((event1, event2) => {
          return compareObjects(event1, event2, orderby)
        })
      }

      
        let all_events = { meta: meta, result: events.slice(startRecord,startRecord + pp) };
        res.status(200).json(all_events);
        exit 
     
            
          
    
       
    });
    
   


}



