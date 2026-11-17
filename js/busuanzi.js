// 動態載入不蒜子計數腳本
const script = document.createElement('script');
script.src = 'https://busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js';
script.async = true;
document.head.appendChild(script);

window.addEventListener('DOMContentLoaded', () => {
  // 1. 頁尾總訪問量
  const footer = document.querySelector('footer');
  if (footer) {
    const stats = document.createElement('div');
    stats.style.marginTop = '6px';
    stats.style.fontSize = '0.85rem';
    stats.style.opacity = '0.8';
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      stats.innerHTML = '本站總訪問量（本地預覽中）';
    } else {
      stats.innerHTML = '本站總訪問量 <span id="busuanzi_value_site_pv">--</span> 次 ｜ 訪客數 <span id="busuanzi_value_site_uv">--</span> 人';
    }
    footer.appendChild(stats);
  }

  // 2. 文章內頁：將日期資訊列改為彈性盒模型 (Flexbox)，把閱讀次數推到最右邊
  const metaContainer = document.querySelector('.post-meta') || document.querySelector('header .flex');
  if (metaContainer && window.location.pathname.includes('/posts/')) {
    // 讓原本的日期資訊區塊左右撐開
    metaContainer.style.display = 'flex';
    metaContainer.style.justifyContent = 'space-between';
    metaContainer.style.alignItems = 'center';
    metaContainer.style.width = '100%';

    // 建立閱讀次數標籤並靠右對齊
    const postViews = document.createElement('div');
    postViews.style.fontSize = '0.85rem';
    postViews.style.opacity = '0.8';
    postViews.style.marginLeft = 'auto';
    
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      postViews.innerHTML = '🔥 閱讀次數：(本地測試)';
    } else {
      postViews.innerHTML = '🔥 閱讀次數：<span id="busuanzi_value_page_pv">--</span>次';
    }
    metaContainer.appendChild(postViews);
  }
});