const Message = require('../models/messages');
var moment = require('moment');

const getSentMessages = async (req, res) => {
    let sender =  req.user.username; 
    let receiver = req.query.receiver;
    const msgs = await Message.getMessages(sender, receiver);
    const projectedMessages = msgs.map((msg) => {  
        return {
          fromSelf: msg.sender.toString() === sender,
          message: msg.content,
          updatedAt: moment(msg.updatedAt).format("YYYY-MM-DD HH:mm") ,
        };
      });
    res.json(projectedMessages);
};

const sendMessage = async (req, res) => {
    let msg = {
        sender: req.user.username,
        receiver: req.body.receiver,
        content: req.body.content
    } 
    try {
        await Message.add(msg);
        res.sendStatus(200);
    }
    catch (err) { console.log(`Failed: ${err}`) }
}


module.exports = {
    sendMessage,
    getSentMessages
};