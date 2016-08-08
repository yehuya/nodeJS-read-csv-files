# Read csv file (node.js)
Node module for reading csv file.
The output will be Array or Object.

## readCsv()
<code>
x.readCsv(dir, output, callback)
</code>
* @dir - file location
* @output - the type of the data output Array or Objects
* @callback - callback function - with the data

## readCsvSync()
Synchronous version of readCsv() function

<code>
var data = x.readCsvSync(dir, output);
</code>

### @output
Output param has only two options:
* 'array'
* 'object'

The 'object' option take the first line and set the columns as Object properties for the other lines
