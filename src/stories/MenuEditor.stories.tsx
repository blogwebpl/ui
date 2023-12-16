import { MenuEditor, MenuItem } from '../components/MenuEditor';

	const items: MenuItem[] = [
		{
		  "_id": "654a8a1600fd5dfffc785227",
		  "label": {
			"en": "Inventory items",
			"pl": "Przedmioty na stanie"
		  },
		  "slug": "/inventoryItems"
		},
		{
		  "_id": "654a880300fd5dfffc785226",
		  "label": {
			"en": "Inventory",
			"pl": "Inwentaryzacja"
		  },
		  "icon": "inventory"
		},
		{
		  "_id": "6502e827a9c5fc31bb21f454",
		  "label": {
			"en": "Map",
			"pl": "Mapa"
		  },
		  "icon": "map",
		  "slug": "/map"
		},
		{
		  "_id": "6502e7f2a9c5fc31bb21f453",
		  "label": {
			"en": "Roles",
			"pl": "Grupy"
		  },
		  "slug": "/roles"
		},
		{
		  "_id": "6502e7f2a9c5fc31bb21f452",
		  "label": {
			"en": "Users",
			"pl": "Użytkownicy"
		  },
		  "slug": "/users"
		},
		{
		  "_id": "6502e7f2a9c5fc31bb21f451",
		  "label": {
			"en": "Settings",
			"pl": "Ustawienia"
		  },
		  "icon": "settings"
		}
	];

	const menu: Menu = {
		"_id": "6502e9f8a9c5fc31bb21f455",
		"name": "Admin menu",
		"menuItems": [
		  {
			"item": "6502e7f2a9c5fc31bb21f451"
		  },
		  {
			"parent": "6502e7f2a9c5fc31bb21f451",
			"item": "6502e7f2a9c5fc31bb21f452"
		  },
		  {
			"parent": "6502e7f2a9c5fc31bb21f451",
			"item": "6502e7f2a9c5fc31bb21f453"
		  },
		  {
			"item": "654a880300fd5dfffc785226"
		  },
		  {
			"parent": "654a880300fd5dfffc785226",
			"item": "654a8a1600fd5dfffc785227"
		  },
		  {
			"item": "6502e827a9c5fc31bb21f454"
		  }
		]
	  };
	  

const Template = (args: any) => {
	return (
		<MenuEditor items={items} menu={menu} language="pl" />
	);
};

export default { component: Template, title: 'MenuEditor' };
export const Default = { args: {  } };
