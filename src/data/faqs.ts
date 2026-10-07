// FAQ 內容：/faq 頁與首頁精選共用，改這裡兩邊同步
export const faqs: { question: string; answer: string }[] = [
	{
		question: 'SubFit 是什麼？',
		answer:
			'SubFit 是免費的英文聽力與口說練習工具，完整實作 100LS 跟讀法與回音法。匯入任何 SRT 字幕檔，就能開始一句一句的聽力與跟讀訓練。',
	},
	{
		question: '什麼是 100LS 跟讀法？',
		answer:
			'100LS 是由「我在 100 天內自學英文翻轉人生」提出的語言學習方法，核心流程是：先純聽（盲聽）→ 看字幕聽 → 跟讀（shadowing）→ 間隔複習。透過反覆接觸同一句子，讓語感自然內化。',
	},
	{
		question: 'SubFit 如何實作 100LS 的跟讀流程？',
		answer:
			'SubFit 把每句字幕拆成獨立訓練單位，依序走過「純聽 → 看聽 → 跟讀錄音 → AI 發音對比 → 間隔重複複習」五個階段，對應 100LS 的完整學習循環。AI 自然發音取代真人錄音，AI 句子講解補充文法與語意。',
	},
	{
		question: '要怎麼開始用 SubFit 練 100LS？',
		answer:
			'直接開啟 https://subfit.app，選擇內建課程或匯入自己的 SRT 字幕檔，點「開始訓練」即可。不需要註冊帳號，完全免費。',
	},
	{
		question: 'SubFit 支援哪些語言？',
		answer:
			'目前主要支援英文，也可以練日文、荷蘭文等有 SRT 字幕的示範課程。AI 講解與翻譯功能以繁體中文為母語設計。',
	},
];
