export const fileUpload = async (file)=>{

    const cloudUrl = 'https://api.cloudinary.com/v1_1/dcjwqzyyj/upload';
    const formData = new FormData();
    formData.append('upload_preset','React-Journal');
    formData.append('file',file);

    try{

     const resp = await fetch(cloudUrl,{
         method:'POST',
         body : formData
     });

     if(resp.ok){
         const cloudResp = await resp.json();
         return  cloudResp.secure_url;
     }else{
        return await resp.json();
     }

    }catch(error){
        return error;
     //throw error;
        //console.log(error);
    }
}