// server.js
const express = require("express");
const { exec } = require("child_process");
const FormData = require("form-data");
const https = require("https");
const OSS = require("ali-oss");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3001;
app.use(express.json());

// 允许跨域访问
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// 定义接口，用于执行本地脚本
app.get("/downLoad", (req, res) => {
  console.log("收到请求", req.query);
  const { model, props } = req.query;
  const videoName = "298534.jpg";
  const data = fs.createReadStream("./out/" + videoName);
  // console.log("同步读取: " + data);
  const config = {
    accessId: "LTAI5tMxvwWhMh4oK8HTLtqZ",
    policy:
      "eyJleHBpcmF0aW9uIjoiMjAyNC0wOS0yNlQxMTo0NzoxMS43NzRaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ2aWRlby9yZW5kZXIvMjAyNC0wOS0yNi8zNjIzMjI5ODcxNTk3NjQ5OTIiXV19",
    signature: "z/G220j0fb0BKqSIbal5DJS+pkI=",
    host: "https://open2other.oss-cn-hangzhou.aliyuncs.com/",
    expire: "1727351231",
    callback: null,
    url: "https://open2other.oss-cn-hangzhou.aliyuncs.com/video/render/2024-09-26/362322987159764992/",
    key: "video/render/2024-09-26/362322987159764992/",
    shopName: null
  };
  const formData = new FormData();
  formData.append("key", `${config.key}${videoName}`);
  formData.append("policy", config.policy);
  formData.append("OSSAccessKeyId", config.accessId);
  formData.append("success_action_status", "200");
  formData.append("signature", config.signature);
  formData.append("file", data);
  console.log("formData", formData);
  fetch(config.host, {
    method: "POST",
    headers: { "content-type": "multipart/form-data" },
    body: formData
  }).then((res) => {
    console.log("文件已上传");
  });

  // exec(
  //   `npx remotion render ${model} out/${videoName}.mp4 --props ${JSON.stringify(props)}`,
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
app.post("/downLoad", (req, res) => {
  console.log("收到请求", req.body);
  const { model, props, videoName } = req.body;
  exec(
    `npx remotion render ${model} out/${videoName}.mp4 --props '${JSON.stringify(props)}'`,
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
