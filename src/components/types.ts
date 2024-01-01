export const languages = ['en', 'pl'] as const;

export const labelsDefault: Record<(typeof languages)[number], string> = languages.reduce(
	(acc, lang) => {
		acc[lang] = '';
		return acc;
	},
	{} as Record<(typeof languages)[number], string>
);

export type Language = (typeof languages)[number];

export type Translations = {
	[key in Language]: string;
};
