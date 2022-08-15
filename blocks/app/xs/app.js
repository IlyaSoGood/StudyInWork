/**
 * Main app component
 * Utilities and usefull functions
 */
const App = (function() {

    const SMALL_DEVICE = 990; // Less than bootstrap LG breakpoint

    /**
     * 
     * Public methods goes here
     * 
     * */ 
    return {

        // Detects if device is touch
        is_touch   : /(iphone|ipod|ipad|android|iemobile|blackberry|bada)/.test(window.navigator.userAgent.toLowerCase()),
        
        // Detects browser is IE11
        is_ie11    : !!window.MSInputMethodContext && !!document.documentMode,
        
        // Detects if device is MAC
        is_mac     : navigator.platform.toLowerCase().indexOf('mac') >= 0,
        
        // Detects if device is Andoroid
        is_android : /(android)/.test(window.navigator.userAgent.toLowerCase()),
        
        // Detects if device is small - Less than bootstrap LG breakpoint
        is_small_device : $(window).width() < SMALL_DEVICE,
        
        /**
         * Detects if device is mobile
         * @returns {Boolean}
         */ 
        is_mobile : function () {
            console.log('sdf');
            return this.is_small_device && (this.is_touch || this.is_android);
        }
    };

})();

export default App;