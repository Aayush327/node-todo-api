var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/TodoApp', { useNewUrlParser: true });
//mongoose.connect('mongodb://Aayush27:Aayush273@ds243502.mlab.com:43502/aayush27');


module.exports = {mongoose};