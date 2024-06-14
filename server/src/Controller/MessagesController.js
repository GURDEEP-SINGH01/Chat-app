const Messages = require("../Model/Messages");
const mongoose=require('mongoose')

exports.getMessage=async(req,res)=>{
    try{
    const { from, to } = req.body;
    if (!mongoose.Types.ObjectId.isValid(from) || !mongoose.Types.ObjectId.isValid(to)) {
      return res.status(400).send({ message: "Invalid sender or recipient ID" });
    } 
    const fromObjectId = new mongoose.Types.ObjectId(from);
    const toObjectId = new mongoose.Types.ObjectId(to);
    const messages = await Messages.find({
            $or: [
        { users: [fromObjectId, toObjectId] },
        { users: [toObjectId, fromObjectId] }
      ]
    }).sort({ updatedAt: 1 });
    // console.log(messages,'messageshere')
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    res.json(projectedMessages);
    }catch(err){
        res.status(500).send({message:"Error cant get message"})
    }
}

exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;

    const data = new Messages({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    
    const messagedata = await data.save();
    if (messagedata) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {
    res.status(500).send({message:"Error cant send message"})
  }
};
exports.findlast=async(req,res)=>{
  try{
    const {from,to}=req.body;
    const fromObjectId = new mongoose.Types.ObjectId(from);
    const toObjectId = new mongoose.Types.ObjectId(to);
    const recentMessage = await Messages.deleteOne({
            $or: [
        { users: [fromObjectId, toObjectId] },
        { users: [toObjectId, fromObjectId] }
      ]
    }).sort({ createdAt: 1 });
    console.log(recentMessage)
    if (recentMessage) {
      res.json(recentMessage);
    } else {
      res.status(404).json({ message: 'No messages found' });
    }
  }catch(err){
    res.status(500).json({ error: err.message });
  }
}