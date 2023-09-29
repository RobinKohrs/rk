/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		screens: {
			dt: '640px'
			// => @media (min-width: 640px) { ... }
		}
	},
	plugins: []
};
