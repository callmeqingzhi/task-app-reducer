// axiosInstance.js
import axios from "axios";

// 创建一个 axios 实例
const axiosTask = axios.create({
  baseURL: "http://3.27.167.225:8080/", // 🔧 公共请求前缀，根据项目修改
  timeout: 5000, // ⏰ 请求超时时间（毫秒）
  headers: {
    "Content-Type": "application/json", // 📦 设置默认的请求头
  },
});

// 👉 请求拦截器（每次发送请求前自动执行）
axiosTask.interceptors.request.use(
  (config) => {
    // 例如：统一加上 token（如果有）
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error); // 请求错误
  }
);

// 👉 响应拦截器（每次收到响应时自动执行）
axiosTask.interceptors.response.use(
  (response) => {
    return response.data; // 💡 只返回真正的数据部分
  },
  (error) => {
    // ❗ 统一错误处理
    if (error.response) {
      if (error.response.status === 401) {
        alert("ログインの有効期限が切れました。再度ログインしてください。");
        // 例如：跳转到登录页
        // window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// 导出实例，在其他文件中复用
export default axiosTask;
