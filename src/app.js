// server.js
const express = require("express");
const { exec } = require("child_process");
const app = express();
const PORT = 3000;

// 允许跨域访问
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 定义接口，用于执行本地脚本
app.get("/downLoad", (req, res) => {
  console.log("收到请求", req.query,);
  const {model,props,videoName} =req.query;

  // return;
  exec(
    'npx remotion render '+ model+' out/'+ videoName+'.mp4 --props '+ JSON.stringify(props),
    (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return res.status(500).send(`Error: ${error.message}`);
      }

      if (stderr) {
        console.error(`脚本标准错误输出: ${stderr}`);
        return res.status(500).send(`Script Error: ${stderr}`);
      }

      // 脚本执行成功，返回输出
      res.send(`脚本输出成功: ${stdout}`);
    }
  );
});

app.listen(PORT, () => {
  console.log(`服务器在 http://localhost:${PORT} 上运行`);
});
