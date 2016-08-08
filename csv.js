"use strict";

/**
 * read csv file 
 * Author: yehuya
 */

var fs = require('fs');
var exports = module.exports;

/**
 * read csv file
 * @param String (file location)
 * @param String (type of output)
 * @return Array of Array OR retrun Array of Objects
 */
exports.readCsv = function(dir, output, callback){
    var read = fs.readFile(dir, function(err, data){
        if(err){
            return console.log(err)
        }

        var newData;
        if(output == 'array'){
            newData = exports.csvDataArray(data);
        }else if(output == 'object'){
            newData = exports.csvDataObject(data);
        }

        if(typeof callback == 'function'){
            callback(newData);
        }
    });
}

/**
 * read csv file
 * @param String (file location)
 * @param String (type of output)
 * @return Array of Array OR retrun Array of Objects
 */
exports.readCsvSync = function(dir, output){
    var read = fs.readFileSync(dir);
    
    if(read){
        var newData;
        if(output == 'array'){
            newData = exports.csvDataArray(read);
        }else if(output == 'object'){
            newData = exports.csvDataObject(read);
        }
        
        return newData;
    }
}

/**
 * get data from csv and retrurn it as Array of Arrays
 * @param Buffer (from csv readFile)
 * @return Array of Array
 */
exports.csvDataArray = function(data){
    var newData = data.toString();
    var row = newData.split('\n');
    var col = [];

    row.forEach(function(arr){
        col.push(arr.split(','));
    });
    
    return col;
}

/**
 * gat data from csv and retrun it as Array of Objects
 * the objects properties came from first line in the csv file
 * @param Buffer (from csv readFile)
 * @return Array of Objects
 */
exports.csvDataObject = function(data){
    var theData = exports.csvDataArray(data);
    var prop = theData[0];
    var objects = [];

    var obj = {};
    for(let i = 0 ; i < prop.length ; i ++){
        obj[prop[i]] = null;
    }

    var keys = Object.keys(obj).sort();
    for(let i = 1 ; i < theData.length ; i++){
        let newObj = Object.create(obj);
        let col = theData[i];

        col.forEach(function(element, index) {
            newObj[keys[index]] = element;
        });

        objects.push(newObj);
    }
  
    return objects;
}
