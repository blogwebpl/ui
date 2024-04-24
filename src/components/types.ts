export interface IInventoryItem {
	id: string;
	dgId: number;
	inventoryNumber: string;
	itemName: string;
	leadPerson?: string;
	owner: string;
	quantity?: number;
	unitMeasure?: string;
	status: number;
	notes?: string;
}

export const languages = ['en', 'pl'] as const;

export const labelsDefault: Record<(typeof languages)[number], string> =
	languages.reduce(
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
