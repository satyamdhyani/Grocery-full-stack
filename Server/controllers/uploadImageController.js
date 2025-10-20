import uploadImageCloudinary from "../utils/uploadImageCloudinary.js"

export const uploadImageController =async(request,response)=>{
    try{
        const file = request.file

        const uploadImage = await uploadImageCloudinary(file)

        return response.json({
            message : "upload done",
            data : uploadImage,
            success : true,
            error : false,
        })

        

    }catch(error){
        return response.status(500).json({
            message : error.message || error,
            error : true,
            success : false

        })
    }
}




export const uploadMultipleImages = async (req, res) => {
  try {
    const files = req.files;
    const results = [];

    for (const file of files) {
      const uploaded = await uploadImageCloudinary(file);
      results.push(uploaded);
    }

    res.json({
      success: true,
      message: "Images uploaded successfully",
      data: results,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};






export default uploadImageController