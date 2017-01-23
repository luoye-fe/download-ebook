/* 最终数据格式
 {
	title: '',
	author: '',
	cover: '',
	content: [{
		title: '',
		data: ''
	}]
 }
 */

const fetch = require('node-fetch');
const FormData = require('form-data');

const { decodeDouban } = require('./decode.js');

// 获取豆瓣原始数据
exports.getMetaDataFromDouban = function(id) {
	return new Promise((resolve, reject) => {
		let result = {};
		let COLUMN_API = 'https://read.douban.com/j/column/';
		let DETAIL_API = 'https://read.douban.com/j/article_v2/get_reader_data';
		fetch(COLUMN_API + id)
			.then(res => {
				return res.json();
			})
			.then(res => {
				result['title'] = res.title;
				result['author'] = res.agent.name;
				result['cover'] = res.retina_cover;
				result['content'] = [];

				loop(res.chapters);

				function loop(chapters) {
					let chaptersList = [...chapters];

					function innerLoop() {
						let oneChapter = chaptersList[0];
						if (!oneChapter) {
							return resolve(result);
						}
						var form = new FormData();
						form.append('aid', oneChapter.id);
						form.append('reader_data_version', 'v13');
						fetch(DETAIL_API, {
								method: 'POST',
								body: form
							})
							.then(res => {
								return res.json();
							})
							.then(res => {
								let decodeData = decodeDouban(res.data).posts[0].contents;
								let cur = '';
								decodeData.forEach(item => {
									cur += item.data.text + '\n';
								})
								result['content'].push({
									title: oneChapter.title,
									data: cur
								});
								chaptersList.splice(0, 1);
								innerLoop();
							})
							.catch(err => {
								reject(err);
							})
					}
					innerLoop();
				}
			})
			.catch(err => {
				reject(err);
			})
	});
}
