
//使用匿名函数自执行，防止定义的变量名被外部污染。
(function() {

	//root 为了捕捉外部环境，this赋给root,root下的内容会暴露给匿名函数外部
	var root = (((typeof self) == 'object') && ((self.self) === self) && self) || (((typeof global) == 'object') && (global.global === global) && global) || this || {};

	//设置_变量
	var previousUnderscore = root._;

	//起变量名，为了节省字节在压缩的时候。
	var ArrayProto = Array.prototype;

		ObjProto = Object.prototype;

	var SymbolProto = (typeof Symbol !== 'undefined') ? Symbol.prototype : null;

	//设置方法的简写
	var push = ArrayProto.push,

		slice = ArrayProto.slice,

		toString = ObjProto.toString,

		hasOwnProperty = ObjProto.hasOwnProperty;


	// 我们想用ecmascript 5已经实现方法，在这里声明	
	var nativeIsArray = Array.isArray;

		nativeKeys = Object.keys;

		nativeCreate = Object.create;

	
	// Ctor 兼顾老版本的兼容
	var Ctor = function () {};

	var _ = function (obj) {

		if(obj instanceof _) return obj;

		if(!(this instanceof _)) return new _(obj);

		this._wrapped = obj;
	};

	//将定义的局部变量'_' 赋值给全局对象中的'_'属性
	//客户端 window._ = _
	//服务端(node) exports._ = _
	//同时在服务端向后兼容
	if (((typeof exports) != 'undefined') && (!(exports.nodeType))){

		if((((typeof module) != 'undefined') && (!(module.nodeType))) && (module.exports)){
			exports = module.exports = _;
		}
		exports._ = _;

	}else{
		root._ = _;
	};
	//当前underscore版本号
	_.VERSION = "1.8.3";

	//内部方法, 根据this的指向(context 参数) 和 argCount 参数， 二次操作返回一些回调、迭代方法 void 0相当于undefined
	//有些参数未定义？
	var optimizeCb = function(func, context, argCount) {
		if (context === void 0) return func;
		switch (argCount) {
			case 1: return function(value) {
				return func.call(context, value);
			};

			case null :
			//_.each、_.map
			case 3: return function(value, index, collection) {
				return func.call(context, value, index, collention);
			};

			//_.reduce、_.reduceRight
			case 4: return function(accumulator, value, index, collection){
				return func.call(context, accumulator, value, index, collection);
			}
		};

		return function() {
			return func.apply(context, arguments);
		}

	};

	var builtinIteratee;

	//cb内部函数,根据value的类型生成会掉函数
	var cb = function(value, context, argCount) {
		if (_.iteratee !== builtinIteratee) return _.iteratee(value, context);
		if(value == null) return _.identity;
		if(_.isFuntion(value)) return optimizeCb(value, context, argCount);
		if(_.isObject(value) && !_.isArray(value) return _.matcher(value));
		return _.property(value);
	};

	_.iteratee = builtinIteratee = function(value, context) {
		return cb(value, context, Infinity);
	};

	//实现类似es6上给其余参数的用法 function.length 该函数有多少个必须要传入的参数，不包括剩余的参数个数，仅包括第一个具有默认值之前的参数个数 
	var restArgs = function(func, startIndex) {
		startIndex = startIndex == null ? func.length - 1 : + startIndex;
		return function() {
			var length = Math.max(func.length - startIndex, 0)
				res = Array(length)
				index = 0;
			for (; index < length; index++){
				res[index] = arguments[startIndex + index];
			};

			switch index {
				case 0: return func.call(this, rest);
				case 1: return func.call(this, arguments[0], rest);
				case 2: return func.call(this, arguments[0], arguments[1], rest)
			};

			var args = Array(startIndex + 1);
			for (var index = 0; index < startIndex; index++) {
				args[index] = arguments[index];
			}
			args[startIndex] = rest;
			return func.apply(this, args);
		}
	};



	//内部实现继承的方法 不是很懂
	var baseCreate = function(prototype) {
		if(!_.isObject(prototype)) return {};
		if(nativeCreate) return nativeCreate(prototype);
		
		Ctor.prototype = prototype;
		var result = new Ctor();
		Ctor.prototype = null;
		return result;
	};

	//闭包
	var shallowProperty = function(key) {
		return function(obj) {
			return obj == null ? void 0 : obj[key];
		}
	};

	var deepGet = function(obj, path) {
		
	};
	//js中能精确的最大数字
	var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;

	//getLength函数
	var getLength = prototype('length');

	var isArrayLike = function(collection) {
		//柯里化的用法
		var length = getLength(collection);
		return typeof length == 'number' && length >= 0 && length <= MAX_ARRAY_INDEX; 
	};

	//









	









})();