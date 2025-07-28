import User from '../../Schema/userSchema.js'

export const deleteUser = async (req, res) => {
    const {id} = req.params
    const {_id, admin} = req.user
    if(_id.toString() === id || admin === true){
    try{
        await User.findByIdAndDelete(id)
        res.status(200).json({message: 'user deleted successfully'})
    }catch(error){
        res.status(500).json(error)
    }
}else{
    return res.status(401).json({message: "You are not authorized to delete this user"})
}
}

