// server.js
const express = require("express");
const { exec } = require("child_process");
const FormData = require("form-data");
const fs = require("fs");
const axios = require("axios");
const app = express();
const PORT = 3000;
app.use(express.json());

// 允许跨域访问
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 定义接口，用于执行本地脚本
app.get("/render", (req, res) => {
  console.log("收到请求", req.query);
  res.send(`get请求弃用:`);

  // exec(
  //   `npx remotion render ${templateCode} out/${videoName}.mp4 --props ${JSON.stringify(props)}`,
  //   (error, stdout, stderr) => {
  //     if (error) {
  //       console.error(`执行错误: ${error}`);
  //       return res.status(500).send(`Error: ${error.message}`);
  //     }

  //     if (stderr) {
  //       console.error(`脚本标准错误输出: ${stderr}`);
  //       return res.status(500).send(`Script Error: ${stderr}`);
  //     }

  //     // 脚本执行成功，返回输出
  //     res.send(`脚本输出成功: ${stdout}`);
  //   }
  // );
});

// 定义POSt接口，用于执行本地脚本
app.post("/render", (req, res) => {
  // console.log("收到请求", req.body);
  const { requestId,templateCode, props, videoName } = req.body;
  const renderStart = new Date();
  console.log(`开始处理请求,requestId: ${requestId}, templateCodee: ${templateCode}, videoName: ${videoName}`);
  totalDurationInFrames = props.totalDuration * props.fps,
  exec(
    `npx remotion render ${templateCode} out/${videoName}.mp4 --props '${JSON.stringify(props)}'`,
    (error, stdout, stderr) => {
      if (error) {
        console.error(`执行错误: ${error}`);
        return res.status(500).send({requestId:requestId, code:500, errorMsg:`${error.message}`});
      }

      if (stderr) {
        console.error(`脚本标准错误输出: ${stderr}`);
        return res.status(500).send({requestId:requestId, code:500, errorMsg:`${stderr}`});
      }

      const renderEnd = new Date();
      const renderDuration = renderEnd - renderStart;
      console.log(`视频渲染成功, 耗时: ${renderDuration}ms`);

      // 发送 POST 请求
      axios({
        url: "https://360-dev.byering.com/ai/dialog/config/getOssGeneratePolicyVideo",
        method: "get"
      }).then((results) => {
        const { entity: config } = results.data;
        // console.log("config", config);
        const uploadVideoName = videoName + ".mp4";
        if (config) {
          const data = fs.createReadStream("./out/" + uploadVideoName);
          const formData = new FormData();
          formData.append("key", `${config.key}${uploadVideoName}`);
          formData.append("policy", config.policy);
          formData.append("OSSAccessKeyId", config.accessId);
          formData.append("Signature", config.signature);
          formData.append("file", data);
          axios({
            method: "post",
            url: config.host,
            data: formData
          })
            .then(() => {
              const uploadEnd = new Date();
              const uploadDuration = uploadEnd - renderEnd;
              console.log(`视频上传成功, 耗时: ${uploadDuration}ms`, config.url + uploadVideoName);

              res.send({requestId:requestId,code:200,url:config.url + uploadVideoName});
              console.log("视频地址:", config.url + uploadVideoName);
            })
            .catch((err) => {
              res.send({requestId:requestId,code:500,errorMsg:err.errorMsg});
              console.log("视频上传失败", err);
            });
        }
      });
    }
  );
});

app.listen(PORT, () => {
  console.log(`服务器在 http://localhost:${PORT} 上运行`);
});
