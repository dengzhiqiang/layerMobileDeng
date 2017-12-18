;(function (win) {
    /**
     * 模板
     * @type {{tip: tip}}
     */
    var tpl = {
        tip: function (content) {
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

            layerMobile.classList.add('layerMobie', 'layerMobie-tip');
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
        console.log(this.config);

    };
    Layer.prototype.action = function () {
        // 自动关闭


    };


    window.layerMobile = {
        show: function (options) {
            return new Layer(options || {});
        },
        close: function () {
            // 每次点击出现的弹出框都添加一个索引
            // 当要关闭的时候，先关闭最后出现的那个:未做

        }
    };


})(window);