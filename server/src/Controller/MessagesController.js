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
    console.log(messages,'messageshere')
    const projectedMessages = messages.map((msg) => {
      return {
        fromSelf: msg.sender.toString() === from,
        message: msg.message.text,
      };
    });
    console.log(projectedMessages,'pmsg')
    res.json(projectedMessages);
    }catch(err){console.log(err.message)
        res.status(500).send({message:"Error"})
    }
}

exports.addMessage = async (req, res) => {
  try {
    const { from, to, message } = req.body;console.log('very',from,to,message)

    const data = new Messages({
      message: { text: message },
      users: [from, to],
      sender: from,
    });
    
    console.log('here1',data); const messagedata = await data.save();
    if (messagedata) return res.json({ msg: "Message added successfully." });
    else return res.json({ msg: "Failed to add message to the database" });
  } catch (ex) {console.log(ex)
    res.status(500).send({message:"Error"})
  }
};