export const uploadFile = async (req, res) => {
    let file = req.file
    try{
        if(file){
            return res.status(200).json({message: "Uploaded Successfully!"})
        }else{
            return res.status(400).json({message: "No file uploaded"})
        }
    }catch(error){
        return res.status(404).json({message: error.message})
    }
}