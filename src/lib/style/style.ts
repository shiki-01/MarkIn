import Document from '@tiptap/extension-document';
import Heading from '@tiptap/extension-heading';
import Paragraph from '@tiptap/extension-paragraph';
import Text from '@tiptap/extension-text';
import Blockquote from '@tiptap/extension-blockquote';
import BulletList from '@tiptap/extension-bullet-list';
import { all, createLowlight } from 'lowlight';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Placeholder from '@tiptap/extension-placeholder';
import Details from '@tiptap-pro/extension-details';
import DetailsContent from '@tiptap-pro/extension-details-content';
import DetailsSummary from '@tiptap-pro/extension-details-summary';
import Emoji, { gitHubEmojis } from '@tiptap-pro/extension-emoji';

const lowlight = createLowlight(all);

lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);

export const style = [
	Document,
	Paragraph,
	Text,
	Heading.configure({
		levels: [1, 2, 3],
	}),
	Blockquote,
	BulletList,
	CodeBlockLowlight.configure({
		lowlight,
	}),
	Details,
	DetailsSummary,
	DetailsContent,
	Placeholder.configure({
		includeChildren: true,
		placeholder: ({ node }) => {
			if (node.type.name === 'detailsSummary') {
				return 'Summary';
			}

			return '';
		},
	}),
	Emoji.configure({
		emojis: gitHubEmojis,
		enableEmoticons: true,
		suggestion,
	}),
];
