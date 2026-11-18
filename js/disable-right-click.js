(function() {
    // 1. 智慧型右鍵保護：只擋圖片，放行文字與其他區域
    document.addEventListener('contextmenu', function(e) {
        if (e.target.tagName === 'IMG' || e.target.closest('img')) {
            e.preventDefault();
        }
    });

    // 2. 核心執行函式
    function init() {
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
        // 3. 徹底強力隱藏所有頁尾的原廠日夜模式切換按鈕
        // ==========================================
        if (!document.getElementById('hide-footer-theme-switcher')) {
            const hideStyle = document.createElement('style');
            hideStyle.id = 'hide-footer-theme-switcher';
            hideStyle.textContent = `
                footer div.flex.items-center > div:nth-child(2),
                footer .dropdown,
                footer button[aria-label*="Select"],
                footer div[x-data*="icons"] {
                    display: none !important;
                }
            `;
            document.head.appendChild(hideStyle);
        }

        // ==========================================
        // 4. 建立頂部導覽列的主題切換按鈕
        // ==========================================
        function setupThemeToggles() {
            const isDarkNow = document.documentElement.classList.contains('dark');
            const currentIcon = isDarkNow ? '🌙' : '☀️';
            
            const bgColor = isDarkNow ? '#2A2A2A' : '#F7E8D0';
            const textColor = isDarkNow ? '#E0E0E0' : '#433426';
            const borderColor = isDarkNow ? '#383838' : '#E6D3B3';

            // A. 電腦版按鈕（右側導覽列）
            const desktopNav = document.querySelector('nav section.hidden.sm\\:flex');
            if (desktopNav && !document.getElementById('custom-desktop-theme-btn')) {
                const desktopBtn = document.createElement('button');
                desktopBtn.id = 'custom-desktop-theme-btn';
                desktopBtn.innerHTML = currentIcon;
                desktopBtn.setAttribute('aria-label', '切換日夜間模式');
                desktopBtn.style.cssText = `
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    width: 38px;
                    height: 38px;
                    margin-left: 8px;
                    background-color: ${bgColor};
                    color: ${textColor};
                    border: 1px solid ${borderColor};
                    border-radius: 50%;
                    font-size: 16px;
                    cursor: pointer;
                    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
                    transition: background-color 0.2s ease, transform 0.2s ease;
                `;
                desktopBtn.addEventListener('click', handleThemeToggle);
                desktopNav.appendChild(desktopBtn);
            }

            // B. 手機版按鈕（頂部導覽列容器）
            const navContainer = document.querySelector('nav .container');
            const dropdown = document.querySelector('nav .dropdown');
            if (navContainer && dropdown && !document.getElementById('custom-mobile-theme-btn')) {
                let rightWrapper = document.getElementById('custom-mobile-right-wrapper');
                if (!rightWrapper) {
                    rightWrapper = document.createElement('div');
                    rightWrapper.id = 'custom-mobile-right-wrapper';
                    rightWrapper.className = 'flex items-center gap-2 sm:hidden';
                    navContainer.replaceChild(rightWrapper, dropdown);
                    rightWrapper.appendChild(dropdown);
                }

                if (!document.getElementById('custom-mobile-theme-btn')) {
                    const mobileBtn = document.createElement('button');
                    mobileBtn.id = 'custom-mobile-theme-btn';
                    mobileBtn.innerHTML = currentIcon;
                    mobileBtn.setAttribute('aria-label', '切換日夜間模式');
                    mobileBtn.style.cssText = `
                        display: inline-flex;
                        align-items: center;
                        justify-content: center;
                        width: 38px;
                        height: 38px;
                        background-color: ${bgColor};
                        color: ${textColor};
                        border: 1px solid ${borderColor};
                        border-radius: 50%;
                        font-size: 16px;
                        cursor: pointer;
                        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
                        transition: background-color 0.2s ease, transform 0.2s ease;
                    `;
                    mobileBtn.addEventListener('click', handleThemeToggle);
                    rightWrapper.insertBefore(mobileBtn, dropdown);
                }
            }
        }

        // 切換邏輯
        function handleThemeToggle(e) {
            e.stopPropagation();
            const isDark = document.documentElement.classList.toggle('dark');
            const newIcon = isDark ? '🌙' : '☀️';
            
            const newBgColor = isDark ? '#2A2A2A' : '#F7E8D0';
            const newTextColor = isDark ? '#E0E0E0' : '#433426';
            const newBorderColor = isDark ? '#383838' : '#E6D3B3';

            if (isDark) {
                document.documentElement.setAttribute('data-theme', window.darkTheme || 'forest');
                localStorage.setItem('hugo-theme-dream-is-dark', 'y');
            } else {
                document.documentElement.setAttribute('data-theme', window.lightTheme || 'retro');
                localStorage.setItem('hugo-theme-dream-is-dark', 'n');
            }

            document.querySelectorAll('#custom-desktop-theme-btn, #custom-mobile-theme-btn').forEach(btn => {
                btn.innerHTML = newIcon;
                btn.style.backgroundColor = newBgColor;
                btn.style.color = newTextColor;
                btn.style.borderColor = newBorderColor;
            });

            const backToTopBtn = document.getElementById('back-to-top-btn');
            if (backToTopBtn) {
                backToTopBtn.style.backgroundColor = newBgColor;
                backToTopBtn.style.color = newTextColor;
                backToTopBtn.style.borderColor = newBorderColor;
            }
        }

        setupThemeToggles();

        // ==========================================
        // 5. 頁尾趣味小機關：遍歷所有頁尾（正面與背面），確保切換過去時遊戲依然在！
        // ==========================================
        const counterScripts = document.querySelectorAll('footer script[src*="counter.hacc.cc"]');
        counterScripts.forEach((counterScript, index) => {
            const counterParent = counterScript.parentElement;
            // 避免重複插入
            if (counterParent && !counterParent.querySelector('.custom-fun-widgets-group')) {
                const widgetContainer = document.createElement('div');
                widgetContainer.className = 'custom-fun-widgets-group';
                widgetContainer.style.cssText = `
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    margin-right: 12px;
                `;

                // A. 拍拍雲朵按鈕
                let clickCount = parseInt(localStorage.getItem('shizukumo_pat_count') || '0', 10);
                const messages = ['☁️ 軟綿綿～', '✨ 能量 +1', '🍵 喝口茶吧', '💛 今天也很棒', '🌿 深呼吸～', '🐾 蹭蹭！'];
                
                const patBtn = document.createElement('button');
                patBtn.type = 'button';
                patBtn.innerHTML = `☁️ 拍拍：<span class="pat-num">${clickCount}</span>`;
                patBtn.style.cssText = `
                    padding: 5px 12px;
                    border-radius: 999px;
                    font-size: 13px;
                    font-weight: 600;
                    cursor: pointer;
                    border: 1px solid #E6D3B3;
                    background-color: #FCF9F2;
                    color: #433426;
                    transition: transform 0.1s ease;
                    user-select: none;
                    white-space: nowrap;
                `;

                patBtn.addEventListener('click', function() {
                    clickCount++;
                    localStorage.setItem('shizukumo_pat_count', clickCount);
                    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
                    // 同步更新畫面中所有分身按鈕的數字
                    document.querySelectorAll('.pat-num').forEach(el => el.textContent = clickCount);
                    patBtn.innerHTML = `${randomMsg} (${clickCount})`;
                    patBtn.style.transform = 'scale(0.93)';
                    setTimeout(() => { patBtn.style.transform = 'scale(1)'; }, 100);
                });

                // B. 迷你跳躍小遊戲 (Canvas)
                const gameWrapper = document.createElement('div');
                gameWrapper.style.cssText = `
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 2px 8px;
                    border-radius: 12px;
                    border: 1px solid #E6D3B3;
                    background-color: #FCF9F2;
                `;

                const canvas = document.createElement('canvas');
                canvas.width = 150;
                canvas.height = 36;
                canvas.title = '點擊畫面跳躍！';
                canvas.style.cursor = 'pointer';
                const ctx = canvas.getContext('2d');

                let playerY = 22, vy = 0, isJumping = false;
                let obsX = 150, score = 0, gameOver = false;

                function resetGame() {
                    playerY = 22; vy = 0; isJumping = false;
                    obsX = 150; score = 0; gameOver = false;
                }

                canvas.addEventListener('click', function() {
                    if (gameOver) {
                        resetGame();
                    } else if (!isJumping) {
                        vy = -6.5;
                        isJumping = true;
                    }
                });

                function gameLoop() {
                    const isDark = document.documentElement.classList.contains('dark');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    ctx.strokeStyle = isDark ? '#555' : '#D4C2A3';
                    ctx.beginPath();
                    ctx.moveTo(0, 32);
                    ctx.lineTo(150, 32);
                    ctx.stroke();

                    if (!gameOver) {
                        playerY += vy;
                        if (playerY < 22) {
                            vy += 0.45;
                        } else {
                            playerY = 22;
                            vy = 0;
                            isJumping = false;
                        }

                        obsX -= 2.2;
                        if (obsX < -10) {
                            obsX = 150 + Math.random() * 40;
                            score++;
                        }

                        if (obsX < 24 && obsX > 10 && playerY > 14) {
                            gameOver = true;
                        }
                    }

                    ctx.fillStyle = isDark ? '#f4bf0e' : '#ec9b19';
                    ctx.fillRect(14, playerY, 10, 10);

                    ctx.fillStyle = isDark ? '#E0E0E0' : '#7A6348';
                    ctx.fillRect(obsX, 22, 6, 10);

                    ctx.fillStyle = isDark ? '#aaa' : '#7A6348';
                    ctx.font = '10px sans-serif';
                    ctx.fillText(gameOver ? `撞到! 點擊重來` : `得分: ${score}`, 50, 11);

                    requestAnimationFrame(gameLoop);
                }
                gameLoop();
                gameWrapper.appendChild(canvas);

                // 組合順序：[拍雲朵] -> [小恐龍]
                widgetContainer.appendChild(patBtn);
                widgetContainer.appendChild(gameWrapper);

                // 插入到計數器的左側
                counterParent.prepend(widgetContainer);
            }
        });

        // ==========================================
        // 6. 返回頂部按鈕
        // ==========================================
        if (!document.getElementById('back-to-top-btn')) {
            const isDarkNow = document.documentElement.classList.contains('dark');
            const bBgColor = isDarkNow ? '#2A2A2A' : '#F7E8D0';
            const bTextColor = isDarkNow ? '#E0E0E0' : '#433426';
            const bBorderColor = isDarkNow ? '#383838' : '#E6D3B3';

            const backToTopBtn = document.createElement('button');
            backToTopBtn.id = 'back-to-top-btn';
            backToTopBtn.innerHTML = '▲';
            backToTopBtn.setAttribute('aria-label', '回到頂部');
            
            backToTopBtn.style.cssText = `
                position: fixed;
                bottom: 25px;
                right: 25px;
                width: 40px;
                height: 40px;
                background-color: ${bBgColor};
                color: ${bTextColor};
                border: 1px solid ${bBorderColor};
                border-radius: 50%;
                font-size: 16px;
                cursor: pointer;
                display: none;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
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

            backToTopBtn.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ==========================================
    // 7. 點擊導覽列「關於」時觸發頭像翻轉
    // ==========================================
    document.addEventListener('click', function(e) {
        const aboutLink = e.target.closest('a[href="/about/"], a[href="#about"]');
        if (aboutLink) {
            e.preventDefault();
            
            const avatarBtn = document.querySelector('.dream-flip-avatar');
            if (avatarBtn) {
                avatarBtn.click();
            }

            const dropdown = document.querySelector('nav .dropdown');
            if (dropdown) {
                dropdown.removeAttribute('open');
                document.activeElement.blur();
            }
        }
    });

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
// 智慧型網頁標題處理：首頁只顯示站名，文章頁保留文章標題
    const path = window.location.pathname;
    if (path === '/' || path === '') {
        document.title = '曉雲ㄉ避風港';
    } else {
        // 如果在其他頁面發現開頭有奇怪的橫槓，自動修掉
        let currentTitle = document.title.trim();
        if (currentTitle.startsWith('|')) {
            document.title = currentTitle.replace('|', '').trim();
        }
    }
// ==========================================
        // 8. 強制清除首頁文章卡片底下的閱讀時間與時鐘
        // ==========================================
        const cardActions = document.querySelectorAll('.card-actions');
        cardActions.forEach(action => {
            if (action.innerHTML.includes('time')) {
                action.remove();
            }
        });
})();