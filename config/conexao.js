import dns from "node:dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import mongoose from "mongoose";
//const url = "mongodb+srv://marcelosiedler:ifsul@ifsul.fify4.mongodb.net/"
const url = "mongodb+srv://siedler:123@202501.4vrdj.mongodb.net/?appName=202501"
const conexao = await mongoose.connect(url)

export default conexao