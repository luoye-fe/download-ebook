const { getMetaDataFromDouban } = require('./fetch.js');
const { genEpub } = require('./generate.js');

function EbookDownload(options, cb) {
	return new Promise((resolve, reject) => {
		fetchFormatData(options.id, options.from)
			.then(res => {
				return genEpub(res, options.output || res.title + '.epub');
			})
			.then(() => {
				console.log('success');
			})
			.catch(e => {
				console.log(e);
			})
	});
}

function fetchFormatData(id, from) {
	switch (from) {
		case 'douban':
			return getMetaDataFromDouban(id);
		case 'wangyi':
			return console.log('来自网易');
		case undefined: 
			throw 'from 参数必选';
	}
}

module.exports = EbookDownload;
