// --- Fix: render "\n" inside bot messages as real new lines ---
const chatRoot = document.querySelector('#n8n-chat');

function normalizeBotMessage(el) {
  // فقط متن‌های داخل markdown
  const nodes = el.querySelectorAll('.chat-message-from-bot .chat-message-markdown p');
  nodes.forEach(p => {
    let t = p.textContent;

    // اگر کل پیام داخل کوتیشن افتاده، کوتیشن‌های اول/آخر رو بردار
    if ((t.startsWith('"') && t.endsWith('"')) || (t.startsWith('“') && t.endsWith('”'))) {
      t = t.slice(1, -1);
    }

    // تبدیل \n های متنی به newline واقعی
    t = t.replace(/\\n/g, '\n');

    // اگر markdown-style دو فاصله + \n داشتی، همون newline کافیه
    p.textContent = t;

    // اطمینان از اینکه newline ها دیده میشن
    p.style.whiteSpace = 'pre-wrap';
  });
}

// اجرا برای پیام‌های موجود
normalizeBotMessage(chatRoot);

// مانیتور برای پیام‌های جدید
const mo = new MutationObserver(() => normalizeBotMessage(chatRoot));
mo.observe(chatRoot, { childList: true, subtree: true });
