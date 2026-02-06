# Pixel Art Quiz Game (像素大挑戰)

這是一個復古像素風格的問答遊戲，使用 React (Vite) 前端與 Google Sheets (Google Apps Script) 作為後端資料庫。

## 🎮這專案包含什麼？
- **前端**：React + Vite (支援 Node.js v14+)，像素風格 UI。
- **後端**：Google Sheets (題目與成績單) + Google Apps Script (API)。
- **特色**：
  - 像素藝術風格設計
  - DiceBear 自動生成像素頭像
  - 支援中英雙語題目顯示
  - 即時串接 Google Sheets 題庫

---

## ⚡️ 一鍵自動部署 (One-Click Auto Deploy)

為了方便您快速設定 GitHub Repository 與自動部署，我準備了一個自動化腳本。

**先決條件**：
1.  您需要安裝 **GitHub CLI** (`brew install gh`)。
2.  您需要登入 GitHub (`gh auth login`)。

**使用方法**：
在終端機執行以下指令，依照提示操作即可完成所有設定：

```bash
./deploy_setup.sh
```

若您沒有安裝 GitHub CLI，請參考下方的「手動部署」說明。

---

## 🚀 手動部署到 GitHub Pages (Manual Setup)

本專案已設定好 **GitHub Actions**，只要您將程式碼推送到 GitHub，就會自動部署。

### 1. 準備工作 (GitHub Repo 設定)
在將程式碼推送到 GitHub 之前 (或之後)，請先到您的 GitHub Repository 頁面進行設定：

1.  進入 **Settings** > **Secrets and variables** > **Actions**。
2.  點擊 **New repository secret**，新增以下變數 (內容參考您的 `.env` 或 `.env.example`)：
    *   **Name**: `VITE_GOOGLE_APP_SCRIPT_URL`
    *   **Secret**: 填入您的 Google Web App URL (例如 `https://script.google.com/.../exec`)
3.  (選用) 若有需要，可至 **Variables** 頁籤新增其他非機密變數：
    *   `VITE_PASS_THRESHOLD` (預設 3)
    *   `VITE_QUESTION_COUNT` (預設 5)

### 2. 啟用 GitHub Pages
1.  進入 **Settings** > **Pages**。
2.  在 **Build and deployment** 區塊：
    *   **Source**: 選擇 `GitHub Actions`。

### 3. 推送程式碼
當您將 `main` 分支推送到 GitHub 後，Action 就會自動開始建置並部署。部署完成後，您可以在 Repository 首頁右側或 Actions 頁籤看到您的網站網址。

---

## 🚀 快速啟動 (Quick Start)

安裝並設定完畢後，您每次只需要執行以下指令即可開啟遊戲：

```bash
npm run dev
```

然後開啟瀏覽器進入 `http://localhost:3000` 即可。

---

## 🛠️ 安裝教學 (前端)

### 1. 環境需求
- Node.js (建議 v14 或 v16+)
- npm

### 2. 安裝步驟
在專案根目錄執行以下指令：

```bash
# 安裝相依套件
npm install

# 啟動開發伺服器
npm run dev
```

啟動後，開啟瀏覽器訪問終端機顯示的網址 (例如 `http://localhost:3000`)。

---

## 📊 Google Sheets 與 Apps Script 設定 (後端)

請依照以下步驟建立您的雲端題庫與 API：

### 1. 建立 Google Sheets
1. 前往 Google Sheets 新增一個空白試算表。
2. 建立兩個工作表 (Tabs)，名稱分別為 `題目` 和 `回答`。

#### 工作表 A：`題目`
請將以下內容直接複製到第一列 (A1:G1)：

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| ID | Question | OptionA | OptionB | OptionC | OptionD | Answer |

#### 工作表 B：`回答`
請將以下內容直接複製到第一列 (A1:G1)：

| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| ID | Attempts | Score | MaxScore | FirstPassScore | AttemptsToPass | LastPlayed |

### 2. 設定 Google Apps Script
1. 在試算表中，點擊上方選單的 **擴充功能 (Extensions)** > **Apps Script**。
2. 清空編輯器中的內容，將專案中的 `google_apps_script.js` 程式碼完整複製貼上。
3. 點擊磁片圖示 **儲存**。

