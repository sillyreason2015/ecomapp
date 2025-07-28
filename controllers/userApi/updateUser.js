import User from '../../Schema/userSchema.js'

export const updateUser = async (req, res) => {
    const {id} = req.params
    const reqId = req.user._id
    const {username, email, password}= req.body
    if(id === reqId){
    try{
        const user = await User.findByIdAndUpdate(id, req.body)
        res.status(200).json({message: "User updated successfully"})
    }catch(error){
        res.status(500).json(error)
    }
    }else{
        return res.status(401).json({message: "You are not authorized to edit this user"})
    }
}

export const editProfile = async (req, res) => {
    const { id } = req.params
    const reqId = req.user._id
    const { country, Number, Street, Bio } = req.body
    if (id === reqId) {
        try {
            await User.findByIdAndUpdate(id, {
                $set: {
                    'profile.country': country,
                    'profile.Number': Number,
                    'profile.Street': Street,
                    'profile.Bio': Bio
                }
            }, { new: true })
            res.status(200).json({message: 'User updated successfully'})
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
      return res.status(401).json({ message: "You are not authorized to edit this user" })
    }
   
}
