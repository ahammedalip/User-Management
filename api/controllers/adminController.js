import User from "../models/userModel.js"


export const test = (req, res)=>{
    console.log('coming here')
    res.status(200).json('messagesucess ldkfjslkdj')
} 

export const userlist = async (req, res) =>{
    console.log('comin here');
    try {
        const userlist = await User.find();
        console.log('herer',userlist);
        res.status(200).json(userlist);
    } catch (error) {
        console.log(error);
    }
}

export const makeAdmin = async( req, res) =>{
    console.log('coming at make admin')
    const {id} = req.params;
    console.log('id----',id)
    try {
        // const user = await User.findByIdAndUpdate(id,{role:"Admin"},{new:true})
        // if (!user) {
        //     return res.status(404).json({ success: false, message: 'User not found' });
        //   }
        // // console.log('detalils',user);
        const user = await User.findById(id);
        if(!user){
            return res.status(404).json({success:false,message: 'user not found'})
        }
        user.role = user.role === 'Admin' ? 'User' : 'Admin';

        // Save the updated user
        const updatedUser = await user.save();
        res.status(200).json({ success: true, updatedUser });
        
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}