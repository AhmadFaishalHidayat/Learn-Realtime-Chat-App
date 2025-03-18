import User from "../models/user.model.js";
import Message from "../models/message.model.js";

export default class messageController {
  static async getUserForSideBar(req, res) {
    try {
      const loggedUserId = req.user._id;
      const filteredUsers = await User.find({
        _id: { $ne: loggedUserId },
      }).select("-password");
      res.status(200).json(filteredUsers);
    } catch (error) {
      console.log("Error in getUserForSideBar controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async getMessages(req, res) {
    try {
      const { id: userToChatId } = req.params;
      if (!userToChatId) {
        return res.status(400).json({ message: "User Id is required" });
      }

      const myId = req.user._id;
      if (!myId) {
        return res.status(400).json({ message: "Sender Id is required" });
      }

      const message = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      });
      res.status(200).json(message);
    } catch (error) {
      console.log("Error in getMessages controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  static async sendMessage(req, res) {
    try {
      const { text, image } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user._id;

      if (!text && !image) {
        return res.status(400).json({ message: "Message is required" });
      }

      let imageUrl;
      if (image) {
        // upload base64 image to cloudinary
        const uploadResponse = await cloudinary.uploader.upload(image);
        imageUrl = uploadResponse.secure_url;
      }

      const newMessage = new Message({
        senderId,
        receiverId,
        text,
        image: imageUrl,
      });
      await newMessage.save();

      // todo: realtime functionally goes here => socket.io
      // yourcode socket.io
      //
      //
      res.status(201).json(newMessage);
    } catch (error) {
      console.log("Error in sendMessage controller", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
