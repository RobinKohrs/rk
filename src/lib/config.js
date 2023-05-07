import { dev } from '$app/environment';

export const title = 'Rob Ko';
export const description = 'some description in the config';
export const url = dev ? 'http://localhost:5173' : 'https://joyofcode.xyz';
export const landing_page_folders = [
	{
		name: 'Maps and Stuff',
		slug: 'posts'
	},
	{
		name: 'Photos',
		slug: 'photos'
	},
	{
		name: 'Github',
		slug: 'github'
	}
];
