/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			// => @media (min-width: 650px) { ... }
			dt: '650px',
			wd: '900px'
		}
	},
	plugins: []
};
