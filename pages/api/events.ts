import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '../../interfaces'

import useSWR from 'swr';
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

    let dir = "data/activity";
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

          let counter = 0;
          let startRecord = ((page - 1) * pp);

          
          files.forEach(function (file) {

            counter = counter + 1;
            
            if (counter > (startRecord + pp)){
              let all_events = { meta: meta, result: events };
              res.status(200).json(all_events);
              exit 
            }
            
            if (counter > startRecord){
              let filepath = dir + '/' + file;
              let rawdata = fs.readFileSync(filepath);
              let event = JSON.parse(rawdata);
             // let label = event._label;

             let label = ("_label" in event) ? event._label : "identified_by" in event && event.identified_by[0].type == 'Name' ? event.identified_by[0].content : "";
              let filename = file;
              let id = file.split('.')[0];
              //let start = event.timespan.begin_of_the_begin
            //  let end = event.timespan.end_of_the_end
            //  let location = event.took_place_at._label
            //  let org = event.carried_out_by._label
             
            let start = ""
            let end = ""
            let location = ""
            let org = ""
            
              events.push({id:id,filename:filename,label:label, start:start, end:end, location:location, org:org});
        }
            
      });
            
          
    
       
    });
    
   

}



