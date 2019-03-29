export default {
  isObj(p) {
    let type = typeof p
    return !!type && (type === 'object' || type === 'function')
  },

  deepClone(obj) {

  },

  isDefined(obj) {
    return obj !== undefined && obj !== null
  },

  /**
   * 校验18位身份证号格式
   * @param code 身份证号
   * @return {tip, isValid} tip 提示信息, isValid true 合法 false 非法
   */
  validateIdCode(code) {
    let city = {
      11: '北京',
      12: '天津',
      13: '河北',
      14: '山西',
      15: '内蒙古',
      21: '辽宁',
      22: '吉林',
      23: '黑龙江 ',
      31: '上海',
      32: '江苏',
      33: '浙江',
      34: '安徽',
      35: '福建',
      36: '江西',
      37: '山东',
      41: '河南',
      42: '湖北 ',
      43: '湖南',
      44: '广东',
      45: '广西',
      46: '海南',
      50: '重庆',
      51: '四川',
      52: '贵州',
      53: '云南',
      54: '西藏 ',
      61: '陕西',
      62: '甘肃',
      63: '青海',
      64: '宁夏',
      65: '新疆',
      71: '台湾',
      81: '香港',
      82: '澳门',
      91: '国外'
    }
    let tip = ''
    let isValid = true

    if (!code || !/^[1-9][0-9]{5}(19[0-9]{2}|200[0-9]|2010)(0[1-9]|1[0-2])(0[1-9]|[12][0-9]|3[01])[0-9]{3}[0-9xX]$/i.test(code)) {
      tip = '身份证号格式错误'
      isValid = false
      return {tip, isValid}
    }
    if (!city[code.substr(0, 2)]) {
      tip = '身份证号错误'
      isValid = false
      return {tip, isValid}
    }
    // 此处不考虑15位的旧代身份证号
    if (code.length !== 18) {
      tip = '身份证号位数不足18位'
      isValid = false
      return {tip, isValid}
    }
    code = code.split('')
    //∑(ai×Wi)(mod 11)
    //加权因子
    let factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    //校验位
    let parity = [1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2]
    let sum = 0
    let ai = 0
    let wi = 0
    for (let i = 0; i < 17; i++) {
      ai = code[i]
      wi = factor[i]
      sum += ai * wi
    }
    let result = parity[sum % 11]
    if (result === 'X') {
      if (String(result) !== String(code[17])) {
        tip = '身份证号校验位错误'
        isValid = false
      }
    } else {
      if (Number(result) !== Number(code[17])) {
        tip = '身份证号校验位错误'
        isValid = false
      }
    }
    return {tip, isValid}
  },
}
