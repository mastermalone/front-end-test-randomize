/**
 * @author mastermalone
 */
"use strict";

(function(){
	//Force Object.create method for legacy browsers
	if(typeof Object.create !== "function"){
		Object.create = function(o){
			var F = function(o){
				//Empty Constructor
			}
			F.prototype = o;
			return new F();
		}
	}
	
	//Inheritence pattern
	function inheritFromParentPrototype(childObject, parentObject){
		var copyOfParentProto = Object.create(parentObject.prototype);
		
		//Give childObject a contructor since it's prototype will be overwritten
		copyOfParentProto.constructor = childObject;
		
		//Assign the value of the childObject's prototype as the copyOfParent
		childObject.prototype = copyOfParentProto;
	}
	//Create Base Class constructor
	function Randomizer(obj){
		//Public Vars
		this.obj = obj;
		this.getInformation = function(){
			console.log("Value of Object", typeof this.obj.constructor);
		};
		//Private Methods is needed
		function getInfo(obj){
			obj = this.object;
			console.log("From get info", obj.constructor);
		}
	}
	//Add public methods to the prototype
	Randomizer.prototype = {
		constructor: Randomizer,
		init: function(obj){
			obj = this.obj;
			var i = obj.length, j, tempArr;
			
			if(i === 0){
				return obj;
			}
			
			//Count down from the length of the obj with --i
			while(--i){
				//console.log("Value of i", i);
				j = Math.floor(Math.random()*(i));
				tempArr = obj[i];
				obj[i] = obj[j];
				obj[j] = tempArr;
				//console.log("Value of j", tempArr);
			}
			//Return the value of this shuffled array for use
			return obj;
		},
		addRandomizedElements: function(elmType, targ){
			//Assign the value returned from the init method
			var obj = this.init();
			var targetElm = document.getElementById(targ);
			var frag = document.createDocumentFragment();
			var i, txt, el;
			
			//Empty out the target DOM Element
			while(targetElm.firstChild){
				targetElm.removeChild(targetElm.firstChild);
			}
			
			//Create the new content
			for(i = 0; i < obj.length; i++){
				txt = document.createTextNode(obj[i]);
				el = document.createElement(elmType);
				el.appendChild(txt);
				frag.appendChild(el);
			}
			//Add Fragment to targeted DOM Element
			targetElm.appendChild(frag);
		}
	};
	
	//RandomArray will inherit from Randomize
	function RandomArray(obj){
		//Set 'this' to this function and borrow from Randomizer's methods
		Randomizer.call(this, obj);
	}
	inheritFromParentPrototype(RandomArray, Randomizer);
	
	//Site Functions
	var LampsUtils = {
		defaultArr: ["Cereal", "Milk", "Eggs", "Bacon", "Pancake Mix", "Butter", "Syrup" ],
		makeRandom: function(obj){
			var randomArr;
			//Setup new instance of RandomArray
			if(typeof obj === "undefined"){
				randomArr = new RandomArray(this.defaultArr);
				randomArr.getInformation();
				randomArr.addRandomizedElements("LI", "grocery-list");
			}else{
				//Add your own array instead of the default
				randomArr = new RandomArray(obj);
			}
		},
		initEvent: function(el){
			//Set event listener on target element
			var btn = document.getElementById(el);
			if(btn.addEventListener){
				btn.addEventListener("click", this.setRandomClickEvent, true);
			}else{
				btn.attachEvent("onclick", this.setRandomClickEvent);
			}
		},
		setRandomClickEvent: function(e){
			//Click Event Handler
			e.preventDefault();
			var targ = window.addEventListener ? e.target : e.srcElement;
			LampsUtils.makeRandom();
		},
		setHeight: function(el, parentEl){
			var targetEl = document.getElementById(el);
			var prntEl = document.getElementById(parentEl);
			var i, tempArr, heightArr = [];
			//Loop throght parentEl and get all child element hieghts
			//Push the heights into an array
			for(i = 0; i < prntEl.children.length; i++){
				heightArr.push(prntEl.children[i].offsetHeight);
			}
			//Assign the sorted value of the heights to tempArr
			tempArr = heightArr.sort();
			targetEl.style.height = tempArr[tempArr.length -1]+"px";
		}
	};
	LampsUtils.initEvent("btn-random");
	LampsUtils.setHeight("divider", "main");
})();

