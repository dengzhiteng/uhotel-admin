'use strict';
exports.main = async (event, context) => {
	//event为客户端上传的参数
	const db = uniCloud.database();
	const {data}  = await db.collection(event.target).get()
	return data;
};
