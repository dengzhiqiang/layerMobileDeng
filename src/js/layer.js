/*!

 @Name：layer mobile v2.0 弹层组件移动版
 @Author：贤心
 @Site：http://layer.layui.com/mobie/
 @License：LGPL

 */

;!function (win) {

    "use strict";

    var doc = document, query = 'querySelectorAll', claname = 'getElementsByClassName',
        /**
         *
         * @param s 元素节点的类名，标签名
         * @returns [] 返回的dom元素节点数组集合，没有获取到返回空数组
         * @constructor
         */
        S = function (s) {
            // 获取元素
            return doc[query](s);
        };

    //默认配置
    var config = {
        type: 0
        , shade: true
        , shadeClose: true
        , fixed: true
        , anim: 'scale' //默认动画类型
    };

    var ready = {
        /**
         * 合并配置信息
         * @param obj
         */
        extend: function (obj) {
            // 创建新的对象作为配置对象
            var newobj = JSON.parse(JSON.stringify(config));
            for (var i in obj) {
                newobj[i] = obj[i];
            }
            return newobj;
        },
        timer: {},
        end: {}
    };

    //点触事件
    ready.touch = function (elem, fn) {
        elem.addEventListener('click', function (e) {
            fn.call(this, e);
        }, false);
    };

    // index：索引：表示是当前页面的第几个弹出,哪怕只有一个弹出，只要你点击了，然后在关闭，然后在点击打开出，每次index都会累加
    var index = 0,
        classs = ['layui-m-layer'],

        /**
         * layer 构造函数
         * @param options
         * @constructor
         */
        Layer = function (options) {
            var that = this;

            // 存放配置信息
            that.config = ready.extend(options);

            // 渲染视图
            that.view();
        };

    /**
     * 渲染视图
     */
    Layer.prototype.view = function () {
        var that = this,

            // 配置信息
            config = that.config,
            layerbox = doc.createElement('div');

        // classs[0] : layui-m-layer
        that.id = layerbox.id = classs[0] + index;


        // config.type ：默认0 （0表示信息框，1表示页面层，2表示加载层）
        layerbox.setAttribute('class', classs[0] + ' ' + classs[0] + (config.type || 0));
        layerbox.setAttribute('index', index);

        //标题区域
        var title = (function () {
            // 标题是否为一个对象
            var titype = typeof config.title === 'object';

            // 返回标题
            return config.title
                ? '<h3 style="' + (titype ? config.title[1] : '') + '">'
                + (titype ? config.title[0] : config.title)
                + '</h3>'
                : '';
        }());

        //按钮区域
        var button = (function () {
            typeof config.btn === 'string' && (config.btn = [config.btn]);

            // btns按钮
            var btns = (config.btn || []).length,
                btndom;

            // 如果没有button返回空字符串
            if (btns === 0 || !config.btn) {
                return '';
            }

            btndom = '<span yes type="1">' + config.btn[0] + '</span>'
            if (btns === 2) {
                // 两个button
                btndom = '<span no type="0">' + config.btn[1] + '</span>' + btndom;
            }
            return '<div class="layui-m-layerbtn">' + btndom + '</div>';
        }());

        /**
         * fixed - 是否固定层的位置 Boolean
         * 默认：true
         * 层会始终垂直水平居中，只有当fixed: false时top才有效。
         * 也就是说：不固定的时候，可以设置top距离
         */
        if (!config.fixed) {
            // config.style为字符串类型
            // style: 'border:none; background-color:#78BA32; color:#fff;',
            config.top = config.hasOwnProperty('top') ? config.top : 100;
            config.style = config.style || '';
            config.style += ' top:' + ( doc.body.scrollTop + config.top) + 'px';
        }

        /**
         * config.type ：默认0 （0表示信息框，1表示页面层，2表示加载层）
         */
        if (config.type === 2) {
            config.content = '<i></i><i class="layui-m-layerload"></i><i></i><p>' + (config.content || '') + '</p>';
        }

        /**
         * skin - 设定弹层显示风格
         *  footer（即底部对话框风格）、msg（普通提示） 两种风格。
         */
        /**
         * anim - 动画类型
         * 类型：String/Boolean
         * 可支持的支持动画配置：scale（默认）、up（从下往上弹出），如果不开启动画，设置false即可
         */
        if (config.skin) config.anim = 'up';


        /**
         * shade - 控制遮罩展现
         * 类型：String/Boolean
         * 默认：true，该参数可允许你是否显示遮罩，并且定义遮罩风格
         * shade: false 不显示遮罩
         * shade: 'background-color: rgba(0,0,0,.3)' //自定义遮罩的透明度
         */

        /**
         * fixed - 是否固定层的位置 Boolean
         * 默认：true
         * 层会始终垂直水平居中，只有当fixed: false时top才有效。
         * 也就是说：不固定的时候，可以设置top距离
         */

        if (config.skin === 'msg') config.shade = false;

        layerbox.innerHTML = (config.shade
            ? '<div ' + (typeof config.shade === 'string' ? 'style="' + config.shade + '"' : '') + ' class="layui-m-layershade"></div>' : '')

            + '<div class="layui-m-layermain" ' + (!config.fixed ? 'style="position:static;"' : '') + '>'
            + '<div class="layui-m-layersection">'
            + '<div class="layui-m-layerchild ' + (config.skin ? 'layui-m-layer-' + config.skin + ' ' : '') + (config.className ? config.className : '') + ' ' + (config.anim ? 'layui-m-anim-' + config.anim : '') + '" ' + ( config.style ? 'style="' + config.style + '"' : '' ) + '>'
            + title
            + '<div class="layui-m-layercont">' + config.content + '</div>'
            + button
            + '</div>'
            + '</div>'
            + '</div>';

        if (!config.type || config.type === 2) {
            var dialogs = doc[claname](classs[0] + config.type), dialen = dialogs.length;
            if (dialen >= 1) {
                layer.close(dialogs[0].getAttribute('index'))
            }
        }

        document.body.appendChild(layerbox);
        var elem = that.elem = S('#' + that.id)[0];
        config.success && config.success(elem);

        that.index = index++;
        that.action(config, elem);
    };


    Layer.prototype.action = function (config, elem) {
        var that = this;

        //自动关闭
        if (config.time) {
            ready.timer[that.index] = setTimeout(function () {
                layer.close(that.index);
            }, config.time * 1000);
        }

        //确认取消
        var btn = function () {
            var type = this.getAttribute('type');
            if (type == 0) {
                config.no && config.no();
                layer.close(that.index);
            } else {
                config.yes ? config.yes(that.index) : layer.close(that.index);
            }
        };
        if (config.btn) {
            var btns = elem[claname]('layui-m-layerbtn')[0].children, btnlen = btns.length;
            for (var ii = 0; ii < btnlen; ii++) {
                ready.touch(btns[ii], btn);
            }
        }

        //点遮罩关闭
        if (config.shade && config.shadeClose) {
            var shade = elem[claname]('layui-m-layershade')[0];
            ready.touch(shade, function () {
                layer.close(that.index, config.end);
            });
        }

        config.end && (ready.end[that.index] = config.end);
    };

    win.layer = {
        v: '2.0',
        index: index,

        //核心方法
        open: function (options) {
            var o = new Layer(options || {});
            return o.index;
        },

        close: function (index) {
            var ibox = S('#' + classs[0] + index)[0];
            if (!ibox) return;
            ibox.innerHTML = '';
            doc.body.removeChild(ibox);
            clearTimeout(ready.timer[index]);
            delete ready.timer[index];
            typeof ready.end[index] === 'function' && ready.end[index]();
            delete ready.end[index];
        },

        //关闭所有layer层
        closeAll: function () {
            var boxs = doc[claname](classs[0]);
            for (var i = 0, len = boxs.length; i < len; i++) {
                layer.close((boxs[0].getAttribute('index') | 0));
            }
        }
    };


    'function' == typeof define ? define(function () {
        return layer;
    }) : function () {

        var js = document.scripts, script = js[js.length - 1], jsPath = script.src;
        var path = jsPath.substring(0, jsPath.lastIndexOf("/") + 1);

        //如果合并方式，则需要单独引入layer.css
        if (script.getAttribute('merge')) return;

        document.head.appendChild(function () {
            var link = doc.createElement('link');
            link.href = path + 'need/layer.css?2.0';
            link.type = 'text/css';
            link.rel = 'styleSheet'
            link.id = 'layermcss';
            return link;
        }());

    }();

}(window);