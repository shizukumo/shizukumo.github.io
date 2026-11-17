// ==========================================
// 專屬暖黃色調、無縫背景與全站互動色票設定檔 (theme-color.js)
// 採用動態 CSS 注入技術：零延遲、零閃爍、永不被主題預設樣式覆蓋
// ==========================================

(function () {
    // 1. 集中管理你的專屬色票（以後想調色直接改這裡的色碼即可）
    const colors = {
        light: {
            bg: "#FFF5E6",            // 網頁大背景底色
            navBg: "#F7E8D0",         // 導覽列與膠囊按鈕外框底色
            titleColor: "#f4bf0e",    // 部落格標題色
            subTitleColor: "#7A6348", // 副標題暖褐色
            cardBg: "#FCF9F2",        // 文章卡片平時底色
            cardHoverBg: "#ec9b19",   // 首頁卡片滑鼠碰過去的奶茶黃色
            cardBorder: "#E6D3B3",    // 文章卡片與膠囊邊框
            text: "#433426",          // 主體文字與圖示平時顏色
            iconHoverBg: "#E6B83A",   // 按鈕滑鼠碰過去 / 選中時的圓圈底色（溫潤芥末金）
            iconHoverText: "#FFF9EE"  // 按鈕滑鼠碰過去 / 選中時的圖示顏色（暖象牙白）
        },
        dark: {
            bg: "#1F1812",            // 夜間深暖木大背景
            navBg: "#292018",         // 夜間導覽列與膠囊按鈕外框底色
            titleColor: "#dcb01e",    // 夜間部落格標題色
            subTitleColor: "#A89680",
            cardBg: "#2B2118",        // 夜間文章卡片平時底色
            cardHoverBg: "#382B20",   // 夜間首頁卡片滑鼠碰過去的暖咖啡色
            cardBorder: "#453628",
            text: "#E0D4C3",          // 夜間柔和米杏文字
            iconHoverBg: "#C9962C",   // 夜間按鈕滑鼠碰過去 / 選中時的琥珀棕底色
            iconHoverText: "#1F1812"
        }
    };

    // 2. 產生最高權重的專屬樣式表
    const customCSS = `
        /* === 白天模式 (預設) === */
        html, body, .flip-container, .front, .back {
            background-color: ${colors.light.bg} !important;
            color: ${colors.light.text} !important;
            min-height: 100vh;
        }

        /* 頂部導覽列與標題 */
        nav {
            background-color: ${colors.light.navBg} !important;
            border-bottom: 1px solid ${colors.light.cardBorder} !important;
            margin-top: 0 !important;
        }
        nav section a {
            color: ${colors.light.titleColor} !important;
            font-weight: 700 !important;
            text-shadow: 0 1px 1px rgba(67, 52, 38, 0.25);
        }
        nav section div.text-sm {
            color: ${colors.light.subTitleColor} !important;
        }

        /* 導覽列右上角圖示按鈕（平時與滑鼠碰過去） */
        nav a.rounded-full, nav button.rounded-full {
            color: ${colors.light.text} !important;
            transition: background-color 0.2s ease, color 0.2s ease !important;
        }
        nav a.rounded-full:hover, nav button.rounded-full:hover {
            background-color: ${colors.light.iconHoverBg} !important;
            color: ${colors.light.iconHoverText} !important;
        }
        nav a.rounded-full:hover ion-icon, nav button.rounded-full:hover ion-icon {
            color: ${colors.light.iconHoverText} !important;
        }

        /* 底部太陽/月亮/電腦切換膠囊按鈕 */
        footer div.rounded-full {
            background-color: ${colors.light.navBg} !important;
            border-color: ${colors.light.cardBorder} !important;
        }
        footer div[role="button"] {
            color: ${colors.light.text} !important;
            transition: background-color 0.2s ease !important;
        }
        footer div[role="button"]:hover:not(.bg-primary) {
            background-color: ${colors.light.cardHoverBg} !important;
        }
        footer div[role="button"].bg-primary {
            background-color: ${colors.light.iconHoverBg} !important;
            color: ${colors.light.iconHoverText} !important;
        }

        /* 首頁文章列表卡片（平時與滑鼠碰過去） */
        article.card {
            background-color: ${colors.light.cardBg} !important;
            border: 1px solid ${colors.light.cardBorder} !important;
            color: ${colors.light.text} !important;
            transition: background-color 0.2s ease !important;
        }
        article.card:hover {
            background-color: ${colors.light.cardHoverBg} !important;
        }

        /* 單篇文章內頁主體卡片框 */
        #dream-single-post-main {
            background-color: ${colors.light.cardBg} !important;
            border: 1px solid ${colors.light.cardBorder} !important;
            border-radius: 16px !important;
            padding: 2.5rem 2rem !important;
            box-shadow: 0 4px 20px rgba(67, 52, 38, 0.05) !important;
            color: ${colors.light.text} !important;
        }
        #dream-single-post-main h1, #dream-single-post-main h2, #dream-single-post-main h3, #dream-single-post-main p {
            color: ${colors.light.text} !important;
        }

        /* 文章分類與標籤膠囊（白天模式） */
        #custom-post-taxonomies {
            border-color: ${colors.light.cardBorder} !important;
        }
        .custom-cat-badge {
            background-color: ${colors.light.iconHoverBg} !important;
            color: ${colors.light.iconHoverText} !important;
            padding: 3px 12px !important;
            border-radius: 999px !important;
            text-decoration: none !important;
            font-weight: 500 !important;
        }
        .custom-tag-badge {
            background-color: ${colors.light.navBg} !important;
            color: ${colors.light.text} !important;
            border: 1px solid ${colors.light.cardBorder} !important;
            padding: 3px 12px !important;
            border-radius: 999px !important;
            text-decoration: none !important;
            transition: background-color 0.2s ease !important;
        }
        .custom-tag-badge:hover {
            background-color: ${colors.light.cardHoverBg} !important;
        }


        /* === 夜間模式 (html.dark) === */
        html.dark, html.dark body, html.dark .flip-container, html.dark .front, html.dark .back {
            background-color: ${colors.dark.bg} !important;
            color: ${colors.dark.text} !important;
        }
        html.dark nav {
            background-color: ${colors.dark.navBg} !important;
            border-bottom: 1px solid ${colors.dark.cardBorder} !important;
        }
        html.dark nav section a {
            color: ${colors.dark.titleColor} !important;
            text-shadow: none !important;
        }
        html.dark nav section div.text-sm {
            color: ${colors.dark.subTitleColor} !important;
        }
        html.dark nav a.rounded-full, html.dark nav button.rounded-full {
            color: ${colors.dark.text} !important;
        }
        html.dark nav a.rounded-full:hover, html.dark nav button.rounded-full:hover {
            background-color: ${colors.dark.iconHoverBg} !important;
            color: ${colors.dark.iconHoverText} !important;
        }
        html.dark nav a.rounded-full:hover ion-icon, html.dark nav button.rounded-full:hover ion-icon {
            color: ${colors.dark.iconHoverText} !important;
        }
        html.dark footer div.rounded-full {
            background-color: ${colors.dark.navBg} !important;
            border-color: ${colors.dark.cardBorder} !important;
        }
        html.dark footer div[role="button"] {
            color: ${colors.dark.text} !important;
        }
        html.dark footer div[role="button"]:hover:not(.bg-primary) {
            background-color: ${colors.dark.cardHoverBg} !important;
        }
        html.dark footer div[role="button"].bg-primary {
            background-color: ${colors.dark.iconHoverBg} !important;
            color: ${colors.dark.iconHoverText} !important;
        }
        html.dark article.card {
            background-color: ${colors.dark.cardBg} !important;
            border: 1px solid ${colors.dark.cardBorder} !important;
            color: ${colors.dark.text} !important;
        }
        html.dark article.card:hover {
            background-color: ${colors.dark.cardHoverBg} !important;
        }
        html.dark #dream-single-post-main {
            background-color: ${colors.dark.cardBg} !important;
            border: 1px solid ${colors.dark.cardBorder} !important;
            color: ${colors.dark.text} !important;
        }
        html.dark #dream-single-post-main h1, html.dark #dream-single-post-main h2, html.dark #dream-single-post-main h3, html.dark #dream-single-post-main p {
            color: ${colors.dark.text} !important;
        }

        /* 文章分類與標籤膠囊（夜間模式） */
        html.dark #custom-post-taxonomies {
            border-color: ${colors.dark.cardBorder} !important;
        }
        html.dark .custom-cat-badge {
            background-color: ${colors.dark.iconHoverBg} !important;
            color: ${colors.dark.iconHoverText} !important;
            padding: 3px 12px !important;
            border-radius: 999px !important;
            text-decoration: none !important;
            font-weight: 500 !important;
        }
        html.dark .custom-tag-badge {
            background-color: ${colors.dark.navBg} !important;
            color: ${colors.dark.text} !important;
            border: 1px solid ${colors.dark.cardBorder} !important;
            padding: 3px 12px !important;
            border-radius: 999px !important;
            text-decoration: none !important;
            transition: background-color 0.2s ease !important;
        }
        html.dark .custom-tag-badge:hover {
            background-color: ${colors.dark.cardHoverBg} !important;
        }
    `;

    // 3. 立即將樣式表寫入網頁（不需等待 DOM 載入，絕不被蓋掉）
    const styleTag = document.createElement('style');
    styleTag.id = 'custom-warm-theme-style';
    styleTag.textContent = customCSS;
    document.head.appendChild(styleTag);
})();