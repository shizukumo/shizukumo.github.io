// 1. 智慧型右鍵保護：只擋圖片，放行文字與其他區域
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.closest('img')) {
        e.preventDefault();
    }
});

// 2. 當網頁載入完成後執行清理與樣式調整
document.addEventListener("DOMContentLoaded", function() {
    
    // 【目標 A】徹底移除文章內的分享按鈕區塊
    const shareContainer = document.querySelector('header .flex.justify-between .flex.items-center.gap-2');
    if (shareContainer) {
        shareContainer.remove();
    }

    // 【目標 B】動態放大左上角部落格標題
    const siteTitle = document.querySelector('nav a.text-lg, nav a.font-semibold, .navbar-start a');
    if (siteTitle) {
        siteTitle.style.fontSize = "1.8rem";
        siteTitle.style.fontWeight = "700";
    }

    // 【目標 C】動態放大左上角頭像圖片與外框
    const avatarImg = document.querySelector('nav .avatar img, header .avatar img');
    if (avatarImg) {
        avatarImg.style.width = "64px";
        avatarImg.style.height = "64px";
        avatarImg.style.maxWidth = "none";
        avatarImg.style.maxHeight = "none";
    }
    
    const avatarButton = document.querySelector('nav button.avatar, header button.avatar');
    if (avatarButton) {
        avatarButton.style.width = "64px";
        avatarButton.style.height = "64px";
    }

    // 【目標 D】文章日期精簡：只保留第一個日期，移除後面重複的更新日期與分隔線
    const postMeta = document.querySelector('article header p.text-sm');
    if (postMeta) {
        // 抓取裡面的第一個子元素（也就是第一個格式化日期 span）
        const firstDate = postMeta.querySelector('span[data-format="luxon"]');
        if (firstDate) {
            // 直接清空原本雜亂的內容，只放上乾淨的第一個日期
            postMeta.innerHTML = '';
            postMeta.appendChild(firstDate);
        }
    }
});