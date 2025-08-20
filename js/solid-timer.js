// ----> ******** TIMER CLASS BEGIN ******** 
	//Class constructor
	function Timer(_elapsedEventHandler, _interval){
		//region Private Attributes		
			var timer;
			//Wrapping the Primitive Types in Wrapper Objects
			//since they're gonna be passed by reference later on
			var autoReset = new Wrapper(true);
			var elapsedEventHandler = new Wrapper(_elapsedEventHandler);
			var interval = new Wrapper(_interval || 500); //default value's set to 500

			var isRunning = false;
			var self = this;
		//end region Private Attributes
		//
		//region Methods
			//region getters and setters
				//autoReset
				this.setAutoReset = function(value){assign(autoReset, value);return this;}						
				
				//interval
				this.getInterval = function(){return interval.get();}
				this.setInterval = function(value){assign(interval, value);return this;}
				
				//elapsedEventHandler
				this.setElapsedEventHandler = function(newEventHandler){assign(elapsedEventHandler, newEventHandler);return this;}				
				this.getElapsedEventHandler = function(){return elapsedEventHandler.get();}
			//end region getters and setters
			//
			//region Functional Methods
				this.start = function(){
					if (!isRunning){
						if (autoReset)
							timer = setInterval(elapsedEventHandler.get(), interval.get());
						else
							timer = setTimeout(elapsedEventHandler.get(), interval.get());
							
						isRunning = true;
					}
					return this;
				}

				this.stop = function(){
					if (isRunning){
						if (autoReset)
							clearInterval(timer);
						else
							clearTimeout(timer);
						
						isRunning = false;
					}
					return this;
				}
			//end region Functional Methods
		//end region methods 
		//
		//region Auxiliary stuff
			//--> Wrapper Class
			function Wrapper(_value){
				this.value = _value;
				
				this.set= function(_value){this.value= _value;}
				this.get= function(){return this.value;}
			}
			//<-- Wrapper Class
			//--> assign function
			function assign(variable, value){
				if (variable.get() != value){
					if (isRunning){
						self.stop();
						variable.set(value);
						self.start();
					}else
						variable.set(value);
				}
			}
			//<-- assign function
		//end region Auxiliary stuff      
	}
//<---- ******** TIMER CLASS END ********