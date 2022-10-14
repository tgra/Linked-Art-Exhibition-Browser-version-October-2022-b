import type { NextApiRequest, NextApiResponse } from 'next'

import { exit } from 'process';

var fs = require('fs');


function get_gender(person){
  var return_value = "";
  if ("classified_as" in person){
    person.classified_as.forEach(function (type) {   
      if (type.classified_as[0]._label == "Gender"){ return_value = type._label;}
       })}
  return return_value;
}

function get_nationality(person){
  var return_value = "";
  if ("classified_as" in person){
    person.classified_as.forEach(function (type) { 
      if (type.classified_as[0]._label == "Nationality"){ return_value = type._label;}
       })}
  return return_value;
}


export default function handler(req: NextApiRequest, res: NextApiResponse) {
    
    let dir = process.env.PERSON_DATA_PATH;
    let persons = [];
    let meta = {
        success: true,
        totalCount: 0,
      }
    
    fs.readdir(dir, function (err, files) { 
        if (err) {
            console.error("Could not list the directory.", err);
            process.exit(1);
          }
          
          // total number of files in dir
          meta.totalCount = files.length;


          files.forEach(function (file) {

              let filepath = dir + '/' + file;

              let rawdata = fs.readFileSync(filepath);
              let person = JSON.parse(rawdata);
              
              let label = person._label;

              let name = ("identified_by" in person && person.identified_by[0].type == 'Name' ) ? person.identified_by[0].content : ""
              let filename = file;
              let id = file.split('.')[0];

              let id_uri = person.id.split(/\:\d*/)[2]

              let gender = get_gender(person)
              let nationality = get_nationality(person)
              
              

              let born = (("born" in person) &&  ("timespan" in person.born)) ?  person.born.timespan.identified_by[0].content : ""
              let died = (("died" in person) &&  ("timespan" in person.died)) ?  person.died.timespan.identified_by[0].content : ""


              
              persons.push({id:id,filename:filename,label:label, id_uri:id_uri, name:name, born: born, died: died, gender:gender,nationality:nationality});
               

          });
            
          let all_persons = { meta: meta, result: persons };
              res.status(200).json(all_persons);
              exit 
    
       
    });
    
   

}




