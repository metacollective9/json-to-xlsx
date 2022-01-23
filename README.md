# json-to-xslx
A simple lambda function to take a json object and store it on s3 in .xlsx format. 

This repo uses these packages - 
* serverless-local to run lambda locally (https://www.npmjs.com/package/serverless-local)
* exceljs to create workbook and sheet (https://www.npmjs.com/package/exceljs)
* aws-sdk to store on s3 and create signed url (https://www.npmjs.com/package/@aws-sdk/types)


# Install

```javascript
   npm install 
```

# Run

```javascript
   npm start 
```

# Test

```javascript
   npm test 
```

# Notes
At the moment, serverless.ts does not support access to aws system manager's parameter store. I have raised an issue here - https://github.com/serverless/typescript/issues/59

