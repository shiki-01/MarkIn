import { Octokit } from '@octokit/rest';
import { retry } from "@octokit/plugin-retry";
import { throttling } from "@octokit/plugin-throttling";
import { Endpoints } from "@octokit/types";

export const octokit = new Octokit({
	auth: process.env.GITHUB_TOKEN,
	userAgent: 'MarkIn VCS',
	previews: ['mercy-preview'],
	timeZone: 'Asia/Tokyo',
	baseUrl: 'https://api.github.com',
	log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
    },
	    request: {
        agent: undefined,
        fetch: undefined,
        timeout: 0
    }
});

export const { data: pullRequest } = await octokit.rest.pulls.get({
	owner: 'octokit',
    repo: 'rest.js',
    pull_number: 123,
})

export const { data: diff } = await octokit.rest.pulls.get({
	owner: 'octokit',
    repo: 'rest.js',
    pull_number: 123,
    mediaType: {
        format: 'diff'
    }
})

export const { data: root } = await octokit.request('GET /');

const MarkInOctokit = octokit.plugin(retry, throttling);
export const markinOctokit = new MarkInOctokit({
    auth: process.env.GITHUB_TOKEN,
    userAgent: 'MarkIn VCS',
    previews: ['mercy-preview'],
    timeZone: 'Asia/Tokyo',
    baseUrl: 'https://api.github.com',
    log: {
        debug: () => {},
        info: () => {},
        warn: console.warn,
        error: console.error
    },
        request: {
        agent: undefined,
        fetch: undefined,
        timeout: 0
    }
});