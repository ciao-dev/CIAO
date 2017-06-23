var region,
    anonimity,
    enabled,
    reload,
    //change,
    options,
    out,
    apply,
    background
    ;

var loadHandler = function() {
  // assign elements to variables for future references
  enabled = document.querySelector('#ciao_enable');
  out=document.querySelector('#out');
  region=document.querySelector('#region');
  anonimity=document.querySelector('#anonimity');
  options=document.querySelector('#options');
  change = document.querySelector('#change_proxy');
  change_https = document.querySelector('#change_proxy_https');
  apply = document.querySelector('#apply');
  background = chrome.extension.getBackgroundPage();
  
  
  // add a listener to each input and set the value from the background

  enabled.addEventListener("change", updateEnabledHandler, false);
  enabled.checked = background.settings.enabled;
  region.addEventListener("change", updateRegionSelectionHandler, false);
  region.value = background.settings.region;
  anonimity.addEventListener("change", updateAnonimitySelectionHandler, false);
  anonimity.value = background.settings.anonimity;
  change.addEventListener("click", updateChangeHandler, false);
  change_https.addEventListener("click", updateChangeHandler, false);
  apply.addEventListener("click", updateApplyHandler, false);

  if (background.settings.enabled)
  {
	  options.style.display='';
  }
  else{
	  options.style.display='none';
  }
  
  
  background.settings.optionmenu=document.getElementById("region")
  background.settings.anonimitymenu=document.getElementById("anonimity")
  background.settings.messagedisplay=document.getElementById("display");
  

  updateChangeButton();
  
  updateCountryList();
  updateCurrentMessage(background.settings.messagetodisplay)
  
  background.settings.popup_page_loaded_once=1;

};

var updateChangeButton=function(){
	if(background.settings.region!=background.settings.current_region || background.settings.anonimity!=background.settings.current_anonimity){
		change = document.querySelector('#change_proxy');
		change_https = document.querySelector('#change_proxy_https');
		apply = document.querySelector('#apply');
		change.style.display='none'
		change_https.style.display='none'
		apply.style.display=''	
		}
		else{
			change = document.querySelector('#change_proxy');
			change_https = document.querySelector('#change_proxy_https');
			apply = document.querySelector('#apply');
			
			chrome.tabs.query({"active": true,"lastFocusedWindow": true}, function (tabs) {
        		if(tabs[0].url.match("https") && background.settings.messagetodisplay==2){
        			change.style.display='none'
        				change_https.style.display=''
        		}else{
        			change.style.display=''
        		    change_https.style.display='none'	
        		}
                })

			apply.style.display='none'
		}
};

var updateCountryList=function(){
	background.settings.optionmenu.innerHTML = "";

	for (i=1; i<background.settings.activeCountryList.length;i++){
	  c = document.createElement("option"); 
	  c.text=background.settings.activeCountryList[i].name + " (" +background.settings.activeCountryList[i].num_any+")";
	  c.value=background.settings.activeCountryList[i].code;
	  ii=0
	  j=i-1
	  while(ii<j && background.settings.optionmenu[ii].text<c.text){ii++}
	  background.settings.optionmenu.add(c,ii); 
	}
	c = document.createElement("option"); 
	c.text=background.settings.activeCountryList[0].name + " (" +background.settings.activeCountryList[0].num_any+")";
	  c.value=background.settings.activeCountryList[0].code;
	background.settings.optionmenu.value=background.settings.region;
	background.settings.optionmenu.add(c,0); 
	updateProxyOptions();
};

var loadsettings=function(){

	chrome.storage.sync.get(["enabled","anonimity","region"], function (obj) {
		background.settings.enabled=obj.enabled;
		console.log(background.settings.enabled)
		console.log(obj.enabled)
		background.settings.anonimity=obj.anonimity;
		background.settings.region=obj.region;
		console.log(obj)
	});
};

