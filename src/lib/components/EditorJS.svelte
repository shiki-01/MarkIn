<script lang="ts">
	import Editor from 'sveditorjs';

	let data = {}
	let modes = {
		'js': 'JavaScript',
		'py': 'Python',
		'go': 'Go',
		'cpp': 'C++',
		'cs': 'C#',
		'md': 'Markdown',
	}

	async function handleOnReady(event) {
		if (typeof window === 'undefined') return
		const { default: DragDrop } = await import('editorjs-drag-drop');
		const editor = event.detail.editor;
		editor.isReady.then(() => {
			if (typeof window !== 'undefined') {
				new DragDrop(editor);
			}
		});
	}

	async function handleContentChange(event) {
		const editor = event.detail.editor;
		editor.save().then(async (outputData) => {
			data = outputData;
		});
		console.log(data);
	}
</script>

<Editor {data} {modes} on:editor_ready={(e) => handleOnReady(e)} on:editor_change={(e) => handleContentChange(e)} />