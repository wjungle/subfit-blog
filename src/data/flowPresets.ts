// 訓練流程模板：對應主 app 的 src/constants/flowPresets.js（FLOW_PRESETS + SESSION_BLOCKS）
// 與 src/constants/trainingStates.js（各階段說明與背景色）。
// ⚠️ 主 app 調整模板或階段時，這裡要手動同步。

export type PhaseId =
	| 'BLIND_LISTEN'
	| 'COMPREHENSION'
	| 'PURE_LISTEN'
	| 'READ_LISTEN'
	| 'SHADOWING'
	| 'SPEAK_OUT'
	| 'STRIPPING'
	| 'CHINESE_TTS'
	| 'REVIEW';

export interface Phase {
	name: string;
	group: '整段暖身' | '逐句精練';
	/** app 訓練畫面該階段的背景色（bgGame，Tailwind v4 色值） */
	bg: string;
	desc: string;
}

export const PHASES: Record<PhaseId, Phase> = {
	BLIND_LISTEN: { name: '盲聽', group: '整段暖身', bg: '#0f172b', desc: '連續播放，純用耳朵感受語感' },
	COMPREHENSION: { name: '理解', group: '整段暖身', bg: '#1c398e', desc: '聽英文看中文字幕，建立語意連結' },
	PURE_LISTEN: { name: '純聽', group: '逐句精練', bg: '#0f172b', desc: '閉上眼，專注聆聽聲音與語調' },
	READ_LISTEN: { name: '看聽', group: '逐句精練', bg: '#1c398e', desc: '文字聲音對齊，可點開譯文' },
	SHADOWING: { name: '跟讀', group: '逐句精練', bg: '#104e64', desc: '看中文回想英文，揭曉後跟讀' },
	SPEAK_OUT: { name: '開口', group: '逐句精練', bg: '#7b3306', desc: '模仿、錄音，並與原音比對' },
	STRIPPING: { name: '剝離', group: '逐句精練', bg: '#8b0836', desc: '只看首字，憑直覺說出整句' },
	CHINESE_TTS: { name: '聽譯', group: '逐句精練', bg: '#18181b', desc: '聽中文意思，腦中反射英文' },
	REVIEW: { name: '確認', group: '逐句精練', bg: '#004f3b', desc: '揭曉答案、AI 解說，確認記憶' },
};

export interface FlowPreset {
	id: string;
	name: string;
	desc: string;
	/** 先跑批次暖身（sessionBlocks），再跑逐句階段（phases），順序同 app */
	phases: PhaseId[];
}

export const FLOW_PRESETS: FlowPreset[] = [
	{
		id: 'full',
		name: 'SubFit',
		desc: '批次暖身 + 所有逐句階段，完整訓練循環',
		phases: ['BLIND_LISTEN', 'COMPREHENSION', 'READ_LISTEN', 'SHADOWING', 'SPEAK_OUT', 'STRIPPING', 'CHINESE_TTS', 'REVIEW'],
	},
	{
		id: 'hundredLS',
		name: '100LS',
		desc: '盲聽 + 中文字幕確認劇情，寫下所有不會的部份，逐步跟讀',
		phases: ['BLIND_LISTEN', 'COMPREHENSION', 'REVIEW', 'SPEAK_OUT'],
	},
	{
		id: 'shadowing',
		name: '影子跟讀法',
		desc: '盲聽，再聽一次看字幕，熟悉內容後，不看文字跟讀',
		phases: ['BLIND_LISTEN', 'COMPREHENSION', 'READ_LISTEN', 'SPEAK_OUT'],
	},
	{
		id: 'echo',
		name: '回音法',
		desc: '掃過內容，熟讀文字、聽清發音，回音並模仿說出',
		phases: ['BLIND_LISTEN', 'REVIEW', 'SPEAK_OUT'],
	},
	{
		id: 'light',
		name: '輕量模式',
		desc: '跳過批次暖身，聽 → 看 → 說 → 確認',
		phases: ['PURE_LISTEN', 'READ_LISTEN', 'SPEAK_OUT', 'REVIEW'],
	},
	{
		id: 'review',
		name: '複習模式',
		desc: '跳過批次暖身，剝離 + 聽譯 + 確認',
		phases: ['STRIPPING', 'CHINESE_TTS', 'REVIEW'],
	},
];
