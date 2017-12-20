;(function (win) {
    /**
     * 用来标记当前的弹出，是哪个弹出层
     * @type {number}
     */
    var index = 0;
    /**
     * 模板
     * @type {{tip: tip}}
     */
    var tpl = {
        tip: function (content, index) {
            /**
             * 没有按钮
             * 没有标题
             * 仅仅显示内容会自动关闭的提示框
             *
             */

            var strTip = "<div class='layerMobile-main'>"
                + "<div class='layerMobie-con'>"
                + content
                + "</div>"
                + "</div>";


            var layerMobile = document.createElement('div');

            layerMobile.classList.add('layerMobie', 'layerMobie-' + index, 'layerMobie-tip','layerMobie-show');
            layerMobile.innerHTML = strTip;

            document.body.appendChild(layerMobile);
        }
    };

    /**
     * 默认配置
     * time:倒计时默认为3秒
     * @type {{}}
     */
    var defaultOptions = {
        time: 3
    };
    var Layer = function (options) {
        // 合并配置
        if (Object.prototype.toString.call(options) === '[object Object]') {
            var cloneObject = function (obj) {
                var o = {};
                for (var key in obj) {
                    if (typeof key === 'object') {
                        o[key] = cloneObject(key);
                    } else {
                        o[key] = obj[key];
                    }
                }
                return o;
            };

            // 复制对象
            var cloneDefaultOptions = cloneObject(defaultOptions);

            for (var key in options) {
                cloneDefaultOptions[key] = options[key];
            }
        }

        this.config = cloneDefaultOptions;

        // 每次新添加一个弹出层，每次标记序号，并且这个序号是递增的
        this.index = index;
        index++;


        console.log('=配置信息！==========================');
        console.log(this.config);

    };


    /**
     * 关闭弹出层
     */
    Layer.prototype.close = function (index) {

    };

    /**
     * 对外的提示弹出层方法
     */
    Layer.prototype.tip = function () {

        tpl.tip(this.config.content, this.index);
    };


    window.Layer = Layer;

})(window);