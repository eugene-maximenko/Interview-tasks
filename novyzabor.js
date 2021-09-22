/* Create an application that will convert text-based configuration format into json.

The application should accept input as file or a stdin-stream and print result into stdout.

Sample input:

config = 3
config_b.items = item1
config_b.items = item2
config_b.items.named_item = 123
config_c.root.a.b.c = 13

/*/ /*
Expected output for sample input:
{
   "config":3,
   "config_b":{
      "items":{
         
         "0":"item1",
         "1":"item2",

         "named_item":123
      }
   },
   "config_c":{
      "root":{
        "a":{
            "b": {
                "c":13
             }
         }
      }
   }
} */

let counterObject = {}
let objectForJSON = {}

const set = (obj, path, val) => {

   // Split the path
   let keys = path.split('.');

   // Last key
   const lastKey = keys.pop();

   // Key before last
   let lastObj = keys.reduce((obj, key) =>
      obj[key] = obj[key] || {},
      obj);

   // Path already exists
   if (counterObject.hasOwnProperty(path)) {

      counterObject[path]++

      // Fix the first replacement
      if (counterObject[path] === 1) {
         lastObj[lastKey] = {
            "0": lastObj[lastKey],
            "1": val

         }
         // Fix all the others replacement
      } else {
         lastObj[lastKey][counterObject[path]] = val
      }

      // Add first value
   } else {
      counterObject[path] = 0
      lastObj[lastKey] = val;
   }
};

function addToObject(line) {

   const splitedLine = line.split(" ")
   const key = splitedLine[0]
   const value = splitedLine[2]

   set(objectForJSON, key, value)

}

addToObject('config = 3')
addToObject('config_b.items = item1')
addToObject('config_b.items = item2')
addToObject('config_b.items.named_item = 123')
addToObject('config_c.root.a.b.c = 13')

console.log(JSON.stringify(objectForJSON))