### 3. 部署 API
1. 點擊右上角藍色的 **部署 (Deploy)** > **新增部署 (New deployment)**。
2. 點擊齒輪圖示，選擇 **網頁應用程式 (Web app)**。
3. 設定如下：
   - **說明**：Pixel Game API
   - **執行身分 (Execute as)**：**我 (Me)** (重要！這樣才能讀取您的試算表)
   - **誰可以存取 (Who has access)**：**任何人 (Anyone)** (重要！這樣前端才能呼叫)
4. 點擊 **部署 (Deploy)**。
5. 複製生成的 **網頁應用程式網址 (Web App URL)** (以 `/exec` 結尾的連結)。

> [!WARNING]
> **遇到「Google 尚未驗證這個應用程式」怎麼辦？**
> 首次授權時若出現此警告畫面，因為這是您自己建立的腳本，請依照以下步驟繼續：
> 1. 點擊 **進階 (Advanced)**。
> 2. 點擊下方的 **前往... (不安全) (Go to ... (unsafe))**。
> 3. 點擊 **允許 (Allow)**。

### 4. 連接前端
1. 回到本機專案，複製 `.env` 檔案內容。
2. 修改 `VITE_GOOGLE_APP_SCRIPT_URL` 變數：

```bash
VITE_GOOGLE_APP_SCRIPT_URL=https://script.google.com/macros/s/你的_SCRIPT_ID/exec
VITE_PASS_THRESHOLD=3
VITE_QUESTION_COUNT=5
```

---

## 🤖 附錄：生成式 AI 基礎知識題庫 (可直接複製)

以下是 10 題關於生成式 AI 的基礎知識題目，您可以直接複製內容貼到 Google Sheets 的 **`題目`** 工作表 (從 A2 儲存格開始貼上)。

| ID | Question | OptionA | OptionB | OptionC | OptionD | Answer |
|----|----------|---------|---------|---------|---------|--------|
| q001 | 什麼是「生成式 AI」的主要特徵？<br>What defines Generative AI? | 只能分析現有數據<br>Only analyzes data | 可以創造新的內容<br>Creates new content | 只能進行數學運算<br>Only does math | 是傳統的搜尋引擎<br>Is a search engine | B |
| q002 | GPT (如 ChatGPT) 中的 "T" 代表什麼？<br>What does "T" stand for in GPT? | Transformer | Translator | Terminator | Teacher | A |
| q003 | 下列哪個不是常見的生成式 AI 模型？<br>Which is NOT a GenAI model? | GPT-4 | Midjourney | Stable Diffusion | Excel | D |
| q004 | AI 模型產生虛假或錯誤資訊的現象稱為什麼？<br>What is it called when AI makes things up? | 夢遊<br>Sleepwalking | 幻覺<br>Hallucination | 說謊<br>Lying | 錯誤代碼<br>Error Code | B |
| q005 | 我們用來引導 AI 產生特定輸出的文字稱為什麼？<br>The text used to guide AI is called? | 腳本<br>Script | 程式碼<br>Code | 提示詞<br>Prompt | 指令集<br>Command Set | C |
| q006 | LLM 是什麼的縮寫？<br>What does LLM stand for? | Large Language Model | Long Learning Machine | Little Logic Maker | Last Level Master | A |
| q007 | 哪個參數通常用來控制生成內容的「隨機性」或「創意度」？<br>Which parameter controls randomness? | 速度 (Speed) | 溫度 (Temperature) | 容量 (Volume) | 亮度 (Brightness) | B |
| q008 | Midjourney 主要用於生成什麼類型的內容？<br>What does Midjourney generate? | 文字<br>Text | 音樂<br>Music | 圖片<br>Images | 影片<br>Video | C |
| q009 | RAG 在 AI 技術中代表什麼？<br>What does RAG stand for? | Retrieval-Augmented Generation | Really Advanced GPT | Robot And Game | Read And Generate | A |
| q010 | Transformer 架構最初是由哪家公司在論文中提出的？<br>Who introduced the Transformer architecture? | Google | OpenAI | Microsoft | Apple | A |

*(注意：在 Google Sheets 中，若要達成題目換行效果，請確認儲存格內文字使用 `Alt + Enter` 或直接貼上包含換行符的文字)*
