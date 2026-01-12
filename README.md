# Finance Platform 好金主 SaaS 平台 💰

> 一個現代化的財務管理平台，使用 **Next.js**、**React** 與 **TypeScript** 開發，整合 Serverless 資料庫、即時 UI 與完善的身份驗證。專為展示前後端開發能力與團隊協作技能而設計。

## 目錄

* [Demo](#demo)
* [功能特色](#功能特色)
* [技術棧](#技術棧)
* [專案結構](#專案結構)
* [安裝與啟動](#安裝與啟動)
* [執行腳本](#執行腳本)
* [本專案亮點](#本專案亮點)
* [貢獻方式](#貢獻方式)
* [授權](#授權)

---

## Demo

> **網址：**[好金主 SaaS 平台](https://finance-platform-theta.vercel.app/)
>
> **圖片：**
> 
> <img width="50%" height="50%" alt="finance001" src="https://github.com/user-attachments/assets/9999c8d9-4fb1-4bc3-9d79-32e294e2e155" />
> <img width="50%" height="50%" alt="finance002" src="https://github.com/user-attachments/assets/448327c6-2e3a-4749-b0a3-b8a8f2dcfe35" />
> <img width="50%" height="50%" alt="finance003" src="https://github.com/user-attachments/assets/c5813b65-7177-479b-8147-131ea2d2bc52" />

---

## 功能特色

* ✅ **使用者身份驗證**：整合 [Clerk](https://clerk.com/)
* ✅ **Serverless 資料庫**：使用 [Neon Database](https://neon.tech/) + [Drizzle ORM](https://orm.drizzle.team/)
* ✅ **動態表單與驗證**：React Hook Form + Zod
* ✅ **互動式資料視覺化**：使用 [Recharts](https://recharts.org/)
* ✅ **響應式 UI 元件**：Radix UI + TailwindCSS
* ✅ **主題切換功能**：Next Themes
* ✅ **動畫與 UI 增強**：TailwindCSS + Tw Animate CSS
* ✅ **貨幣輸入與日期選擇器**
* ✅ **Serverless API**：使用 [Hono](https://hono.dev/)

此專案展示了：

* **前端架構能力**：建立可重用的 React 元件
* **全端整合能力**：Serverless 資料庫與 API
* **專業表單處理與驗證**
* **資料視覺化能力**
* **團隊合作與可擴充架構思維**

---

## 技術棧

* **前端**：React 19、Next.js 15、TypeScript、TailwindCSS
* **狀態管理**：Zustand、React Query
* **UI 元件**：Radix UI、Sonner、Lucide Icons
* **表單與驗證**：React Hook Form、Zod、@hookform/resolvers
* **資料庫 & ORM**：Neon Database (PostgreSQL)、Drizzle ORM
* **Serverless 後端**：Hono framework
* **其他工具**：date-fns、query-string、react-countup、react-currency-input-field、react-select、react-day-picker

---

## 專案結構

```text
finance-platform/
├─ db/                   # 資料庫 schema 與 migration
├─ drizzle/              # Drizzle ORM 生成類型
├─ src/
│  ├─ components/        # 可重用元件
│  ├─ hooks/             # 自訂 React hooks
│  ├─ pages/             # Next.js 頁面
│  ├─ styles/            # TailwindCSS 與全域樣式
│  └─ utils/             # 工具函式
├─ public/               # 靜態資源
├─ package.json
└─ tsconfig.json
```

---

## 安裝與啟動

1. **Clone 專案**

```bash
git clone https://github.com/yourusername/finance-platform.git
cd finance-platform
```

2. **安裝依賴**

```bash
npm install
```

3. **建立環境變數**

建立 `.env` 文件，參考 `.env.example`：

```env
DATABASE_URL=你的資料庫連線
CLERK_FRONTEND_API=你的Clerk前端API
CLERK_API_KEY=你的Clerk API金鑰
```

4. **啟動開發伺服器**

```bash
npm run dev
```

5. **生成 Drizzle ORM 類型 (可選)**

```bash
npm run db:generate
```

---

## 執行腳本

| 指令                    | 說明                          |
| --------------------- | --------------------------- |
| `npm run dev`         | 開發模式啟動 Next.js (Turbopack)  |
| `npm run build`       | 建置專案                        |
| `npm run start`       | 啟動正式伺服器                     |
| `npm run lint`        | 執行 ESLint                   |
| `npm run db:generate` | 根據 schema 生成 Drizzle ORM 類型 |
| `npm run db:studio`   | 開啟 Drizzle Studio 進行資料庫管理   |

---

## 本專案亮點

* **前端架構設計**

  * 可重用、可擴充的 React 元件設計
  * 模組化專案結構，方便團隊協作

* **全端整合與 Serverless 能力**

  * 使用 Hono 建立 serverless API
  * 使用 Drizzle ORM + Neon Serverless DB，掌握資料庫操作流程

* **表單處理與資料驗證專業能力**

  * React Hook Form + Zod，確保資料完整性與安全性
  * 多種複雜表單設計能力

* **資料視覺化與互動設計能力**

  * Recharts 互動圖表整合
  * TailwindCSS + Radix UI + Sonner，提供專業 UI/UX

* **現代開發工具與流程掌握**

  * TypeScript、ESLint、Turbopack、React Query
  * 熟悉 Git、npm scripts、環境變數管理

* **團隊合作與專案思路**

  * 適合多人成員合作，前後端分工清晰
  * 面向擴充性與可維護性，易於加入新功能

---

## 貢獻方式

> 此專案主要為個人作品與面試用途。

---

## 授權

此專案 **Private**，僅用於個人作品集與面試展示。
