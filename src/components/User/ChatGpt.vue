<template>
  <div>
    <div class="chat-container" v-show="!show" style="width: 400px;">
      <div style="display: flex;flex-direction: row-reverse;"> <el-button :icon="Close" size="large" @click="changeShow"
          circle />
      </div>
      <div style="  overflow-y: auto;">
        <div class="chat-box" v-for="(message, index) in messages" :key="index">
          <div class="message" :class="{ 'user-message': message.user, 'gpt-message': !message.user }">
            <p>{{ message.text }}</p>
          </div>
        </div>
      </div>
      <div class="input-container">
        <input v-model="userInput" @keyup.enter="sendMessage" placeholder="Type your message..."
          class="message-input" />
        <button @click="sendMessage" class="send-button">Send</button>
      </div>
    </div>
    <div v-show="show" style="justify-self: right;"> <el-button :icon="Service" size="large" @click="changeShow"
        circle />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Service, Close } from '@element-plus/icons-vue'
const show = ref(true)
const changeShow = () => {
  show.value = !show.value
}
import axios from 'axios';
import { ref } from 'vue';

const userInput = ref('');  // User's input message
const messages = ref<{ text: string, user: boolean }[]>([]);  // Store chat messages
const isLoading = ref(false)
const sendMessage = async () => {
  if (userInput.value.trim() === '') return;  // Don't send empty messages

  // Add user's message to chat
  messages.value.push({ text: userInput.value, user: true });
  const userMessage = userInput.value;
  userInput.value = '';  // Clear input field

  try {
    isLoading.value = true;  // 显示加载状态

    // 发送用户消息到后端并等待响应
    const response = await axios.post('http://localhost:3000/getAIResponse', { message: userMessage });

    // 获取 Kimi API 的返回数据
    const kimiMessage = response.data.response || 'Sorry, I didn\'t get that.';  // 根据 Kimi API 的响应结构调整

    // Add Kimi's response to chat
    messages.value.push({ text: kimiMessage, user: false });
  } catch (error) {
    console.error('Error communicating with Kimi:', error);
    messages.value.push({ text: 'Sorry, there was an error.', user: false });
  } finally {
    isLoading.value = false;  // 隐藏加载状态
  }
};


</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 400px;
  max-width: 500px;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
}

.chat-box {
  flex-grow: 1;
  margin-bottom: 10px;
  padding: 10px;
}

.message {
  max-width: 80%;
  margin-bottom: 10px;
  padding: 8px;
  border-radius: 4px;
}

.user-message {
  background-color: #d0f0c0;
  align-self: flex-end;
}

.gpt-message {
  background-color: #f0f0f0;
  align-self: flex-start;
}

.input-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.message-input {
  width: 80%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.send-button {
  width: 15%;
  padding: 8px;
  border: none;
  border-radius: 4px;
  background-color: #4CAF50;
  color: white;
  cursor: pointer;
}

.send-button:hover {
  background-color: #45a049;
}
</style>
