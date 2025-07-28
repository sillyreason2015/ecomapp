import User from '../../Schema/userSchema.js'


export const getAllUsers = async (req, res) => {
    try{
        const users = await User.find()
        res.status(200).json(users)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}




export const getUser = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({message: error.message})
    }
}

export const getByQueryParams = async (req, res) => {
    const {username, email} = req.query 
    const filter = {}
    if (username) filter.username = username
    if (email) filter.email = email

    try{
        const user = await User.find(filter)
        res.status(200).json(user)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
}
