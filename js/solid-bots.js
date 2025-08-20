/*
this file contains a Bots class which user can use for implementing a collection of 
autonomous agents grouped by a certain intelligent behavior (such as flock) based on individual
steering behaviors

The MIT License (MIT)

Copyright (c) 2012 Burdisso Sergio

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*/
 function SolidBots(args) {
 	//region Arguments default value mapping
		args = $.extend(
		{
			idDOMParent 	: "body",
			rotationEnabled : true,
			numberOfBots	: 20,
			numberOfBadBots : 0,
			borderType 		: SolidBot.BorderType.Solid,
			maxVelocity 	: 2
		},  args);
	//end region Arguments default value mapping
	//
 	//region Attributes
 		//private:
	 	var _bots = new Array(args.numberOfBots);
	 	var _badBots = new Array(args.numberOfBadBots);

	 	var _mouseController = {
	 		_loc: new Vector(-1,-1),
	 		getLocation: function(){return this._loc}
	 	}
	 	_mouseController.wrapper = [_mouseController];
 	//end region Attributes
 	//
 	//region Methods
 		//pulic:
 		//region behavior methods
	 		this.display = function() {
				for (var i=_bots.length-1; i >= 0; --i){
	 				_bots[i].display();
	 			}

	 			for (var i=_badBots.length-1; i >= 0; --i){
	 				_badBots[i].wander();
	 				_badBots[i].separate(_badBots);
	 				_badBots[i].display();
	 			}
			}

			this.updateMouseLocation = function(x, y){_mouseController._loc.assign(x,y)}

			this.seek = function(targetVec) {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].seek(targetVec);
			}

			this.arrive = function(targetVec) {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].arrive(targetVec);
			}

			this.wander = function() {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].wander();
			}

			this.stayThere = function() {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].stayThere();
			}

			this.stayThereAndFleeFrom = function(location) {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].stayThereAndFleeFrom(location, _bots);
			}

			this.separate = function() {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].separate(_bots);
			}

			this.cohesion = function() {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].cohesion(_bots);
			}

			this.seekAndSeparate = function(targetVec) {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].seekAndSeparate(targetVec, _bots);
			}

			this.flock = function() {
				for (var i= _bots.length-1; i >= 0; --i)
	 				_bots[i].flock(_bots);
			}

			this.flockAndFlee = function(fromMouse){
				for (var i= _bots.length-1; i >= 0; --i){
	 				_bots[i].flock(_bots);
 					_bots[i].flee(_badBots);

	 				if (fromMouse)
	 					_bots[i].flee(_mouseController.wrapper);
	 			}
			}
		//end region behavior methods

		this.add = function(newBot) {
			_bots.length++;
			_bots[_bots.length-1] = newBot;
		}
 	//end region Methods
 	//
 	//region Contructor Logic
 		for (var i= _bots.length-1; i >= 0; --i){
 			_bots[i] = new SolidBot({
 				idDOMParent : args.idDOMParent,
 				cssClass	: "bots",
 				rotate 		: args.rotationEnabled,
 				maxVelocity : args.maxVelocity,
 				borderType 	: args.borderType,
 				location 	: new Vector(
			 					Math.random()*$(args.idDOMParent).width(),
			 					Math.random()*$(args.idDOMParent).height()
							)				
 			});
 			_bots[i].display();
 		}
 		for (var i= _badBots.length-1; i >= 0; --i){
 			_badBots[i] = new SolidBot({
			 				idDOMParent	: args.idDOMParent,
			 				cssClass 	: "badBots",
			 				rotate 		: args.rotationEnabled,
			 				borderType 	: args.borderType,
							maxVelocity : 1.5,				
							location 	: new Vector(
						 					Math.random()*$(args.idDOMParent).width(),
						 					Math.random()*$(args.idDOMParent).height()
										)
			 			});
 			_badBots[i].display();
 		} 	//end region Contructor Logic
 	return this;
 }