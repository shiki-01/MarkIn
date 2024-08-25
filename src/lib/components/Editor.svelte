<script lang="ts">
  import showdown from 'showdown';
  import * as Resizable from "$lib/components/ui/resizable";
  import type { Editor, Focus } from '$lib/script/types.js';
  import Textarea from '$lib/components/Textarea.svelte';
  import TipTapEditor from '$lib/components/TipTapEditor.svelte';

  let editor: Editor = { type: 'Markdown', content: '' };
  let focus: Focus = 'HTML';
  const converter = new showdown.Converter();

  let markdown = '';
  let html = '';

  $: if (editor) {
    editor.type = focus;
    if (editor.type === 'Markdown') {
      editor.content = markdown;
      html = converter.makeHtml(markdown);
    } else {
      editor.content = html;
      markdown = converter.makeMarkdown(html);
    }
  }
</script>

<Resizable.PaneGroup direction="horizontal" class="flex w-full h-full">
  <Resizable.Pane class="h-full border-r border-gray-300">
    {#if editor}
      <Textarea
          bind:content={markdown}
          focus={focus === 'Markdown'}
          handleClick={() => focus = 'Markdown'}
      />
    {/if}
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane class="h-full border-l border-gray-300">
      {#if editor}
        <TipTapEditor
            content={html}
            on:contentChange={(e) => html = e.detail.toString()}
            focus={focus === 'HTML'}
            handleClick={() => focus = 'HTML'}
        />
      {/if}
  </Resizable.Pane>
</Resizable.PaneGroup>