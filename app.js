var express = require('express');
var routes = require('./routes');

var http = require('http');
var path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 5000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

var path = require('path');
app.use('/scripts', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

var comments = require('./routes/comments');
app.get('/comments', comments.comments);

//Create temporary storage items
var ratings = [
  {
    classId: 0,
    ratingCount: 0,
    ratingTotal: 0

  },
  {
    classId: 1,
    ratingCount: 0,
    ratingTotal: 0
  },
  {
    classId: 2,
    ratingCount: 0,
    ratingTotal: 0
  },
  {
    classId: 3,
    ratingCount: 0,
    ratingTotal: 0
  },
  {
    classId: 4,
    ratingCount: 0,
    ratingTotal: 0
  },
  {
    classId: 5,
    ratingCount: 0,
    ratingTotal: 0
  }
];

var commentCounts = [0, 0, 0, 0, 0, 0];
var classTitles = ['COMP 202 - Intro to Computer Programming', 'FACC 100 - Intro to Engineering Profession', 'ECSE 334 - Intro to Microelectronics', 'COMP 551 - Applied Machine Learning', 'COMP 424 - Artifical Intelligence', 'COMP 250 - Introduction To Computer Science'];
var classDescriptions = [
  'Introduction to computer programming in a high level language: variables, expressions, primitive types, methods, conditionals, loops. Introduction to algorithms, data structures (arrays, strings), modular software design, libraries, file input/output, debugging, exception handling.',
  'Introduction to engineering practice; rights and code of conduct for students; professional conduct and ethics; engineer\'s duty to society and the environment; sustainable development; occupational health and safety; overview of the engineering disciplines taught at McGill.',
  'Single-stage integrated-circuit amplifiers; differential and multistage amplifiers, integrated-circuit biasing techniques; non-ideal characteristics, frequency response; feedback amplifiers, output stages; digital CMOS logic circuits.',
  'Selected topics in machine learning and data mining, including clustering, neural networks, support vector machines, decision trees. Methods include feature selection and dimensionality reduction, error estimation and empirical validation, algorithm design and parallelization, and handling of large data sets. Emphasis on good methods and practices for deployment of real systems.',
  'Introduction to search methods. Knowledge representation using logic and probability. Planning and decision making under uncertainty. Introduction to machine learning.',
  'Mathematical tools (binary numbers, induction, recurrence relations, asymptotic complexity, establishing correctness of programs), Data structures (arrays, stacks, queues, linked lists, trees, binary trees, binary search trees, heaps, hash tables), Recursive and non-recursive algorithms (searching and sorting, tree and graph traversal). Abstract data types, inheritance. '
];
var imageUrls = ['/img/stars0.png', '/img/stars0.png', '/img/stars0.png', '/img/stars0.png', '/img/stars0.png','/img/stars0.png'];

global.ratings = ratings;
global.comments = [];
global.commentCounts = commentCounts;
global.classTitles = classTitles;
global.classDescriptions = classDescriptions;
global.imageUrls = imageUrls;

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
