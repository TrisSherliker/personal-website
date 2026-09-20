// xkcd subset viewer. Data comes from /assets/xkcd/data.js (window.XKCD_COMICS).
// Nav (|<< < Prev Random Next > >>|) is confined to the curated subset;
// Random picks uniformly from it, never repeating the current comic.
// #<num> in the URL deep-links to a comic; arrow keys navigate.
(function () {
	var comics = (window.XKCD_COMICS || []).slice().sort(function (a, b) { return a.num - b.num; });
	var ctitle = document.getElementById('ctitle');
	var img = document.getElementById('comicImg');
	var ttext = document.getElementById('ttext');
	var pl = document.getElementById('permalink');
	var iu = document.getElementById('imgurl');

	if (!comics.length) {
		ctitle.textContent = 'No comics loaded';
		return;
	}

	// Land on the newest comic, as xkcd.com's front page does.
	var i = comics.length - 1;

	var NAV = [
		['first', '|<<'],
		['prev', '< Prev'],
		['random', 'Random'],
		['next', 'Next >'],
		['last', '>>|'],
	];

	function buildNav(ul) {
		NAV.forEach(function (item) {
			var li = document.createElement('li');
			var a = document.createElement('a');
			a.href = '#';
			a.dataset.action = item[0];
			a.textContent = item[1];
			a.addEventListener('click', function (e) { e.preventDefault(); go(item[0]); });
			li.appendChild(a);
			ul.appendChild(li);
		});
	}
	buildNav(document.getElementById('navTop'));
	buildNav(document.getElementById('navBottom'));

	function go(action) {
		if (action === 'first') i = 0;
		else if (action === 'prev' && i > 0) i--;
		else if (action === 'next' && i < comics.length - 1) i++;
		else if (action === 'last') i = comics.length - 1;
		else if (action === 'random' && comics.length > 1) {
			var r;
			do { r = Math.floor(Math.random() * comics.length); } while (r === i);
			i = r;
		}
		render();
	}

	function render() {
		var c = comics[i];
		ctitle.textContent = c.title;
		img.src = c.img;
		if (c.img2x) img.srcset = c.img2x + ' 2x';
		else img.removeAttribute('srcset');
		img.alt = c.title;
		img.title = c.alt; // hover-text punchline
		ttext.textContent = 'Title text: "' + c.alt + '"'; // visible copy for touch devices
		pl.href = c.permalink;
		pl.textContent = c.permalink;
		iu.href = c.imgUrl;
		iu.textContent = c.imgUrl;
		history.replaceState(null, '', '#' + c.num);
		var atStart = i === 0,
			atEnd = i === comics.length - 1;
		document.querySelectorAll('.comicNav a').forEach(function (a) {
			var act = a.dataset.action;
			a.classList.toggle('disabled',
				((act === 'first' || act === 'prev') && atStart) ||
				((act === 'next' || act === 'last') && atEnd));
		});
	}

	window.addEventListener('keydown', function (e) {
		if (e.key === 'ArrowLeft') go('prev');
		else if (e.key === 'ArrowRight') go('next');
	});

	// Deep-link: #3296 opens that comic if it's in the subset.
	var fromHash = comics.findIndex(function (c) { return c.num === parseInt(location.hash.slice(1), 10); });
	if (fromHash >= 0) i = fromHash;

	render();
})();
