const Epub = require("epub-gen");

// 生成 epub
exports.genEpub = function(bookInfo, output) {
	return new Promise((resolve, reject) => {
		bookInfo.content.forEach(item => {
			item.text = `<p>${item.text}</p>`;
		});
		new Epub(bookInfo, output).promise.then(function() {
			resolve();
		}, function(err) {
			reject(err);
		});
	});
}
