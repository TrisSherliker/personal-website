const pluginRss = require('@11ty/eleventy-plugin-rss')
const pluginNavigation = require('@11ty/eleventy-navigation')
const tufteWrapper = require('./util/tufteWrapper')
const searchFilter = require("./util/searchFilter");
const linkToHead = require("./util/linkToHead");

function escapeHtml(str) {
	return str
	.replace(/&/g, "&amp;")
	.replace(/</g, "&lt;")
	.replace(/>/g, "&gt;");
}


module.exports = function (eleventyConfig) {
		// Plugins
		eleventyConfig.addPlugin(pluginRss)
		eleventyConfig.addPlugin(pluginNavigation)

    eleventyConfig.addFilter("search", searchFilter);
    eleventyConfig.addFilter("linkToHead", linkToHead);
    eleventyConfig.addFilter("readableDate", (dateObj) => {
        const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
        return `${days[dateObj.getUTCDay()]} ${dateObj.getUTCDate()} ${months[dateObj.getUTCMonth()]} ${dateObj.getUTCFullYear()}`;
    });

		// Asset Watch Targets
		eleventyConfig.addWatchTarget('./src/assets')

		/* Markdown Configuration */
		let options = {
		    react: false,
    };

		// Markdown
		eleventyConfig.setLibrary("md", tufteWrapper)
    eleventyConfig.addFilter("markdown", tufteWrapper.render)
    eleventyConfig.addFilter("markdownInline", tufteWrapper.renderInline)

		// Layouts
		eleventyConfig.addLayoutAlias('base',			'base.njk')
		eleventyConfig.addLayoutAlias('simple',		'base.njk')
		eleventyConfig.addLayoutAlias('post',		  'base.njk')

		// Pass-through files
		eleventyConfig.addPassthroughCopy('src/admin')
		eleventyConfig.addPassthroughCopy('src/assets')
		eleventyConfig.addPassthroughCopy('src/uploads')

		// A handwriting post is a directory: index.md beside its own ink/ of word
		// SVGs. The page is served from /blog/<slug>/ while the source lives in
		// src/posts/<slug>/, so each ink directory is mapped across to match — the
		// script fetches them relative to the page. Enumerated here rather than
		// listed, so a new post needs no config change.
		require('fs').readdirSync('src/posts', { withFileTypes: true })
			.filter(d => d.isDirectory() && require('fs').existsSync(`src/posts/${d.name}/ink`))
			.forEach(d => eleventyConfig.addPassthroughCopy(
				{ [`src/posts/${d.name}/ink`]: `blog/${d.name}/ink` }))

		// Deep-Merge
		eleventyConfig.setDataDeepMerge(true)

	//custom for ai exchange transcripts
	eleventyConfig.addShortcode("aiExchange", function (id) {
		// Require with cache-busting: node caches require()d modules, so in a
		// long-running `eleventy --serve` process edits to the data file would
		// otherwise never reach this shortcode.
		delete require.cache[require.resolve("./src/_data/aiExchanges.js")];
		const exchanges = require("./src/_data/aiExchanges.js");

		const entry = exchanges[id];
			if (!entry) {
				return `<p style="color:red">Unknown aiExchange id: ${id}</p>`;
			}

			const hasImage = !!entry.image;
			const hasTranscript = !!entry.transcript;
			const defaultTab = hasImage ? "img" : "txt";

			let tabs = "";
			if (hasImage && hasTranscript) {
				tabs = `
				<input type="radio" class="ai-tab ai-tab--img" name="view-${id}" id="${id}-img" ${defaultTab === "img" ? "checked" : ""}>
				<input type="radio" class="ai-tab ai-tab--txt" name="view-${id}" id="${id}-txt" ${defaultTab === "txt" ? "checked" : ""}>
				<div class="ai-tabbar">
				<label class="ai-tablabel ai-tablabel--img" for="${id}-img">Screenshot</label>
				<label class="ai-tablabel ai-tablabel--txt" for="${id}-txt">Transcript</label>
				</div>`;
			}

		// Optional teaser crop for tall screenshots: shown collapsed, swapped
		// for the full screenshot on expand. Without a teaser the panel falls
		// back to CSS top-slice clipping. No loading="lazy": Firefox doesn't
		// reliably start loading lazy images that were display:none, so the
		// full screenshot could stay blank until the next style reflow.
		const teaserImg = entry.teaser
		? `<img class="ai-img-teaser" src="${entry.teaser}" alt="${entry.teaserAlt || entry.imageAlt || entry.title}">`
		: "";

		const imgPanel = hasImage
		? `<div class="ai-panel ai-panel--img${entry.teaser ? " ai-panel--hasteaser" : ""}">${teaserImg}<img class="ai-img-full" src="${entry.image}" alt="${entry.imageAlt || entry.title}"></div>`
		: "";

		// Newlines encoded as &#10; so the markdown parser sees no blank lines
		// inside the blob (a blank line would end the raw-HTML block and the
		// rest of the transcript would be re-parsed as markdown). Blank-line
		// paragraph gaps are collapsed to single newlines for compactness.
		const txtPanel = hasTranscript
		? `<div class="ai-panel ai-panel--txt"><pre>${escapeHtml(entry.transcript.trim().replace(/\n[ \t]*\n+/g, "\n")).replace(/\n/g, "&#10;")}</pre></div>`
		: "";

			// if only one of the two exists, force its panel to always show (no tab needed)
			const soloClass = !(hasImage && hasTranscript) ? "ai-exchange--solo" : "";

		// Shortcode output is injected into the post *before* markdown runs, so
		// it must survive markdown-it's HTML-block rules: no line may be
		// indented (4 spaces / a tab = code block) and no line may be blank
		// (ends the HTML block). Hence the dedent + empty-line filter.
		return `
<div class="ai-exchange ${soloClass}">
<p class="ai-exchange-title">${entry.title}</p>
${tabs}
<input type="checkbox" class="ai-expand" id="${id}-expand">
<label class="ai-expand-label ai-expand-label--top" for="${id}-expand">
<span class="show-more">Show more ▾</span>
<span class="show-less">Show less ▴</span>
</label>
${imgPanel}
${txtPanel}
<label class="ai-expand-label ai-expand-label--bottom" for="${id}-expand">
<span class="show-more">Show more ▾</span>
<span class="show-less">Show less ▴</span>
</label>
</div>`
		.split("\n")
		.map((line) => line.trim())
		.filter((line) => line.length > 0)
		.join("\n");
	});

		// Base Config
		return {
				dir: {
						input: 'src',
						output: 'dist',
						includes: '_includes',
						layouts: '_layouts',
						data: '_data'
				},
				templateFormats: ['njk', 'md', '11ty.js'],
				htmlTemplateEngine: 'njk',
				markdownTemplateEngine: 'njk'
		}
}
