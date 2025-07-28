export const updateFile = async (req, res) => {
    try{
        console.log('updateApi is working')
        return res.status(200).json({message: "Updated Successfully!"})
    }catch(error){
        return res.status(404).json({message: error.message})
    }
}