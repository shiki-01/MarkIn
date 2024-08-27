import { Extension } from '@tiptap/core';
import Suggestion from '@tiptap/suggestion'
import type { CommandWithProps } from '$lib/script/types.js';

export default Extension.create({
	name: 'slash',

	addOptions() {
		return {
			suggestion: {
				char: '/',
				command: ({ editor, range, props }: CommandWithProps) => {
					props.command({ editor, range })
				},
			},
		}
	},

	addProseMirrorPlugins() {
		return [
			Suggestion({
				editor: this.editor,
				...this.options.suggestion,
			}),
		]
	},
})