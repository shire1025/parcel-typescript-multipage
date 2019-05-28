/**
 * 按需引入lodash
 * 已配置webpack&babelrc
 * lodash 4.16.1 文档： http://www.css88.com/doc/lodash/
 * @type Object
 */
// import _ from 'lodash';
import clone from 'lodash/clone';
import cloneDeep from 'lodash/cloneDeep';
import uniq from 'lodash/uniq';
import uniqBy from 'lodash/uniqBy';
import debounce from 'lodash/debounce'; // 防抖
import throttle from 'lodash/throttle'; //节流
import each from 'lodash/each';
import last from 'lodash/last';
import size from 'lodash/size';
import pick from 'lodash/pick';
import add from 'lodash/add';
import subtract from 'lodash/subtract';
import toNumber from 'lodash/toNumber';
import toString from 'lodash/toString';
import trim from 'lodash/trim';
import isEmpty from 'lodash/isEmpty';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import isArray from 'lodash/isArray';
import compact from 'lodash/compact';
import includes from 'lodash/includes';
import sortBy from 'lodash/sortBy';

export default {
    clone,
    cloneDeep,
    uniq, //去重
    uniqBy, //去重 根据key
    debounce,
    throttle,
    each,
    last, //获取array中的最后一个元素。
    // sortBy, //创建一个元素数组。 以 iteratee 处理的结果升序排序。 这个方法执行稳定排序，也就是说相同元素会保持原始排序。 iteratees 调用1个参数： (value)。
    size,
    pick,
    add,
    subtract,
    toNumber,
    toString,
    trim,
    isEmpty,
    isString,
    isObject,
    isArray,
    compact, // 创建一个新数组，包含原数组中所有的非假值元素。例如false, null, 0, "", undefined, 和 NaN 都是被认为是“假值”。
    includes,
    sortBy
};
