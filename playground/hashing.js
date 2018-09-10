// const {SHA256} = require('crypto-js');

// var data = {
// 	id :4
// };

// var token = {
// 	data,
//     hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// };

// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(data)).toString();

// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

// if(resultHash === token.hash){
// 	console.log('Data not changed');
// }
// else{
// 	console.log('data changed..do not trust');
// }

const jwt = require('jsonwebtoken');

//jwt.sign
	// instead of using token function we use json.sign property
var data = {
	id :9
};

var token = jwt.sign(data,'secretCode');
console.log(token); // data is automatically hashed // no need to separately hash

var decoder = jwt.verify(token,'secretCode'); // if we change the toekn value or our secret code 
											 //  then it will show error
											 // no other user can login in others account
console.log('decoder',decoder);