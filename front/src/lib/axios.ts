// lib/axios.ts
import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // 環境変数から API ベースURLを取得
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 必要に応じて Cookie を送信
});

export default apiClient;
