
const User=require('../Model/User');
exports.signUp=async (req, res) => {
    try {
        const user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        friends:[]
        });

        const newUser = await user.save();
        res.status(201).json({message:"created",newUser});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

exports.signIn = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      res.json({ success: true, message: 'Sign-in successful',body:user });
    } else {
      res.json({ success: false, message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

exports.allUsers = async (req,res) => {
 try {console.log('finding')
    const {getUsers}=req.params
    const users = await User.find({ username: { $regex: getUsers, $options: 'i' } });console.log(users,getUsers,'users')
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
