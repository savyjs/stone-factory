import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env:{
    NEXT_PUBLIC_SITE_URL: process?.env?.NEXT_PUBLIC_SITE_URL,
    CONTACT_TO_EMAIL: process?.env?.CONTACT_TO_EMAIL,
    TELEGRAM_BOT_TOKEN: process?.env?.TELEGRAM_BOT_TOKEN,
    TELEGRAM_CHAT_ID: process?.env?.TELEGRAM_CHAT_ID,
  }
};

export default nextConfig;
