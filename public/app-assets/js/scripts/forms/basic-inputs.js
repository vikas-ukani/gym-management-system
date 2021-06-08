/*=========================================================================================
        File Name: basic-inputs.js
        Description: Input field js for label type
        ----------------------------------------------------------------------------------------
        Item Name: Vuexy  - Vuejs, HTML & Laravel Admin Dashboard Template
        Author: Pixinvent
        Author URL: hhttp://www.themeforest.net/user/pixinvent
==========================================================================================*/

(function(window, document, $) {
    'use strict';
    var $html = $('html');

        //label Positions
    $(".labelUp").labelinplace();
    $(".labelDown").labelinplace({
        labelPosition: "down"
    });

    // Label Icons
    $(".labelIcon").labelinplace({
        labelArrowRight: ' <i className="icon-hand-o-right"></i> ',
        labelArrowDown: ' <i className="icon-hand-o-down"></i> ',
        labelArrowUp: ' <i className="icon-hand-o-up"></i> '
    });

    // Icons After Label
    $(".labelIconAfter").labelinplace({
        labelArrowRight: ' <i className="icon-caret-right"></i> ',
        labelArrowDown: ' <i className="icon-caret-down"></i> ',
        labelArrowUp: ' <i className="icon-caret-up"></i> ',
        labelIconPosition: "after",
        inputAttr: "id"
    });

})(window, document, jQuery);
