export type Language = 'pl' | 'en';

export type Translations = {
	[key in Language]: string;
};
