import type { NextApiRequest, NextApiResponse } from 'next'
import type { Event } from '../../interfaces'

import useSWR from 'swr';
import fetch from 'unfetch'
import { exit } from 'process';

const fetcher = url => fetch(url).then(r => r.json())


var fs = require('fs');
var path = require('path');





export default function handler(_req: NextApiRequest, res: NextApiResponse) {
    
    let dir = "data/person";
    let events = [];
    let perPage = 500;
    
    let page = 1;

    let counter = 1;

    let meta = {
      success: true,
      totalCount: 4355,
      pageCount: 208,
      currentPage: page,
      perPage: perPage,
    }

    fs.readdir(dir, function (err, files) { 
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
          }
          files.forEach(function (file) {
            let filepath = dir + '/' + file;

            let rawdata = fs.readFileSync(filepath);
            let person = JSON.parse(rawdata);
            
            let label = person._label;
            let filename = file;
            let id = file.split('.')[0];

            let id_uri = person.id.split(/\:\d*/)[2]
            
            
            events.push({id:id,filename:filename,label:label, id_uri:id_uri});
            counter = counter + 1;
            if (counter > perPage){
              let all_events = { meta: meta, result: events };
              res.status(200).json(all_events);
              exit
            }
          });
            
          
    
       
    });
    
   

}




