export const deleteFile = async (req, res) => {
    try{
        console.log('deleteApi is working')
        return res.status(200).json({message: "Deleted Successfully!"})
    }catch(error){
        return res.status(404).json({message: error.message})
    }
}