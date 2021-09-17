/* Create an application that will convert text-based configuration format into json.

The application should accept input as file or a stdin-stream and print result into stdout.

Sample input:

config = 3
config_b.items = item1
config_b.items = item2
config_b.items.named_item = 123
config_c.root.a.b.c = 13

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

/*


*/

process.stdin.resume();
process.stdin.setEncoding('utf8');

var readline = require('readline');
var rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout,
   terminal: false
});

let object = {}

rl.on('line', function count(line) {

})