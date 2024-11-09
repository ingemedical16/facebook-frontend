import { CLOUD_KEY, CLOUD_NAME, CLOUD_SECRET } from '@/cloud-config';
import { v2 as cloudinary } from 'cloudinary'
import {File} from 'formidable';



cloudinary.config({
    cloud_name: CLOUD_NAME,
    api_key: CLOUD_KEY,
    api_secret: CLOUD_SECRET,
    secure: true
})

export default async (files:File|File[],folder:string,)=>{

    if(Array.isArray(files)){
        let allImageUrl:string[] = [];
        const imagesToUpload = files.map((file:File) => {
            return async () => {
              const result = await cloudinary.uploader.upload(file.filepath, { folder: folder});
              allImageUrl = [...allImageUrl,result.url];
            }
          });
          
          let uploads = await Promise.all(imagesToUpload);
          for(let i=0;uploads[i];i++){
            await uploads[i]()
          }
       
         return allImageUrl
       
    }else{
        const result = await cloudinary.uploader.upload(files.filepath, { folder: folder})
        return{...result}
    }

}