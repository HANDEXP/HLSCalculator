buildA:
	sencha app build native && cd ./cordova && cordova run android && cd ../

buildI:
	sencha app build native  && cd ./cordova && cordova run ios && cd ../

buildIP4:
	sencha app build native  && cd ./cordova && cordova emulate ios --target="iPhone-4s" && cd ../

buildIP5:
	sencha app build native  && cd ./cordova && cordova emulate ios --target="iPhone-5s" && cd ../

buildIP6:
	sencha app build native  && cd ./cordova && cordova emulate ios --target="iPhone-6" && cd ../

buildIP6P:
	sencha app build native  && cd ./cordova && cordova emulate ios --target="iPhone-6-Plus" && cd ../
	
.PHONY: test
