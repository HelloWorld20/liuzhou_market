import * as cos from "../modules/cos";
import * as formidable from "formidable";

const form = new formidable.IncomingForm();

// 单个文件上传
export const upload = async (req: any) => {
  const files: any = await new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  });
  // 上传成功后，会把该文件临时存储到files.file.path, 上传前文件名为 files.file.name
  return cos.upload(files.file.path, files.file.name);
};