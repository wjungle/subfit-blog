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

## 架構概覽

- **內容層**：所有部落格文章放在 `src/content/blog/`，支援 `.md` / `.mdx`。Schema 定義在 `src/content.config.ts`，frontmatter 必填欄位為 `title`、`description`、`pubDate`。
- **路由層**：`src/pages/blog/[...slug].astro` 動態路由對應每篇文章；`src/pages/index.astro` 是首頁（目前仍是 Astro 預設樣板，尚未客製化）。
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
- `src/pages/index.astro` 目前是 Astro 預設首頁內容，正式上線前需替換為 SubFit 自訂首頁。
- Sitemap 自動產生於 `dist/sitemap-index.xml`，部署後建議提交到 Google Search Console。
- `description` frontmatter 直接對應 `<meta name="description">` 和 OG tag，每篇文章務必填寫。
