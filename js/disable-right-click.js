// 1. 智慧型右鍵保護：只擋圖片，放行文字與其他區域
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG' || e.target.closest('img')) {
        e.preventDefault();
    }
});

// 2. 當網頁載入或切換完成後執行
document.addEventListener("DOMContentLoaded", function() {
    
    // 動態放大左上角部落格標題
    const siteTitle = document.querySelector('nav a.text-lg, nav a.font-semibold, .navbar-start a');
    if (siteTitle) {
        siteTitle.style.fontSize = "1.8rem";
        siteTitle.style.fontWeight = "700";
    }

    // 動態放大左上角頭像圖片與外框
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

    // 自動為文章內頁的分類與標籤加上對應的 CSS Class
    const taxonomiesDiv = document.getElementById('custom-post-taxonomies');
    if (taxonomiesDiv) {
        const catLinks = taxonomiesDiv.querySelectorAll('a[href*="/categories/"]');
        catLinks.forEach(link => {
            link.className = "custom-cat-badge inline-block mr-2 mb-2 text-sm";
        });

        const tagLinks = taxonomiesDiv.querySelectorAll('a[href*="/tags/"]');
        tagLinks.forEach(link => {
            link.className = "custom-tag-badge inline-block mr-2 mb-2 text-sm";
        });
    }

    // ==========================================
    // 3. 在導覽列右上角生出太陽/月亮切換按鈕
    // ==========================================
    function createNavThemeToggle() {
        const navRight = document.querySelector('nav section.hidden.sm\\:flex, nav .navbar-end, nav div.flex.items-center');
        if (navRight && !document.getElementById('custom-nav-theme-btn')) {
            const themeBtn = document.createElement('button');
            themeBtn.id = 'custom-nav-theme-btn';
            
            // 判斷目前是否為暗色模式
            const isDarkNow = document.documentElement.classList.contains('dark');
            themeBtn.innerHTML = isDarkNow ? '🌙' : '☀️';
            themeBtn.setAttribute('aria-label', '切換日夜間模式');
            
            themeBtn.style.cssText = `
                display: inline-flex;
                align-items: center;
                justify-content: center;
                width: 36px;
                height: 36px;
                margin-left: 8px;
                background-color: var(--color-nav, #F7E8D0);
                color: var(--color-text, #433426);
                border: 1px solid #E6D3B3;
                border-radius: 50%;
                font-size: 16px;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(67, 52, 38, 0.15);
                transition: background-color 0.2s ease, transform 0.2s ease;
            `;

            themeBtn.addEventListener('click', function() {
                const isDark = document.documentElement.classList.toggle('dark');
                if (isDark) {
                    document.documentElement.setAttribute('data-theme', window.darkTheme || 'forest');
                    localStorage.setItem('hugo-theme-dream-is-dark', 'y');
                    themeBtn.innerHTML = '🌙';
                } else {
                    document.documentElement.setAttribute('data-theme', window.lightTheme || 'retro');
                    localStorage.setItem('hugo-theme-dream-is-dark', 'n');
                    themeBtn.innerHTML = '☀️';
                }
            });

            navRight.appendChild(themeBtn);
        }
    }

    createNavThemeToggle();

    // 監聽點擊，防止切換「關於」或翻轉頁面時按鈕不見
    document.addEventListener('click', function() {
        setTimeout(createNavThemeToggle, 100);
    });

    // ==========================================
    // 4. 用 CSS 精準隱藏右下角的原廠切換按鈕群組（保留訪客計數器）
    // ==========================================
    if (!document.getElementById('hide-footer-theme-switcher')) {
        const hideStyle = document.createElement('style');
        hideStyle.id = 'hide-footer-theme-switcher';
        hideStyle.textContent = `
            /* 隱藏 footer 裡面裝著日夜圖示按鈕的那個 div，但保留計數器 */
            footer div.flex.items-center > div:nth-child(2) {
                display: none !important;
            }
        `;
        document.head.appendChild(hideStyle);
    }

    // ==========================================
    // 5. 動態建立返回頂部按鈕（懸浮於右下角）
    // ==========================================
    if (!document.getElementById('back-to-top-btn')) {
        const backToTopBtn = document.createElement('button');
        backToTopBtn.id = 'back-to-top-btn';
        backToTopBtn.innerHTML = '▲';
        backToTopBtn.setAttribute('aria-label', '回到頂部');
        
        backToTopBtn.style.cssText = `
            position: fixed;
            bottom: 130px;
            right: 25px;
            width: 40px;
            height: 40px;
            background-color: var(--color-nav, #F7E8D0);
            color: var(--color-text, #433426);
            border: 1px solid #E6D3B3;
            border-radius: 50%;
            font-size: 16px;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 12px rgba(67, 52, 38, 0.15);
            z-index: 9999;
            transition: background-color 0.2s ease, transform 0.2s ease;
        `;

        document.body.appendChild(backToTopBtn);

        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        backToTopBtn.addEventListener('mouseenter', function() {
            backToTopBtn.style.backgroundColor = '#E6B83A';
            backToTopBtn.style.color = '#FFF9EE';
            backToTopBtn.style.transform = 'translateY(-2px)';
        });
        backToTopBtn.addEventListener('mouseleave', function() {
            backToTopBtn.style.backgroundColor = 'var(--color-nav, #F7E8D0)';
            backToTopBtn.style.color = 'var(--color-text, #433426)';
            backToTopBtn.style.transform = 'translateY(0)';
        });

        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});