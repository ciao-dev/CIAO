function Proxy(id,name,ip,port,download_time,timeouts,errors,download_items,download_probe,requests,urls){
this.id=id;
this.name=name; 
this.ip=ip; 
this.port=port; 
this.download_time=download_time;
this.timeouts=timeouts;
this.errors=errors;
this.download_items=download_items;
this.download_probe=download_probe;
this.requests=requests;
this.urls=urls;
}

var ProxyList = {
  proxyList: [],  
  proxyFilterList: [], 
  fullProxyListHttp: [], 
  fullProxyListHttps: [], 
  proxyListHttp: [], 
  proxyListHttps: [], 
  flag: 0, 
  default_proxy: null,
};


updatePac = function (a) {
	var config = {
	        mode: "pac_script",
	        pacScript: {
	          data: "function FindProxyForURL(url, host) {\n" +
	                "  return 'DIRECT';\n" +
	                "}"
	        }
	      };
	
		pac = "";

	  list=ProxyList.proxyFilterList.concat(ProxyList.proxyListHttps,ProxyList.proxyListHttp); 
	  if ((list && list.length>0) || ProxyList.default_proxy!=null) { 
	      pac+="function FindProxyForURL(url, host) {";
	      for (var j = 0; j < list.length; j++) {
	    	  if(list[j].urls.length > 0){
	    		  for (var i=0; i<list[j].urls.length; i++) {
	    			  if(i==0){
	    				  pac+='if ( shExpMatch(url, "'+list[j].urls[i]+'")' ; 
	    			  }else{
	    				  pac+='|| shExpMatch(url, "'+list[j].urls[i]+'")';
	    				  }
	    			  }

	    		  pac+='){ return "PROXY ' + list[j].ip + ':' + list[j].port + '"}'
	    	  }
	    	  
	 		 }
	      pac+='return "PROXY ' + ProxyList.default_proxy.ip + ':' + ProxyList.default_proxy.port + '"}';
	  
	  }else{
		  pac+="function FindProxyForURL(url, host) { return DIRECT }"
	  }
	  
	  config.pacScript.data = pac;
  
	  console.log(pac)
	  chrome.proxy.settings.set({value: config, scope: 'regular'}, function() {});
};

defaultSystemProxySetting= function (a) {
	updatePac();
	chrome.proxy.settings.clear({scope: 'regular'}, function() {});
}


