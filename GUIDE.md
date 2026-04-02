# SubFit Blog 維護指南

---

## 一、新增文章

### 步驟

1. 在 `src/content/blog/` 建立新檔案，檔名用英文或拼音，副檔名 `.mdx`

   ```
   src/content/blog/how-to-shadow-reading.mdx
   ```

2. 在檔案最上方填寫 frontmatter：

   ```yaml
   ---
   title: '文章標題'
   description: '文章摘要（會出現在列表頁、Google 搜尋結果、OG 預覽）'
   pubDate: 'YYYY-MM-DD'
   heroImage: './hero.jpg'   # 可選，封面圖放在同目錄下
   ---
   ```

3. frontmatter 下方直接用 Markdown 寫內文：

   ```markdown
   ## 段落標題

   一般文字段落。

   **粗體**、*斜體*、[連結](https://example.com)

   - 清單項目
   - 清單項目
   ```

### 注意事項

- `title`、`description`、`pubDate` 三個欄位必填，少一個會 build 失敗
- `description` 直接對應 `<meta name="description">`，每篇務必寫，影響 SEO
- 檔名建議全小寫英文加連字號，例如 `shadowing-guide.mdx`
- CTA 按鈕（導向 subfit.app）已內建在 layout，每篇文章自動出現，不需要自己加
- 文章發布後 sitemap 會自動更新，建議到 Google Search Console 提交索引

### 部署流程

```sh
git add src/content/blog/你的文章.mdx
git commit -m "feat: add article 文章標題"
git push
```

push 後 Vercel 會自動偵測並重新部署，約 1-2 分鐘後 `blog.subfit.app` 即更新。

---

## 二、調整版面

### 全站樣式 — `src/styles/global.css`

| 想改的東西 | 找哪個區塊 |
|---|---|
| 主色（紫色）| `:root` 裡的 `--accent` |
| 全站字體大小 | `body { font-size }` |
| 手機版字體大小 | `@media (max-width: 720px)` 裡的 `body` |
| 手機版標題大小 | `@media (max-width: 720px)` 裡的 `h1`~`h4` |
| 文章內文行距 | `body { line-height }` |
| 引用區塊樣式 | `blockquote` |

### 首頁 — `src/pages/index.astro`

頁面最底部的 `<style>` 區塊：

| 想改的東西 | 找哪個 class |
|---|---|
| 大標題字體大小 | `.hero h1 { font-size }` |
| 大標題漸層色 | `.hero h1 { background }` 的 `linear-gradient` |
| 副標文字顏色/大小 | `.subtitle` |
| 按鈕顏色 | `.cta-btn.primary { background }` |
| Feature 卡片數量/排列 | `.features { grid-template-columns }` |
| 文章卡片排列 | `.post-grid { grid-template-columns }` |

### 文章頁 / About — `src/layouts/BlogPost.astro`

頁面內的 `<style>` 區塊：

| 想改的東西 | 找哪個 class |
|---|---|
| 文章最大寬度 | `.prose { max-width }` |
| 文章標題對齊 | `.title { text-align }` |
| CTA 區塊背景色 | `.cta-box { background }` |
| CTA 按鈕文字/連結 | HTML 區塊裡的 `<a href=...>` |

### Header — `src/components/Header.astro`

| 想改的東西 | 位置 |
|---|---|
| 網站名稱 | `src/consts.ts` 裡的 `SITE_TITLE` |
| 導覽連結（Home/Blog/About）| `<div class="internal-links">` 裡的 `<HeaderLink>` |
| 右上角按鈕文字/連結 | `<a class="app-cta">` |

### 文章列表頁 — `src/pages/blog/index.astro`

| 想改的東西 | 找哪個 class |
|---|---|
| 頁面標題「所有文章」| HTML 裡的 `<h1 class="page-title">` |
| 列表卡片樣式 | `.post-list li a` |

---

## 三、常用指令

```sh
npm run dev      # 本機預覽（含手機區網存取）
npm run build    # 建置靜態檔案到 ./dist/
git push         # 推上 GitHub，Vercel 自動部署
```
