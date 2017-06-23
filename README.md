# CIAO: Automated free proxies discovery and usage

Finding a working free proxy is like looking for a needle in a haystack. Despite several websites offer lists of free proxies, most of the proxies provided are either unreachable or can only transmit at few kbps. In some cases, they also perform malicious activities like malware injection, traffic interception, etc. Even when a working proxy is found, it might only last for a few minutes forcing the user to frequently re-iterate the quest for a "good" free proxy. 

CIAO is a Chrome plugin that automates the discovery of free proxies. Given user input like desired country or anonymity level, CIAO continuously provides the best set of free proxies available. CIAO also dynamically splits user traffic among multiple proxies, so to rapidly find the best performing proxies and react to failures. 

CIAO identifies trusted and working free proxies using its own community. CIAO is instrumented to collect anonymous data about proxy performance and behavior (e.g., amount of data downloaded, page download duration). This data is reported to our servers as an input for the proxy selection algorithm. To bootstrap this process, our servers discover free proxies by crawling proxy aggregator websites. Each proxy is then tested daily to verify reachability, performance, and behavior. 

Note that data collection is disable when CIAO is not enabled. We also  do not collect past browsing history, any personal identifiable information (PII) or long term constant identifiers like cookies, IP addresses, etc. For more information please visit our webpage: http://isthatfreeproxysafe.com


