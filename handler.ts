import { APIGatewayEvent } from "aws-lambda";
import "source-map-support/register";
import { okResponse, errorResponse } from "./src/utils/responses";
import { excel } from "./src/utils/excel";
import { sample } from './src/stub/sample';
import { ingredients } from "./src/interface/ingredients";
import { uploadToS3, getS3SignedUrl } from "./src/utils/awsWrapper";
export const jsontoxlsx = async (
  _event: APIGatewayEvent,
  _context
) => {

  try {
     
    //add this data to a an excel sheet and upload to s3
    const excelSheet = await saveDataAsExcel(sample);
    const objectKey = `json_to_xlsx_${new Date().getTime()}`;
    await uploadToS3({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${objectKey}.xlsx`,
      ContentType:
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      Body: await excelSheet.workbook.xlsx.writeBuffer()
    });
    
    //Get signed url with an expiry date
    let downloadURL = await getS3SignedUrl({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `${objectKey}.xlsx`,
      Expires: 3600 //this is 60 minutes, change as per your requirements
    });

    return okResponse({
      message: 'JSON to XLSX is complete, you can download your file now',
      downloadURL
    })
   
  } catch (error) {
    return errorResponse(error);
  }
};

/**
 * 
 * @param sample 
 * @returns excel
 */
 async function saveDataAsExcel(sample: ingredients[]) {
  const workbook:excel = new excel({ headerRowFillColor: '046917', defaultFillColor: 'FFFFFF' });
  let worksheet = await workbook.addWorkSheet({ title: 'Scrapped data' });
  workbook.addHeaderRow(worksheet, [
    "ID",
    "Type",
    "Name",
    "PPU",
    "Batter ID",
    "Batter Name",
    "Topping ID",
    "Topping Name"
  ]);

   for (let ingredient of sample) {
    workbook.addRow(
      worksheet,
      [
        ingredient.id.toString(),
        ingredient.type,
        ingredient.name,
        ingredient.ppu.toString()
      ],
      { bold: false, fillColor: "ffffff" }
    );
  
     let size:number = ingredient.batters.length > ingredient.toppings.length ? ingredient.batters.length : ingredient.toppings.length;  
     
     for (let i = 0; i < size; i++)  {
      workbook.addRow(
        worksheet,
        [
          '', '', '', '',
          ingredient.batters[i]?.id.toString(),
          ingredient.batters[i]?.type,
          ingredient.toppings[i]?.id.toString(),
          ingredient.toppings[i]?.type
        ],
        { bold: false, fillColor: "ffffff" }
      );
    }
  }

  return workbook; 
}