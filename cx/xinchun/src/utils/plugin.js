import api from './api.js'
import {msg} from './msg.js'


const SetCookieValue = (_Name, _Value, _Expires, _Type) => {
    var _LargeExpDate = new Date();
    if (typeof(_Expires) == 'number' && isNaN(_Expires) == false) {
        if (_Expires != 0) {
            if (typeof(_Type) == 'number' && isNaN(_Type) == false && _Type == 1) {
                _LargeExpDate.setTime(_LargeExpDate.getTime() + (_Expires * 1000));
            } else {
                _LargeExpDate.setTime(_LargeExpDate.getTime() + (_Expires * 24 * 3600 * 1000));
            }
        } else {
            _LargeExpDate = null;
        }
    } else {
        _LargeExpDate.setTime(_LargeExpDate.getTime() + (36500 * 24 * 3600 * 1000));
    }
    document.cookie = _Name + "=" + escape(_Value) + (_LargeExpDate != null ? ";expires=" + _LargeExpDate.toGMTString() : "") + ";path=/;domain=.caixin.com";
}


export const clearCookie = () => {
    SetCookieValue("SA_USER_DEVICE_TYPE", "", -1);
    SetCookieValue("SA_USER_UNIT", "", -1);
    SetCookieValue("SA_USER_USER_NAME", "", -1);
    SetCookieValue("USER_LOGIN_CODE", "", -1);
    SetCookieValue("SA_USER_NICK_NAME", "", -1);
    SetCookieValue("SA_USER_UID", "", -1);
    SetCookieValue("SA_USER_auth", "", -1);
    SetCookieValue("UID", "", -1);
}
export default {
    install(Vue, option) {
        Vue.prototype.$api = api

        Vue.prototype.$getCookie = function(name) {
            let arr,
                reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
            if ((arr = document.cookie.match(reg))) {
                return decodeURIComponent(arr[2])
            } else {
                return undefined
            }
        }

        Vue.prototype.$clearCookie=clearCookie;

        Vue.prototype.$msg=msg
    }
}
