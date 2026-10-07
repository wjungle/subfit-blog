# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 專案說明

SubFit Blog 是 SubFit 英文沉浸式訓練工具的行銷部落格，以繁體中文撰寫文章，部署於 Vercel。目的是透過 SEO 文章吸引想用沉浸式方式學英文的使用者，引導至 https://subfit.vercel.app。

## 架構決策

**為什麼獨立建站，不做在主 app 裡？**
主 app（`/mnt/f/ccc/subfit`）是 React + Vite SPA，Google 爬蟲只能看到空殼 HTML，SEO 幾乎為零。
Astro 輸出純靜態 HTML，爬蟲完整可讀。兩個 repo 完全獨立，互不影響。

**為什麼不遷移主 app 到 Next.js？**
遷移成本約 1-2 週，主 app 的訓練功能也不需要 SSR。代價不划算。

## 部署策略

- **現在**：`subfit-blog.vercel.app`（Vercel 自動偵測 Astro，`vercel` 指令即可）
- **買好 `subfit.app` 域名後**：
  1. 改 `astro.config.mjs` 的 `site` 為 `https://blog.subfit.app`
  2. Vercel Dashboard → 專案 → Settings → Domains → 加入 `blog.subfit.app`
  3. 重新 deploy

## 常用指令

```sh
npm run dev      # 啟動開發伺服器（localhost:4321）
npm run build    # 建置靜態網站至 ./dist/
npm run preview  # 預覽建置結果
vercel           # 部署到 Vercel
```

> Git Bash 無法直接執行 `astro` 指令，一律用 `npm run <script>`。

> ⚠️ **一律在 WSL 跑，不要用 Git Bash**：`node_modules` 的 rollup 原生模組是平台相依的（Linux 與 Windows 各一份）。在 WSL 跑過 `npm install` 後，node_modules 變成 Linux 版，Git Bash 會報 `Cannot find module '@rollup/rollup-win32-x64-msvc'`（反之亦然）。兩個環境間切換會讓 npm 一直重整原生模組，故統一在 WSL：`wsl` → `cd /mnt/f/ccc/subfit-blog` → `npm run dev`。`dev` 腳本已內建 `--host`，直接 `npm run dev` 即可（不用再加 `-- --host`）。部署不受影響（Vercel 用乾淨 Linux 環境 build）。

> 🐢 **`npm run dev` 啟動要 1～2 分鐘，終端機看起來像卡住，其實沒有**（2026-10 實測：astro ready 約 51 秒，含 npx 啟動總計約 92 秒）：
> - **原因**：專案放在 `/mnt/f`（Windows 磁碟），WSL 透過 9P 跨檔案系統讀檔，每個檔案都有延遲；Vite dev 模式啟動時要逐一讀取、轉換上百個 `node_modules` 模組，所以被放大。`npm run build` 一次性打包反而只要約 30 秒。
> - **怎麼確認沒卡死**：`npx astro dev --verbose` 會看到 `vite:load` / `vite:transform` 持續滾動；或另開終端 `curl -I http://localhost:4321/`。
> - **Port 被佔用**：Vite 會自動改用 4322、4323…，以終端機印出的 `Local` 網址為準；殘留的 dev/preview 行程可用 `ps aux | grep astro` 找出後 kill。
> - **改善選項**：①等它跑完（第一次開頁也慢，之後就快）；②只看成果用 `npm run build && npm run preview`；③根本解：把專案搬到 WSL 原生磁碟（如 `~/projects/subfit-blog`），dev 啟動可降到數秒，Windows 端改用 `\\wsl$\...` 存取、VS Code 用 WSL 模式開。

## 架構概覽

- **內容層**：所有部落格文章放在 `src/content/blog/`，支援 `.md` / `.mdx`。Schema 定義在 `src/content.config.ts`，frontmatter 必填欄位為 `title`、`description`、`pubDate`。
- **路由層**：`src/pages/blog/[...slug].astro` 動態路由對應每篇文章；`src/pages/index.astro` 是品牌首頁（Hero／訓練流程／功能／截圖／文章／價格／FAQ／CTA）。
- **版型層**：`src/layouts/BlogPost.astro` 是所有文章共用的 layout，底部已內建 CTA 區塊，導向 SubFit 主站。
- **全域設定**：`src/consts.ts` 存放 `SITE_TITLE` 與 `SITE_DESCRIPTION`；`astro.config.mjs` 設定 site URL、MDX 與 sitemap 整合。

## 新增文章

在 `src/content/blog/` 建立 `.mdx` 檔，frontmatter 格式：

```yaml
---
title: '文章標題'
description: '文章摘要（也用於 SEO meta description）'
pubDate: 'YYYY-MM-DD'
heroImage: './hero.jpg'   # 可選，放在同目錄或 src/assets/
---
```

## 注意事項

- `BlogPost.astro` 的 `<html lang="zh-TW">` 是刻意設定，文章為繁體中文。
- CTA 按鈕（導向 subfit.vercel.app）定義在 `BlogPost.astro` layout 內，所有文章共用，不需在各篇文章重複加。
- 品牌色與共用樣式（`.btn`、`.cta-box`、`.eyebrow`）集中在 `src/styles/global.css` 的 CSS 變數，**不要在頁面寫死色碼**。品牌素材（logo、icon、og-image）取自主 app 的 `public/`。
- 首頁 App 截圖：把圖片放進 `src/assets/screenshots/`（依檔名排序），首頁會自動顯示截圖區；資料夾為空時該區塊隱藏。
- FAQ 內容在 `src/data/faqs.ts`，`/faq` 與首頁精選共用。
- Sitemap 自動產生於 `dist/sitemap-index.xml`，部署後建議提交到 Google Search Console。
- `description` frontmatter 直接對應 `<meta name="description">` 和 OG tag，每篇文章務必填寫。
