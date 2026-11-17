// ==========================================
// 專屬暖黃色調與色票管理設定檔 (theme-color.js)
// ==========================================

(function () {
    // 1. 集中管理你的專屬色票
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
            iconHoverBg: "#E6B83A",   // 按鈕滑鼠碰過去 / 選中時的圓圈底色
            iconHoverText: "#FFF9EE"  // 按鈕滑鼠碰過去 / 選中時的圖示顏色
        },
        dark: {
            bg: "#121212",            // 夜間極黑大背景（沈穩碳黑）
            navBg: "#2A2A2A",         // 夜間導覽列與膠囊按鈕外框底色（深灰）
            titleColor: "#FFFFFF",    // 夜間部落格標題色（純白，醒目）
            subTitleColor: "#ffffff", // 夜間副標題（中灰）
            cardBg: "#1E1E1E",        // 夜間文章卡片平時底色（深灰黑）
            cardHoverBg: "#2C2C2C",   // 夜間首頁卡片滑鼠碰過去的底色（稍亮的灰）
            cardBorder: "#383838",    // 夜間卡片邊框（低調質感灰）
            text: "#E0E0E0",          // 夜間柔和淺灰文字（不刺眼）
            iconHoverBg: "#E0E0E0",   // 夜間按鈕滑鼠碰過去 / 選中時的底色（淺灰白）
            iconHoverText: "#121212"  // 夜間按鈕滑鼠碰過去時的文字/圖示顏色（深黑）
        }
    };

    // 2. 產生乾淨且高權重的專屬樣式表
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

        /* 導覽列右上角圖示按鈕 */
        nav a.rounded-full, nav button.rounded-full {
            color: ${colors.light.text} !important;
            transition: background-color 0.2s ease, color 0.2s ease !important;
        }
        nav a.rounded-full:hover, nav button.rounded-full:hover {
            background-color: ${colors.light.iconHoverBg} !important;
            color: ${colors.light.iconHoverText} !important;
        }

        /* 首頁文章列表卡片 */
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

        /* 文章標題獨立色塊（白天模式） */
        #custom-article-title-box {
            background-color: rgba(212, 160, 89, 0.3) !important;
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

        /* 文章標題獨立色塊（夜間模式） */
        html.dark #custom-article-title-box {
            background-color: rgb(90, 90, 90) !important;
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

        /* === 隱藏右下角多餘的系統/電腦圖示 === */
        footer div.flex.items-center div[role="button"]:last-child,
        footer .dropdown,
        footer button[aria-label*="System"] {
            display: none !important;
        }
    `;

    // 3. 注入樣式表
    const styleTag = document.createElement('style');
    styleTag.id = 'custom-warm-theme-style';
    styleTag.textContent = customCSS;
    document.head.appendChild(styleTag);

    // 4. 自動更新頁尾版權名字
    document.addEventListener("DOMContentLoaded", function() {
        const footerParagraphs = document.querySelectorAll("footer p");
        footerParagraphs.forEach(p => {
            if (p.textContent.includes("曉雲ㄉ避風港")) {
                p.textContent = p.textContent.replace("曉雲ㄉ避風港", "曉雲 Shizukumo");
            }
        });
    });
    
})();