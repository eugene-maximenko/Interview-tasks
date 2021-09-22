// Useful link https://heynode.com/blog/2020-02/reading-and-writing-csv-files-nodejs/
const fs = require('fs')
const csv = require('csv-parser')

fs.createReadStream('users1.csv')
    .pipe(csv({
        separator: "|"
    }))
    .on('data', function (row) {

        let user = {
            name: `${row['first_name']} ${row['last_name']}`,
            phone: row.phone.match(/\d+/g).join(''),
            person: {
                firstName: {
                    type: row['first_name']
                },
                lastName: {
                    type: row['last_name']
                },
            },
            amount: Math.round(parseFloat(row.amount) * 100) / 100,
            date: formatDate(row.date.split("/").reverse().join("-")),
            costCenterNum: row.cc.match(/\d+/)[0]
        }

        // Stringify data
        const userJSON = JSON.stringify(user);

        // Write data into file
        fs.writeFileSync('users.json', userJSON)

    })

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}