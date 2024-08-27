<script lang="ts">
  import { onMount } from 'svelte';
  import showdown from 'showdown';
  import * as ResizableComp from "$lib/components/ui/resizable/index.js";
  const Resizable = ResizableComp;
  import type { Editor, Focus } from '$lib/script/types.js';
  import Textarea from '$lib/components/Textarea.svelte';
  import TipTapEditor from '$lib/components/TipTapEditor.svelte';

  let editor: Editor = { type: 'Markdown', content: '' };
  let focus: Focus = 'HTML';

  let converter: showdown.Converter;

  onMount(() => {
    converter = new showdown.Converter();
    editor = { type: 'Markdown', content: converter.makeMarkdown('Hello, **world**!') };
  });

  let markdown = '';
  let html = '';

  $: if (editor && converter) {
    console.log(editor);
    editor.type = focus;
    if (editor.type === 'Markdown') {
      editor.content = markdown;
      html = converter.makeHtml(markdown);
    } else {
      editor.content = converter.makeMarkdown(html);
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