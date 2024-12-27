const express = require('express');
const cors = require('cors');
const { OpenAI } = require('openai');
const app = express();
const port = 3000;

// 启用 CORS，允许来自 http://localhost:5173 的请求
app.use(cors({ origin: 'http://localhost:5173' }));

// 解析 JSON 请求体
app.use(express.json());

// 初始化 OpenAI 客户端
const client = new OpenAI({
  apiKey: "sk-1w8RLghiDctD6UN9sMGloRbx3nqgy4OfcJ85PxvYbxjAXK7i", // 请替换为实际的 API 密钥
  baseURL: "https://api.moonshot.cn/v1",
});

// 定义路由处理请求
app.post('/getAIResponse', async (req, res) => {
  const userMessage = req.body.message || '';
  if (!userMessage) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const completion = await client.chat.completions.create({
      model: "moonshot-v1-8k",
      messages: [
        { "role": "system", "content": "你是 Kimi，由 Moonshot AI 提供的人工智能助手，你更擅长中文和英文的对话。你会为用户提供安全，有帮助，准确的回答。同时，你会拒绝一切涉及恐怖主义，种族歧视，黄色暴力等问题的回答。Moonshot AI 为专有名词，不可翻译成其他语言。" },
        { "role": "user", "content": userMessage }
      ],
      temperature: 0.3,
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Error fetching completion:', error);
    res.status(500).json({ error: 'An error occurred while processing the request.' });
  }
});

// 启动服务器
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});


