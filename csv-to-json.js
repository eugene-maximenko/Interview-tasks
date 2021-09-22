const fs = require('fs')
const csv = require('csv-parser')
const people = []

fs.createReadStream('users1.csv')
    .pipe(csv({
        separator: "|"
    }))
    .on('data', function (row) {

        let user = {
            name: `${row['first_name']} ${row['last_name']}`,
            // phone: ,
            // person: {
            //     firstName: {
            //         type: 
            //     },
            //     lastName: {
            //         type: 
            //     },
            // },
            // amount: ,
            // date: ,
            // costCenterNum: 
        }

        
        console.log(user)

    })