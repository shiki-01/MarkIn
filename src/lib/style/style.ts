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
import * as EmojiPack from '@tiptap-pro/extension-emoji';
import { gitHubEmojis } from '@tiptap-pro/extension-emoji';
import suggestion from '$lib/script/suggestion/emoji.js';
import HardBreak from '@tiptap/extension-hard-break'
import HorizontalRule from '@tiptap/extension-horizontal-rule'
import Image from '@tiptap/extension-image'
import Dropcursor from '@tiptap/extension-dropcursor'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'
import Bold from '@tiptap/extension-bold'
import Code from '@tiptap/extension-code'
import Highlight from '@tiptap/extension-highlight'
import Italic from '@tiptap/extension-italic'
import Link from '@tiptap/extension-link'
import Strike from '@tiptap/extension-strike'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import TextStyle from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import CharacterCount from '@tiptap/extension-character-count'
import { Color } from '@tiptap/extension-color'
import * as FileHandlerPack from '@tiptap-pro/extension-file-handler'
import type { Editor } from '@tiptap/core';
import { Mathematics } from '@tiptap-pro/extension-mathematics'
import TextAlign from '@tiptap/extension-text-align'
import Typography from '@tiptap/extension-typography'
import Slash from '$lib/script/suggestion/slash/slash.js'
import slashSuggestions from '$lib/script/suggestion/slash/suggestion.js';

const { Emoji } = EmojiPack;
const { FileHandler } = FileHandlerPack;

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
		HTMLAttributes: undefined,
		forceFallbackImages: false,
		emojis: gitHubEmojis,
		enableEmoticons: true,
		suggestion,
	}),
	Slash.configure({
		suggestion: slashSuggestions,
	}),
	HardBreak,
	HorizontalRule,
	Image,
	Dropcursor,
	ListItem,
	OrderedList,
	Table.configure({
		resizable: true,
	}),
	TableRow,
	TableHeader,
	TableCell,
	TaskList,
	TaskItem.configure({
		nested: true,
	}),
	Bold,
	Code,
	Highlight,
	Italic,
	Link,
	Strike,
	Subscript,
	Superscript,
	TextStyle,
	Underline,
	CharacterCount,
	Color,
	Mathematics,
	TextAlign.configure({
		types: ['heading', 'paragraph'],
	}),
	Typography,
	FileHandler.configure({

		allowedMimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
		onDrop: (currentEditor: Editor, files: Blob[], pos: number) => {
			files.forEach(file => {
				const fileReader = new FileReader()

				fileReader.readAsDataURL(file)
				fileReader.onload = () => {
					currentEditor.chain().insertContentAt(pos, {
						type: 'image',
						attrs: {
							src: fileReader.result,
						},
					}).focus().run()
				}
			})
		},
		onPaste: (currentEditor: Editor, files: Blob[]) => {
			files.forEach(file => {
				const fileReader = new FileReader()

				fileReader.readAsDataURL(file)
				fileReader.onload = () => {
					currentEditor.chain().insertContentAt(currentEditor.state.selection.anchor, {
						type: 'image',
						attrs: {
							src: fileReader.result,
						},
					}).focus().run()
				}
			})
		},
	}),
];
