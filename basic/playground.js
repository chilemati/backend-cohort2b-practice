const { arr } = require("./basic/data");
const fs = require('fs');
const os = require('os');

let Name = 'Chile';

console.log(arr.length)
console.log(Name)
console.log(os.platform())
console.log(os.version())

// fs

// create a file
// fs.writeFile('./test1.txt','Hello World',(err)=> {
//     if(err) {
//         console.log('an eror occured')
//     }
//     console.log('successfull!')
// })

// read a file
fs.readFile('./test1.txt',(err,data)=> {
    if(err) {
        console.log('an eror occured')
    }
    console.log(data.toString())
})
// create folder with fs
fs.mkdir('./test',()=>{
    console.log('new folder created')
});

// delete folder
fs.rmdir('./test',()=>{
    console.log('new folder created')
});