var updateProxyOptions=function(){
	background.settings.anonimitymenu.innerHTML = "";
	
	if(background.settings.region!=""){
		index=background.settings.activeCountryList.map(function(e) {return e.code}).indexOf(background.settings.region);
		var c = document.createElement("option"); 
		c.text="Any (Transparent, Anonymous, Elite)"+ " (" +background.settings.activeCountryList[index].num_any+")";
		c.value="any";
		 background.settings.anonimitymenu.add(c);
		 
		if (background.settings.activeCountryList[index].transparent=="True"){
			var c = document.createElement("option"); 
			c.text="Transparent"+ " (" +background.settings.activeCountryList[index].num_transparent+")";
			c.value="transparent";
			 background.settings.anonimitymenu.add(c);	
		}
		if (background.settings.activeCountryList[index].anonymous=="True"){
			var c = document.createElement("option"); 
			c.text="Anonymous"+ " (" +background.settings.activeCountryList[index].num_anonymous+")";
			c.value="anonymous";
			 background.settings.anonimitymenu.add(c);	
		}
		if (background.settings.activeCountryList[index].elite=="True"){
			var c = document.createElement("option"); 
			c.text="Elite"+ " (" +background.settings.activeCountryList[index].num_elite+")";;
			c.value="elite";
			 background.settings.anonimitymenu.add(c);	
		}
		
	}else{
		var c = document.createElement("option"); 
		c.text="Any (Transparent, Anonymous and Elite)"+ " (" +background.settings.activeCountryList[0].num_any+")";
		c.value="any";
		 background.settings.anonimitymenu.add(c);
		var c = document.createElement("option"); 
		c.text="Transparent"+ " (" +background.settings.activeCountryList[0].num_transparent+")";
		c.value="transparent";
		 background.settings.anonimitymenu.add(c);
		var c = document.createElement("option"); 
		c.text="Anonymous"+ " (" +background.settings.activeCountryList[0].num_anonymous+")";
		c.value="anonymous";
		 background.settings.anonimitymenu.add(c);
		var c = document.createElement("option"); 
		c.text="Elite";
		c.text="Elite"+ " (" +background.settings.activeCountryList[0].num_elite+")";;
		background.settings.anonimitymenu.add(c);
		
	}
	
	background.settings.anonimitymenu.value=background.settings.anonimity;

};

var updateIcons = function() {
  if(background.settings.enabled==false){
	  chrome.browserAction.setIcon({path:'off.png'});  
  }	
  else{
	  if(background.settings.init==2){
		  chrome.browserAction.setIcon({path:'busy.png'});  
	  }
	  else{
		  if(background.settings.init==1){
			  chrome.browserAction.setIcon({path: 'enabled.png'});
			  updateCurrentMessage(1);}
		  else{
			  chrome.browserAction.setIcon({path: 'disabled.png'});
			  updateCurrentMessage(0);
		  }
	  }
  }

  
};
var updateCurrentMessage = function(message)
{
	if(message==0){
		
	}

if(message==1){
	if (background.settings.init==1){
	background.settings.messagedisplay.innerHTML="ALL GOOD!<BR/>Default Proxy: "+background.getHttpProxy();
	background.settings.messagedisplay.style.color="#036409"
	}
	else{
		background.settings.messagedisplay.innerHTML="Loading and verifying proxies<BR/>Default Proxy: "+background.getHttpProxy();
		background.settings.messagedisplay.style.color="#ffa500"
	}
}
	
if(message==2){
	if (background.settings.init==1){
		background.settings.messagedisplay.innerHTML="ALL GOOD!<BR/> Default Proxy: "+background.getHttpProxy()+"<BR/>HTTPs Proxy: "+background.getHttpsProxy();
		background.settings.messagedisplay.style.color="#06B612"
	}
	else{
		background.settings.messagedisplay.innerHTML="Loading and verifying proxies<BR/> Default Proxy: "+background.getHttpProxy()+"<BR/>HTTPs Proxy: "+background.getHttpsProxy();
		background.settings.messagedisplay.style.color="#ffa500"
	}
	}
	
}

var updateRegionSelectionHandler = function(e)
{
	var settings = {
			'region': region.value,
			'anonimity': anonimity.value
		};
	background.settings.region=settings.region;
	background.settings.anonimity=settings.anonimity;

	updateChangeButton();
	
	updateProxyOptions();
	// persist settings
	chrome.storage.sync.set(settings);
};

var updateAnonimitySelectionHandler = function(e)
{
	var settings = {
			'region': region.value,
			'anonimity': anonimity.value
		};
	background.settings.region=settings.region;
	background.settings.anonimity=settings.anonimity;

	updateChangeButton();
	// persist settings
	chrome.storage.sync.set(settings);
};

var updateChangeHandler = function(e)
{
	background.change_proxy();

};

var updateReloadHandler = function(e)
{
background.stop();
background.init();
};

var updateApplyHandler = function(e)
{

background.stop();
change = document.querySelector('#change_proxy');
apply = document.querySelector('#apply');
change.style.display=''
apply.style.display='none'
background.init();
background.settings.current_region=background.settings.region;
background.settings.current_anonimity=background.settings.anonimity;

};

var updateEnabledHandler = function(e)
{
  var settings = {
    'enabled': enabled.checked
  };

  // set the background settings
  background.settings.enabled = settings.enabled;
  
  

  
 // background.init()
  
  //create and load first proxy list and 
  if (background.settings.enabled)
	  {
	//create enable id
	  background.settings.enabled_id=Math.floor(Math.random() * 999999999999999);
	  background.init()
	  options.style.display='';
	  }
  //remove
  else{
	  background.stop()
	  options.style.display='none';
	//remove enabled_id
	  background.settings.enabled_id=0;
  }


  // persist settings
  chrome.storage.sync.set(settings);
};

// init
document.addEventListener('DOMContentLoaded', loadHandler);
