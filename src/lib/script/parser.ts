interface EditorData {
	time: number;
	blocks: Block[];
	version: string;
}

interface Block {
	id: string;
	type: BlockType;
	data: BlockData;
}

type BlockType =
	| 'paragraph'
	| 'heading'
	| 'code'
	| 'raw'
	| 'image'
	| 'list'
	| 'quote'
	| 'table'
	| 'taskList'
	| 'details'
	| 'detailsSummary'
	| 'file';

type BlockData =
	| ParagraphData
	| HeadingData
	| CodeData
	| RawData
	| ImageData
	| ListData
	| QuoteData
	| TableData
	| TaskListData
	| DetailsData
	| DetailsSummaryData
	| FileData;

interface ParagraphData {
	text: string;
}

interface HeadingData {
	text: string;
	level: number;
}

interface CodeData {
	mode: string;
	code: string;
}

interface RawData {
	html: string;
}

interface ImageData {
	url: string;
	caption: string;
}

interface ListData {
	style: 'ordered' | 'unordered';
	items: string[];
}

interface QuoteData {
	alignment: 'left' | 'center' | 'right';
	caption: string;
	text: string;
}

interface TableData {
	content: string[][];
}

interface TaskListData {
	tasks: { text: string; checked: boolean }[];
}

interface DetailsData {
	summary: string;
	content: string;
}

interface DetailsSummaryData {
	summary: string;
}

interface FileData {
	url: string;
	name: string;
}

class Parser {
	private readonly data: EditorData;

	constructor(data: EditorData) {
		this.data = data;
	}

	parseToMarkdown(): string {
		return this.data.blocks.map(block => this.blockToMarkdown(block)).join('\n\n');
	}

	parseToRichText(): EditorData {
		return this.data;
	}

	private blockToMarkdown(block: Block): string {
		switch (block.type) {
			case 'paragraph':
				return (block.data as ParagraphData).text;
			case 'heading':
				{ const heading = block.data as HeadingData;
				return `${'#'.repeat(heading.level)} ${heading.text}`; }
			case 'code':
				{ const code = block.data as CodeData;
				return `\`\`\`${code.mode}\n${code.code}\n\`\`\``; }
			case 'raw':
				return (block.data as RawData).html;
			case 'image':
				{ const image = block.data as ImageData;
				return `![${image.caption}](${image.url})`; }
			case 'list':
				{ const list = block.data as ListData;
				return list.items.map(item => list.style === 'ordered' ? `1. ${item}` : `- ${item}`).join('\n'); }
			case 'quote':
				{ const quote = block.data as QuoteData;
				return `> ${quote.text}\n> -- ${quote.caption}`; }
			case 'table':
				{ const table = block.data as TableData;
				return table.content.map(row => `| ${row.join(' | ')} |`).join('\n'); }
			case 'taskList':
				{ const taskList = block.data as TaskListData;
				return taskList.tasks.map(task => `- [${task.checked ? 'x' : ' '}] ${task.text}`).join('\n'); }
			case 'details':
				{ const details = block.data as DetailsData;
				return `<details><summary>${details.summary}</summary>${details.content}</details>`; }
			case 'detailsSummary':
				return `<summary>${(block.data as DetailsSummaryData).summary}</summary>`;
			case 'file':
				{ const file = block.data as FileData;
				return `[${file.name}](${file.url})`; }
			default:
				return '';
		}
	}
}
