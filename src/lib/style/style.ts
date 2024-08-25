import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';

export const style = [
	Document,
	Paragraph,
	Text,
	Heading.configure({
		levels: [1, 2, 3],
	}),
];
