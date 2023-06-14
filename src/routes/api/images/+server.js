import fs from 'fs';
import { json } from '@sveltejs/kit';

async function getImages() {
	let images = fs.readdirSync('./static/images/random/');
	return images;
}

export async function GET() {
	const images = await getImages();
	let jso = JSON.stringify(images);
	return json(images);
}
