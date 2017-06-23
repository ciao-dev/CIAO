var Statistics = {
		TabStats_list: [],
		statsList: [],
		num_stats: 0
}

function TabStats(session_id,enabled_id,start,time_last_data_downloaded, end_time,protocol,num_objects_requested,num_objects_requested_https,num_objects_requested_at_onload,num_objects_requested_https_at_onload,num_objects, num_objects_https,num_objects_at_onload,num_objects_https_at_onload,data_downloaded_at_onload,data_downloaded_https_at_onload,data_downloaded,data_downloaded_https,onload,onload_event,error_time,error,main_proxy,main_https_proxy){
this.session_id=session_id
this.start=start
this.time_last_data_downloaded=0 
this.end_time=end_time
this.protocol=protocol
this.num_objects_requested=num_objects_requested
this.num_objects_requested_https=num_objects_requested_https
this.num_objects_requested_at_onload=num_objects_requested_at_onload
this.num_objects_requested_https_at_onload=num_objects_requested_https_at_onload
this.num_objects=num_objects
this.num_objects_https=num_objects_https
this.num_objects_at_onload=num_objects_at_onload
this.num_objects_https_at_onload=num_objects_https_at_onload
this.data_downloaded_at_onload=data_downloaded_at_onload
this.data_downloaded_https_at_onload=data_downloaded_https_at_onload
this.data_downloaded=data_downloaded
this.data_downloaded_https=data_downloaded_https
this.onload=onload
this.onload_event=onload_event,
this.error_time=error_time
this.error=error
this.main_proxy=main_proxy
this.main_https_proxy=main_https_proxy
this.enabled_id=enabled_id
}


function Requestentry(proxy, proxy_id,timeout,request_time,protocol,requestId,num_timeouts){
	this.prox=proxy
	this.proxy_id=proxy_id
	this.timeout=timeout
	this.request_time=request_time
	this.protocol=protocol
	this.requestId=requestId
	this.num_timeouts=num_timeouts

}