<style scoped lang="less">
  #Hr {

  }

  .customer {
    border: 1px dashed #0077db;
    border-radius: 5px;
    padding: 10px;
    margin: 10px;
    .customer__default {
      font-size: 12px;
      color: #6cf;
      border-radius: 3px;
      border: 1px solid #6cf;
      padding: 1px 2px;
    }
  }
  .customer--chosen {
    border: 2px solid #0077db;
  }

  .year-month {
    border: 1px solid #0077db;
    padding: 2px;
    border-radius: 2px;
  }

  .with-found--selected, .with-instead-pay--selected, .new-acct--selected, .new-certificate--selected {
    padding: 1px 5px;
    border: 1px solid #0077db;
    background: #0077db;
    color: #fff;
    border-radius: 2px;
  }
  .with-found, .with-instead-pay, .new-acct, .new-certificate {
    padding: 1px 5px;
    border: 1px solid #0077db;
    border-radius: 2px;
  }

  .title {
    margin: 10px;
  }
  .readonly {
  }

  .red {
    color: red;
  }
  .blue {
    color: #0077db;
  }
  .orange {
    color: orange;
  }
  .green {
    color: greenyellow;
  }

  .bill-row-item {
    display: flex;
    justify-content: space-between;
    padding: 3px 0;
  }
  .bill-row-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #eee;
    padding: 5px 0;
  }
</style>

<template>
  <div id="Hr">
    <div v-if="step === 1">
      <div v-if="customerList.length > 0">
        <div class="title">选择参保人</div>
        <div class="customer"
             style="display: flex;"
             v-for="cus in customerList"
             v-bind:class="{'customer--chosen': chosenCusId === cus.customerId}"
             @click="chosenCusId = cus.customerId"
             :key="cus.customerId">
          <div style="flex: 9;font-size: 14px">
            <div><span style="width: 60px;display: inline-block">姓名：</span>{{cus.name}}</div>
            <div><span style="width: 60px;display: inline-block">身份证：</span>{{cus.idCard}}</div>
            <div><span style="width: 60px;display: inline-block">手机：</span>{{cus.insuredPhone}}</div>
            <div><span style="width: 60px;display: inline-block">参保地：</span>{{codeFormatter(cus.code)}}</div>
            <!--<span style="color: #999;font-size: 12px">信息完成度: xx%, 请及时完善资料, 以免耽误您的社保缴纳进度</span>-->
          </div>

          <div style="flex: 1;">
            <div style="margin-top: 50%;font-size: 20px;border: 1px solid #eee;border-radius: 10px;text-align: center"
                 @click="editCustomer(cus.customerId)">
              <van-icon name="edit"></van-icon>
            </div>
          </div>
        </div>
        <div style="height: 50px;"></div>
        <!--<div style="margin: 10px;">当前默认参保人: {{customerList.find(c => c.customerId === chosenCusId).name}}</div>-->
        <van-button style="position: fixed;bottom: 0;" size="large" type="primary" @click="gotoStep2">下一步</van-button>
      </div>
      <div v-else>
        <div class="title">添加参保人</div>
        <div style="border: 1px solid #eee;margin: 10px 0;">
          <field-block label="参保信息">
            <van-field label="姓名：" v-model="customerForm.name"></van-field>
            <van-field label="手机(+86)："
                       error-message=""
                       v-model="customerForm.insuredPhone"></van-field>
            <van-field label="身份证："
                       error-message=""
                       v-model="customerForm.idCard"></van-field>
            <van-cell @click="showRegionPicker = true" center>
              <template>
                <span class="custom-text">参保地区：</span>
                <span style="margin-left: 30px">{{codeFormatter(customer.code)}}</span>
              </template>
            </van-cell>
          </field-block>
        </div>
        <van-button size="large" type="primary" @click="saveForm">保存</van-button>
      </div>
      <van-popup v-model="showRegionPicker" position="bottom">
        <van-picker :columns="columns"
                    show-toolbar
                    value-key="label"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="confirmRegion"
                    @change="onRegionChange"
                    @cancel="showRegionPicker = false"></van-picker>
      </van-popup>
    </div>

    <div v-if="step === 2">
      <field-block label="基本信息">
        <van-cell-group>
          <van-cell class="readonly" title="参保人">{{customer.name}}</van-cell>
          <van-cell class="readonly" title="地区">{{codeFormatter(customer.code)}}</van-cell>
        </van-cell-group>
      </field-block>

      <field-block label="社保信息">
        <van-cell title="户籍类型"
                  @click="showNatureTypePicker = true"
                  is-link>{{natureTypeFormatter(form.natureType)}}</van-cell>
        <van-field label="缴纳基数"
                   border
                   @change="calBillInfo"
                   input-align="right"
                   type="number"
                   v-model="form.customInsuranceBase"></van-field>
        <van-cell title="需要社保公积金开户">
          <template>
            <span class="new-certificate"
                  @click="switchTag('needNewCertificate', true)"
                  v-bind:class="{'new-certificate--selected': form.needNewCertificate}">需要</span>
            <span class="new-certificate"
                  @click="switchTag('needNewCertificate', false)"
                  :class="{'new-certificate--selected': !form.needNewCertificate}">不需要</span>
          </template>
        </van-cell>
        <van-cell v-if="curConfig.needCertificate" title="需要代办创业证">
          <template>
            <span class="new-acct"
                  @click="switchTag('needNewAccount', true)"
                  v-bind:class="{'new-acct--selected': form.needNewAccount}">需要</span>
            <span class="new-acct"
                  @click="switchTag('needNewAccount', false)"
                  :class="{'new-acct--selected': !form.needNewAccount}">不需要</span>
          </template>
        </van-cell>
        <van-field label="社保帐号"
                   v-if="curConfig.needInsuranceNum && !form.needNewAccount"
                   border
                   input-align="right"
                   type="string"
                   v-model="customer.insuranceNum"></van-field>
        <van-cell title="缴纳类型"
                  v-if="customer.code && customer.code.startsWith('GDSZ')"
                  is-link
                  border
                  input-align="right"
                  @click="showStallPicker = true">
          {{stall.label}}
        </van-cell>

        <van-cell center>
          <template>
            <div style="display: flex;justify-content: space-between">
              <span class="custom-text">缴纳月份</span>
              <span style="border: 1px solid #eee;">
                <span @click="showStartYmPicker = true" class="year-month"> {{form.startYm}}</span>
                <span>-</span>
                <span @click="showEndYmPicker = true" class="year-month"> {{form.endYm}}</span>
              </span>
            </div>
            <div v-if="paybackMonthCount > 0" style="font-size: 10px;">
              补缴{{paybackMonthCount}}个月社保，每月服务费<span style="color: red;">100</span>元(含补缴增收服务费)
            </div>
            <div v-else style="font-size: 10px">
              当前可缴纳{{curPayMonth}}后社保。<span v-if="curConfig.maxPaybackMonth > 0">补缴前{{curConfig.maxPaybackMonth}}个月社保</span>
            </div>
          </template>
        </van-cell>
      </field-block>

      <field-block label="公积金信息">
        <van-cell title="缴纳公积金">
          <template>
            <span class="with-found"
                  @click="switchTag('withFound', true)"
                  v-bind:class="{'with-found--selected': form.withFound}">缴纳</span>
            <span class="with-found"
                  @click="switchTag('withFound', false)"
                  :class="{'with-found--selected': !form.withFound}">不缴</span>
          </template>
        </van-cell>
        <div v-if="form.withFound">
          <van-field label="缴纳基数"
                     border
                     @change="calBillInfo"
                     input-align="right"
                     type="number"
                     v-model="form.customFoundBase"></van-field>
          <van-field label="公积金帐号"
                     v-if="curConfig.needFoundNum && !form.needNewAccount"
                     border
                     input-align="right"
                     type="string"
                     v-model="customer.foundNum"></van-field>
          <van-cell title="公基金类型"
                    v-if="customer.code && customer.code.startsWith('JSSZ')"
                    @click="showFoundTypePicker = true"
                    is-link>
            {{'公积金类型'}}
          </van-cell>
        </div>
      </field-block>

      <field-block label="代发工资" v-if="curConfig.needInsteadPay">
        <van-cell title="代发工资">
          <template>
            <span class="with-instead-pay"
                  :class="{'with-instead-pay--selected': form.withInsteadPay}"
                  @click="switchTag('withInsteadPay', true)">代发</span>
            <span class="with-instead-pay"
                  :class="{'with-instead-pay--selected': !form.withInsteadPay}"
                  @click="switchTag('withInsteadPay', false)">不发</span>
          </template>
        </van-cell>
        <van-field label="工资金额"
                   v-if="form.withInsteadPay"
                   input-align="right"
                   type="number"
                   @change="calBillInfo"
                   v-model="form.insteadPay"></van-field>
      </field-block>

      <field-block label="账单（不含服务费及开户费用）" v-if="showBillInfo">
        <van-collapse v-model="activeNames">
          <van-collapse-item title="账单详情" name="billInfo">
            <field-block label="社保">
              <van-cell title="养老">￥{{ (billInfo.cPensionTotal + billInfo.pPensionTotal).toFixed(2) }}</van-cell>
              <van-cell title="医疗">￥{{ (billInfo.cMedicalTotal + billInfo.pMedicalTotal).toFixed(2) }}</van-cell>
              <van-cell title="工伤">￥{{ (billInfo.cInjuryTotal + billInfo.pInjuryTotal).toFixed(2)}}</van-cell>
              <van-cell title="生育">￥{{ (billInfo.cMaternityTotal + billInfo.pMaternityTotal).toFixed(2)}}</van-cell>
              <van-cell title="失业">￥{{ (billInfo.cUnemployTotal + billInfo.pUnemployTotal).toFixed(2)}}</van-cell>
              <van-cell title="大病补助">￥{{ (billInfo.pIllnessTotal).toFixed(2)}}</van-cell>
              <van-cell title="残保金">￥{{ (billInfo.cDisablityTotal + billInfo.pDisablityTotal).toFixed(2)}}</van-cell>
            </field-block>
            <field-block label="公积金" v-if="form.withFound">
              <van-cell title="金额">￥{{billInfo.foundTotal.toFixed(2)}}</van-cell>
            </field-block>
            <field-block label="代发工资" v-if="form.withInsteadPay">
              <van-cell title="金额">￥{{billInfo.insteadPayTotal.toFixed(2)}}</van-cell>
            </field-block>
          </van-collapse-item>
        </van-collapse>
        <van-cell title="总计">
          <span class="red">￥{{billInfo.totalPrice.toFixed(2)}}</span>
        </van-cell>
      </field-block>

      <div style="height: 50px;"></div>

      <van-button style="position: fixed;bottom: 0;" type="primary" @click="gotoCheckout" size="large">结算</van-button>

      <!-- picker-->
      <van-popup v-model="showFoundTypePicker" position="bottom">
        <van-picker :columns="[8, 9, 10, 11, 12]"
                    show-toolbar
                    v-model="form.foundRate"
                    value-key="label"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="confirmFoundRate"
                    @cancel="showFoundTypePicker = false"></van-picker>
      </van-popup>
      <van-popup v-model="showStallPicker" position="bottom">
        <van-picker :columns="stallOptions"
                    show-toolbar
                    v-model="stall"
                    value-key="label"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="confirmStall"
                    @cancel="showStallPicker = false"></van-picker>
      </van-popup>
      <van-popup v-model="showNatureTypePicker" position="bottom">
        <van-picker :columns="natureTypeOptions"
                    show-toolbar
                    value-key="label"
                    confirm-button-text="确定"
                    cancel-button-text="取消"
                    @confirm="confirmNatureType"
                    @cancel="showNatureTypePicker = false"></van-picker>
      </van-popup>
      <van-popup v-model="showStartYmPicker" position="bottom">
        <van-datetime-picker
                v-model="startDate"
                show-toolbar
                :min-date="startMinDate"
                :max-date="startMaxDate"
                confirm-button-text="确定"
                cancel-button-text="取消"
                :formatter="formatter"
                type="year-month"
                @confirm="confirmStartYm"
                @cancel="showStartYmPicker = false"
        ></van-datetime-picker>
      </van-popup>
      <van-popup v-model="showEndYmPicker" position="bottom">
        <van-datetime-picker
                v-model="endDate"
                :min-date="endMinDate"
                :max-date="endMaxDate"
                show-toolbar
                confirm-button-text="确定"
                cancel-button-text="取消"
                :formatter="formatter"
                type="year-month"
                @confirm="confirmEndYm"
                @cancel="showEndYmPicker = false"
        ></van-datetime-picker>
      </van-popup>
    </div>

    <div v-if="step === 3">
      <div class="title">
        结算页
      </div>
      <field-block :label="`账单详细(按${curConfig.personalRate.batchNum}基数标准计算)`" style="font-size: 14px" v-if="showBillInfo">
        <div style="padding: 5px 20px;text-align: left;background: #fff;font-size: 13px">
          <div class="bill-row-header">
              <div >缴纳项</div>
              <div>金额</div>
            </div>
            <div class="bill-row-item">
              <div >养老</div>
              <div>{{ (billInfo.cPensionTotal + billInfo.pPensionTotal).toFixed(2) }}</div>
            </div>
            <div class="bill-row-item">
              <div >医疗</div>
              <div>{{ (billInfo.cMedicalTotal + billInfo.pMedicalTotal).toFixed(2) }}</div>
            </div>
            <div class="bill-row-item">
              <div >工伤</div>
              <div>{{ (billInfo.cInjuryTotal + billInfo.pInjuryTotal).toFixed(2) }}</div>
            </div>
            <div class="bill-row-item">
              <div >生育</div>
              <div>{{ (billInfo.cMaternityTotal + billInfo.pMaternityTotal).toFixed(2) }}</div>
            </div>
            <div class="bill-row-item">
              <div >失业</div>
              <div>{{ (billInfo.cUnemployTotal + billInfo.pUnemployTotal).toFixed(2) }}</div>
            </div>
            <div class="bill-row-item">
              <div >大病补助</div>
              <div>{{ (billInfo.pIllnessTotal).toFixed(2) }}</div>
            </div>
            <div class="bill-row-item">
              <div >残保金</div>
              <div>{{ (billInfo.cDisablityTotal + billInfo.pDisablityTotal).toFixed(2) }}</div>
            </div>
          <div v-if="form.withFound" class="bill-row-item">
              <div >公积金</div>
              <div>{{(billInfo.foundTotal * 2).toFixed(2)}}</div>
            </div>
            <div v-if="form.withInsteadPay" class="bill-row-item">
              <div >代发工资</div>
              <div> {{ billInfo.insteadPayTotal.toFixed(2) }}</div>
            </div>
            <div class="bill-row-item">
              <div >总计</div>
              <div style="color: red">{{ (billInfo.cTotal + billInfo.pTotal).toFixed(2) }}</div>
            </div>
          </div>
        <!-- TODO 使用order信息填充账单？？ -->
        <van-cell border>
          <div style="display: flex;justify-content: space-between">
            <span>官费 ({{billInfo.totalPrice.toFixed(2)}} * {{form.amount}})</span>
            <span>&yen; {{(billInfo.totalPrice * form.amount).toFixed(2)}}</span>
          </div>
        </van-cell>

        <van-cell border>
          <div style="display: flex;justify-content: space-between">
            <span>服务费 (66 * 2)</span>
            <span>&yen; 132</span>
          </div>
        </van-cell>
        <!--</field-block>-->
        <!--<field-block label="开户费">-->
        <van-cell border v-if="form.needNewAccount">
          <div style="display: flex;justify-content: space-between">
            <span>开户费</span>
            <span>&yen; 100</span>
          </div>
        </van-cell>
        <van-cell border v-if="form.needNewCertificate">
          <div style="display: flex;justify-content: space-between">
            <span>代办就业创业证</span>
            <span>&yen; 100</span>
          </div>
        </van-cell>
        <!--</field-block>-->
      </field-block>

      <!-- TODO 需要封装组件-->
      <field-block label="支付方式">
        <van-radio-group v-model="form.payType">
          <van-cell-group>
            <van-cell clickable @click="form.payType = 1">
              <template>
                <div style="display: flex;justify-content: space-between">
                  <span class="custom-text">
                    <van-icon style="top: 4px;" size="18px" name="wechat"></van-icon>
                    微信
                  </span>
                  <span>
                    <van-radio :name="1" ></van-radio>
                  </span>
                </div>
              </template>
            </van-cell>
            <van-cell clickable @click="form.payType = 3">
              <template>
                <div style="display: flex;justify-content: space-between">
                  <span class="custom-text">
                    <van-icon size="18px" style="top: 4px;" name="alipay"></van-icon>
                    支付宝
                  </span>
                  <span>
                    <van-radio :name="3" ></van-radio>
                  </span>
                </div>
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </field-block>

      <field-block label="提示">
        <van-panel title="提示" desc="请及时完善参保人信息"></van-panel>
        <!-- TODO 需要完善提示信息-->
      </field-block>
      <field-block label="备注">
        <van-field autosize type="textarea" label="备注" v-model="form.comment"></van-field>
      </field-block>

      <div style="height: 50px;"></div>
      <van-button style="position: fixed;bottom: 0;" size="large" type="primary" @click="pay">支付</van-button>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  import dayjs from 'dayjs'
  import cookie from 'vue-cookie'

  import {Toast, Dialog} from 'vant'

  import FieldBlock from '../components/mobile/FieldBlock'

  import insuranceUtils from '../utils/insurance'

  const cities = [
    {label: '北京', values: [{label: '市区', value: 'BJBJCZ'}]},
    {label: '上海', values: [{label: '市区', value: 'SHSH'}]},
    {label: '深圳', values: [{label: '市区', value: 'GDSZB1D'}]},
    {label: '南京', values: [{label: '市区', value: 'JSNJ'}]},
    {label: '镇江', values: [{label: '市区', value: 'JSZJ'}]},
    {label: '成都', values: [{label: '市区', value: 'SSCD'}]},
    {label: '合肥', values: [{label: '市区', value: 'AHHF'}]},
    {label: '苏州', values: [
        {label: '市区', value: 'JSSZSQ'},
        {label: '园区甲类', value: 'JSSZYQJ'},
        {label: '园区乙类', value: 'JSSZYQJ'}
    ]},
  ]

  const codes = {
    SHSH: '上海-市区',
    JSNJ: '南京-市区',
    BJBJCZ: '北京市区-城镇户口',
    BJBJNC: '北京市区-农村户口',
    AHHF: '合肥-市区',
    SCCD: '成都-市区',
    JSSZYQJ: '苏州-园区甲类',
    JSSZYQY: '苏州-园区乙类',
    JSSZSQ: '苏州-市区',
    GDSZB1D: '深圳-深户一档',
    GDSZW1D: '深圳-非深户一档',
    GDSZW2D: '深圳-非深户二档',
    GDSZW3D: '深圳-非深户三档',
    JSZJ: '镇江-市区',
  }

  export default {
    components: {
      FieldBlock
    },
    props: {},
    data() {
      return {
        // visible
        activeNames: [],

        step: 1,
        showStartYmPicker: false,
        showEndYmPicker: false,
        showRegionPicker: false,
        showNatureTypePicker: false,
        showStallPicker: false,
        showBillInfo: false,
        showFoundTypePicker: false,
        // options

        natureTypeOptions: ['本市城镇', '本市农村', '外市城镇', '外市农村'],
        stallOptions: [
          {label: '深户一档', value: 1},
          {label: '非深户一档', value: 2},
          {label: '非深户二档', value: 3},
          {label: '非深户三档', value: 4},
        ],
        stall: {},

        startMinDate: new Date(),
        startMaxDate: new Date(),
        endMinDate: new Date(),
        endMaxDate: new Date(),

        startDate: new Date(),
        endDate: new Date(),

        // form
        chosenAddressId: '',

        form: {
          customInsuranceBase: 0,
          customFoundBase: 0,
          withFound: false,
          withInsteadPay: false,
          startYm: '201901',
          endYm: '201902',
          insuranceType: 1,
          amount: 2,
          payType: 1,
          needNewAccount: false,
          needNewCertificate: false,
          insteadPay: 0
        },

        customerForm: {
          name: '李狗蛋',
          insuredPhone: '15751774919',
          idCard: '231026199402051254',
          regionCode: 'SHSH',
        },

        // data
        customer: {
          name: '李狗蛋',
          idCard: '221322199403231232',
          insuredPhone: '15751774858',
          regionCode: 'SHSH',
          natureType: '1'
        },
        customerList: [],
        curConfig: {},

        regionList: {
          province_list: {
            110000: '北京',
            120000: '上海',

          },
          city_list: {
            110100: '市区',
            120100: '市区',
          },
        },
        columns: [
          {
            values: cities.map(c => c.label)
          },
          {
            values: cities[0].values
          }
        ],
        billInfo: {},
        chosenCusId: '',
      }
    },

    computed: {
      curPayMonth() {
        let {maxPaybackMonth, deadlineDate} = this.curConfig
        let today = dayjs()
        if (today.toDate().getDate() > deadlineDate) {
          return today.add(1, 'M').format('YYYY年MM月')
        }
        return today.format('YYYY年MM月')
      },
      monthCount() {
        let start = dayjs(this.startDate).toDate()
        let end = dayjs(this.endDate).toDate()
        let amount = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth() + 1
        console.log('%c[Hr-monthCount] - amount', 'color: #6927D8', amount)
        return amount
      },
      paybackMonthCount() {
        let {maxPaybackMonth, deadlineDate} = this.curConfig
        let start = dayjs(this.startDate).toDate()
        let end = dayjs(this.endDate).toDate()

        let today = dayjs().toDate()

        let count = (today.getFullYear() - start.getFullYear()) * 12 + today.getMonth() - start.getMonth()

        if(today.getDate() > deadlineDate) {
          count += 1
        }
        if (count < 0) {
          count = 0
        }
        console.log('%c[Hr-paybackMonthCount] - count', 'color: #6927D8', count)
        return count
      }
    },
    methods: {
      isNotEmpty(obj) {
        if (obj instanceof Array) {
          return obj && obj.length > 0
        }
        if (typeof obj === 'string') {
          return obj && obj.trim().length > 0
        }
        return !!obj // 如果obj为数值型且值为0, 返回false
      },
      isEmpty(obj) {
        return !this.isNotEmpty(obj)
      },
      formatter(type, value) {
        if (type === 'year') {
          return `${value}年`;
        } else if (type === 'month') {
          return `${value}月`
        }
        return value;
      },
      codeFormatter(code) {
        return codes[code]
      },

      natureTypeFormatter(type) {
        console.log('%c[Hr-natureTypeStr]', 'color: #63ADD1', type)
        if (type) {
          return this.natureTypeOptions[type - 1]
        }
        return '本地城镇';
      },

      switchTag(tagName, value) {
        // 苏州 必须缴纳社保公积金

        if (this.form[tagName] !== value) {
          this.form[tagName] = value
          this.calBillInfo()
        }
      },

      editCustomer(customerId) {
        console.log('%c[Hr-editCustomer]', 'color: #63ADD1', customerId)
      },

      gotoStep2() {
        this.$router.push({path: '/hr', query: {step: 2}})

        if (this.isEmpty(this.chosenCusId)) {
          Toast('请选择参保人')
          return false
        }

        this.step = 2
        console.log('%c[Hr-showForm] - this.chosenCusId', 'color: #6927D8', this.chosenCusId)

        let today = dayjs().format('YYYYMM')

        this.customer = this.customerList.find(c => c.customerId === this.chosenCusId)

        let {city, district, stall, accountNature} = this.customer

        this.form.natureType = this.natureTypeOptions.findIndex(t => t === accountNature)

        let code = 'SHSH'
        switch (city) {
          case '上海':
            code = 'SHSH'
            break;
          case '北京':
            if (accountNature.includes('城镇')) {
              code = 'BJBJCZ'
            } else {
              code = 'BJBJNC'
            }
            break
          case '南京':
            code = 'JSNJ'
            break
          case '苏州':
            if (district.includes('乙类')) {
              code = 'JSSZYQY'
            } else if (district.includes('甲类')) {
              code = 'JSSZYQJ'
            } else {
              code = 'JSSZSQ'
            }
            break;
          case '镇江':
            code = 'JSZJ'
            break
          case '深圳':
            if (stall.includes('二档')) {
              code = 'GDSZW2D'
              this.stall = this.stallOptions[2]
            } else if(stall.includes('三档')){
              code = 'GDSZW3D'
              this.stall = this.stallOptions[3]
            } else {
              if (accountNature.includes('本市')) {
                code = 'GDSZB1D'
                this.stall = this.stallOptions[0]
              } else {
                code = 'GDSZW1D'
                this.stall = this.stallOptions[1]
              }
            }
            break
          case '合肥':
            code = 'AHHF'
            break
        }
        this.customer.code = code
        console.log('%c[Hr-gotoStep2]', 'color: #63ADD1', this.customer.code)

        this.getConfig(code)

        // TODO 南京已有公积金账户用户，须将公积金转入我公司账户进行公积金代缴服务，转入流程详见支付页提示

        // TODO 上海提示信息
      },
      async saveForm() {
        let {name, insuredPhone, regionCode, idCard} = this.customerForm

        let form = {
          name, insuredPhone, regionCode, idCard,
          isInsured: true,
          address: '',
          documentPhone: '{}',
          legalPerson: name,
          telephone: insuredPhone,
          isDefault: 0,
        }

        if (this.isEmpty(form.name)) {
          Toast('参保人姓名不能为空')
          return false
        }
        if (this.isEmpty(form.insuredPhone)) {
          Toast('参保人手机号不能为空')
          return false
        }
        if (!/^1[23456789][0-9]{9}$/.test(form.insuredPhone)) {
          Toast('参保人手机号格式错误')
          return false
        }

        if (this.isEmpty(form.idCard)) {
          Toast('参保人身份证不能为空')
          return false
        }

        // 检验身份证号
        let isPregnancyFemale = true
        if (isPregnancyFemale) {
          await Dialog.alert({
            title: '提醒信息',
            message: '孕期女性购买社保，需提前了解风险，且购买1年服务费'
          })
        }

        // let resp = await axios({
        //   url: 'http://localhost:8091/companies',
        //   headers: {
        //     Authorization: '71adaedc-6ab5-461d-912f-17754d33900e'
        //   },
        //   method: 'post',
        //   data: form
        // })
        //
        // console.log('%c[Hr-saveForm]', 'color: #63ADD1', resp)
        // if (resp.status !== 200) {
        //   Toast(resp.message)
        //   return false
        // }

        // this.customer = resp.data
        let today = dayjs().format('YYYYMM')
        this.getConfig(this.customer.code)
        this.$router.push({path: '/hr', query: {step: 2}})
        this.step = 2
      },

      onRegionChange(picker, values) {
        console.log('%c[Hr-onRegionChange]', 'color: #63ADD1', values)
        let city = values[0]
        let _city = cities.find(c => c.label === city);
        picker.setColumnValues(1, _city.values)
      },

      confirmFoundRate(value) {
        console.log('%c[Hr-confirmFoundRate]', 'color: #63ADD1', value)
        this.showFoundTypePicker = false
      },


      confirmStartYm(value) {
        console.log('%c[Hr-confirmStartYm] - value', 'color: #6927D8', value)

        this.endDate = dayjs(value).add(1, 'M').toDate()
        console.log('%c[Hr-confirmStartYm]', 'color: #63ADD1', this.endDate)
        this.form.startYm = dayjs(value).format('YYYYMM')
        this.form.endYm = dayjs(this.endDate).format('YYYYMM');

        this.showStartYmPicker = false
        this.getConfig(this.customer.code)
      },
      confirmEndYm(value) {
        console.log('%c[Hr-confirmEndYm] - value', 'color: #6927D8', value)
        let s = dayjs(value).format('YYYYMM');
        this.form.endYm = s

        this.showEndYmPicker = false
        this.getConfig(this.customer.code)
      },


      confirmStall(opt) {
        console.log('%c[Hr-confirmStall]', 'color: #63ADD1', opt)
        this.stall = opt
        this.showStallPicker = false
      },
      confirmNatureType(value) {
        switch (value) {
          case '本市城镇':
            this.form.natureType = 1
            break
          case '本市农村':
            this.form.natureType = 2
            break
          case '外市城镇':
            this.form.natureType = 3
            break
          case '外市农村':
            this.form.natureType = 4
            break
        }

        let natureType = this.form.natureType

        this.showNatureTypePicker = false
        let regionCode = this.customer.code.substr(0, 4)
        if (regionCode === 'BJBJ') {
          if (natureType === 1 || natureType === 3) {
            this.customer.code = 'BJBJCZ'
          } else {
            this.customer.code = 'BJBJNC'
          }
        }
        if (regionCode === 'GDSZ') {
          if (natureType < 3) {
            this.stallOptions = [
              {label: '深户一档', value: 1},
            ]
            this.stall = this.stallOptions[0]
            this.customer.code = 'GDSZB1D'
          } else {
            this.stallOptions = [
              {label: '非深户一档', value: 2},
              {label: '非深户二档', value: 3},
              {label: '非深户三档', value: 4},
            ]
            this.stall = this.stallOptions[0]
            this.customer.code = 'GDSZW1D'
          }
        }
      },
      confirmRegion(values) {
        let code = values[1].value
        console.log('%c[Hr-confirmRegion]', 'color: #63ADD1', code)
        this.form.code = code

        this.customerForm.regionCode = code.substr(0, 4)
        this.showRegionPicker = false
      },

      async gotoCheckout() {
        // MARK check
        let {needFoundNum, needInsuranceNum, needPayYearlyServFee} = this.curConfig
        let {withFound, needNewAccount} = this.form
        let {foundNum, insuranceNum} = this.customer

        if (!needNewAccount && needInsuranceNum && this.isEmpty(insuranceNum)) {
          Toast('社保账号不能为空')
          return false
        }

        if (withFound) {
          if (!needNewAccount && needFoundNum && this.isEmpty(foundNum)) {
            Toast('公积金账号不能为空')
            return false
          }
        }

        console.log('%c[Hr-gotoCheckout] - this.monthCount', 'color: #6927D8', this.monthCount)

        // 补缴月份检查
        if (this.monthCount - this.paybackMonthCount < 2) {
          Toast('至少选择缴纳 2 个月社保后方可选择补缴')
          return false
        }
        this.form.amount = this.monthCount

        // TODO addLoading

        if (needPayYearlyServFee) {
          // TODO 检查是否已买过一年服务费

          // TODO 如果买过服务费, 且服务费未到期 账单中不显示服务费

          // TODO 如果服务到期或未买过服务费, 添加一年服务费
        }

        // TODO 检查是否购买过当前区间内的社保


        let resp = await axios({
          url: 'http://localhost:8091/companies/' + this.customer.customerId,
          headers: {
            Authorization: '1015ab40-1a02-4f17-86e9-d13088a3683b'
          },
          method: 'put',
          data: this.customer
        })
        console.log('%c[Hr-gotoCheckout]', 'color: #63ADD1', resp.data)

        this.step = 3
        this.$router.push({path: '/hr', query: {step: 3}})
      },
      async pay() {
        let openId = cookie.get('zOpenId')

        this.form = {
          ...this.form,
          startYm: dayjs(this.startDate).format('YYYYMM'),
          endYm: dayjs(this.endDate).format('YYYYMM'),
          // startYm: '201901',
          // endYm: '201901',
          amount: this.monthCount,
          customerId: this.customer.customerId,
          code: this.customer.code,
          regionCode: this.customer.code.substr(0, 4),
          openId: openId,
        }

        console.log('%c[Hr-createOrder]', 'color: #63ADD1', this.form)

        let resp = await axios({
          url: 'http://localhost:8091/social/genOrder',
          headers: {
            Authorization: '1015ab40-1a02-4f17-86e9-d13088a3683b'
          },
          method: 'post',
          data: this.form
        })
        console.log('%c[Hr-createOrder]', 'color: #63ADD1', resp.data.data)
      },

      /**
       * 计算账单金额
       * */
      calBillInfo() {
        this.showBillInfo = false

        this.checkBaseRange()

        let config = this.curConfig
        this.billInfo = this.cal2(config, this.form)
        this.showBillInfo = true
      },
      /**
       * 如果4月，7月社保基数未确定时, 计算社保 或 公积金 增收15%的金额
       * */
      calIncreasePay() {

      },
      checkBaseRange() {
        let { insuranceBaseMin, insuranceBaseMax, foundBaseMin, foundBaseMax,} = this.curConfig
        let {customInsuranceBase, customFoundBase, withFound, withInsteadPay, insteadPay} = this.form

        if (customInsuranceBase < insuranceBaseMin) {
          this.form.customInsuranceBase = insuranceBaseMin
        }
        if (customInsuranceBase > insuranceBaseMax) {
          this.form.customInsuranceBase = insuranceBaseMax
        }

        if (withFound && customFoundBase < foundBaseMin) {
          this.form.customFoundBase = foundBaseMin
        }
        if (withFound &&  customFoundBase > foundBaseMax) {
          this.form.customFoundBase = foundBaseMax
        }
        if (withInsteadPay && insteadPay < insuranceBaseMin) {
          this.form.insteadPay = insuranceBaseMin
        }
      },

      /**
       * 计算社保账单
       * @param config 配置
       * @param insuranceForm form
       */
      cal2(config, insuranceForm) {
        let {personalRate, companyRate, rates} = config
        let {
          customInsuranceBase, customFoundBase,
          withFound, withInsteadPay, insteadPay,
          startYm, endYm
        } = insuranceForm

        let billInfo = {
          totalPrice: 0
        }

        console.log('%c[Hr-cal2] - startYm', 'color: #6927D8', startYm)
        console.log('%c[Hr-cal2] - endYm', 'color: #6927D8', endYm)
        let nodeList = insuranceUtils.getBatchNums(this.curConfig, startYm, endYm)
        console.log('%c[Hr-cal2]', 'color: #63ADD1', nodeList)

        // _batchNums 与 nodeList一样
        let _batchNums = new Set()
        rates.forEach(r => _batchNums.add(r.batchNum))
        _batchNums = [..._batchNums]
        // TODO 计算增收15的金额
        console.log('%c[Hr-cal2] - _batchNums', 'color: #6927D8', _batchNums)


        let cPensionTotal = this.cal(companyRate, customInsuranceBase, 'pension')
        let cMedicalTotal = this.cal(companyRate, customInsuranceBase, 'medical')
        let cUnemployTotal = this.cal(companyRate, customInsuranceBase, 'unemploy')
        let cInjuryTotal = this.cal(companyRate, customInsuranceBase, 'injury')
        let cMaternityTotal = this.cal(companyRate, customInsuranceBase, 'maternity')
        let cDisablityTotal = this.cal(companyRate, customInsuranceBase, 'disablity')

        let pPensionTotal = this.cal(personalRate, customInsuranceBase, 'pension')
        let pMedicalTotal = this.cal(personalRate, customInsuranceBase, 'medical')
        let pUnemployTotal = this.cal(personalRate, customInsuranceBase, 'unemploy')
        let pInjuryTotal = this.cal(personalRate, customInsuranceBase, 'injury')
        let pMaternityTotal = this.cal(personalRate, customInsuranceBase, 'maternity')
        let pDisablityTotal = this.cal(personalRate, customInsuranceBase, 'disablity')
        let pIllnessTotal = personalRate.illness

        billInfo = {
          cPensionTotal, cMedicalTotal, cUnemployTotal, cInjuryTotal, cMaternityTotal, cDisablityTotal,
          pPensionTotal, pMedicalTotal, pUnemployTotal, pInjuryTotal, pMaternityTotal, pDisablityTotal, pIllnessTotal,
        }

        let cTotal = cPensionTotal + cMedicalTotal + cUnemployTotal + cInjuryTotal + cMaternityTotal + cDisablityTotal
        let pTotal = pPensionTotal + pMedicalTotal + pUnemployTotal + pInjuryTotal + pMaternityTotal + pDisablityTotal + pIllnessTotal

        billInfo.totalPrice = cTotal + pTotal
        billInfo.cTotal = cTotal
        billInfo.pTotal = pTotal

        if (withFound) {
          billInfo.foundTotal = this.cal(personalRate, customFoundBase, 'found') * 2
          billInfo.totalPrice += billInfo.foundTotal
        }
        if (withInsteadPay) {
          insteadPay = Number(insteadPay)
          billInfo.insteadPayTotal = insteadPay || 0
          console.log('%c[Hr-cal2]', 'color: #63ADD1', typeof billInfo.insteadPayTotal)
          billInfo.totalPrice += billInfo.insteadPayTotal
        }
        return billInfo
      },

      cal(rate, customBase, itemName) {
        let total = 0
        if (itemName === 'found') {
          total = Math.ceil(rate[itemName + 'Rate'] * Math.max(customBase, rate[itemName + 'MinBase']))
        } else {
          total = Math.round(rate[itemName + 'Rate'] * Math.max(customBase, rate[itemName + 'MinBase']))
        }

        console.log('%c[Hr-cal]', 'color: #63ADD1', itemName, total)

        return total / 100
      },

      setStartYmLimit(config) {
        const SERVE_MONTH = 2

        let {maxPaybackMonth, deadlineDate} = config
        let today = dayjs()

        if (today.toDate().getDate() >= deadlineDate) {
          // this.startDate = today.add(1, 'M').toDate()
          // this.endDate = today.add(2, 'M').toDate()
          // this.form.startYm = dayjs(this.startDate).format('YYYYMM')
          // this.form.endYm = dayjs(this.endDate).format('YYYYMM')

          this.startMinDate = today.add(1, 'M').subtract(maxPaybackMonth, 'M').toDate()
          this.startMaxDate = today.add(4, 'M').subtract(maxPaybackMonth, 'M').toDate()
          this.endMinDate = dayjs(this.startMinDate).add(SERVE_MONTH, 'M').toDate()
          this.endMaxDate = dayjs(this.startMinDate).add(4, 'M').toDate()
        } else {
          // this.startDate = today.toDate()
          // this.endDate = today.add(1, 'M').toDate()
          // this.form.startYm = dayjs(this.startDate).format('YYYYMM')
          // this.form.endYm = dayjs(this.endDate).format('YYYYMM')

          this.startMinDate = today.subtract(maxPaybackMonth, 'M').toDate()
          this.startMaxDate = today.add(3, 'M').subtract(maxPaybackMonth, 'M').toDate()
          this.endMinDate = dayjs(this.startMinDate).add(SERVE_MONTH, 'M').toDate()
          this.endMaxDate = dayjs(this.startMinDate).add(3, 'M').toDate()
        }
        console.log('%c[Hr-setStartYmLimit] - this.startMinDate', 'color: #6927D8', this.startMinDate)
        console.log('%c[Hr-setStartYmLimit] - this.endMinDate', 'color: #6927D8', this.endMinDate)
      },
      async getConfig(code) {
        console.clear()
        console.log('%c[Hr-getConfig]', 'color: #63ADD1', code)
        if (!code) {
          code = 'SHSH'
        }
        let startYm = dayjs(this.startDate).format('YYYYMM')
        let endYm = dayjs(this.endDate).format('YYYYMM')

        let resp = await axios({
          url: 'http://localhost:8091/social/config',
          method: 'get',
          params: {
            code,
            startYm,
            endYm
          }
        })
        let config = resp.data.data.config
        this.curConfig = config

        let {insuranceBaseMin, foundBaseMin, rates} = config

        let companyRates = rates.filter(r => r.type === 1)
        let personalRates = rates.filter(r => r.type === 2)
        config.personalRate = personalRates[0]
        config.companyRate = companyRates[0]

        this.setStartYmLimit(config)

        console.log('%c[Hr-getConfig] - config', 'color: #6927D8', config)

        this.form.customInsuranceBase = insuranceBaseMin
        this.form.insteadPay = insuranceBaseMin
        this.form.customFoundBase = foundBaseMin
        this.calBillInfo()
      },
      async getInsuredPersons() {
        this.customerList = []

        let resp = await axios({
          url: 'http://localhost:8091/companies',
          method: 'get',
          headers: {
            Authorization: '1015ab40-1a02-4f17-86e9-d13088a3683b'
          },
          params: {
            insured: true
          }
        })
        console.log('%c[Hr-getInsuredPersons]', 'color: #63ADD1', resp)
        if (resp.status !== 200) {
          Toast(resp.message)
          return false
        }
        this.customerList = resp.data.map(cus => {
          return this.handleOldData(cus)
        })

        if (this.isNotEmpty(this.customerList)) {
          this.chosenCusId = this.customerList[0].customerId
          this.customer = this.customerList[0]
        }
      },

      // 处理老数据
      handleOldData(customer) {
        let {city, district, stall, accountNature} = customer


        let code = 'SHSH'
        switch (city) {
          case '上海':
            code = 'SHSH'
            break;
          case '北京':
            if (accountNature.includes('城镇')) {
              code = 'BJBJCZ'
            } else {
              code = 'BJBJNC'
            }
            break
          case '南京':
            code = 'JSNJ'
            break
          case '苏州':
            if (district.includes('乙类')) {
              code = 'JSSZYQY'
            } else if (district.includes('甲类')) {
              code = 'JSSZYQJ'
            } else {
              code = 'JSSZSQ'
            }
            break;
          case '镇江':
            code = 'JSZJ'
            break
          case '深圳':
            if (stall.includes('二档')) {
              code = 'GDSZW2D'
            } else if(stall.includes('三档')){
              code = 'GDSZW3D'
            } else {
              if (accountNature.includes('本市')) {
                code = 'GDSZB1D'
              } else {
                code = 'GDSZW1D'
              }
            }
            break
          case '合肥':
            code = 'AHHF'
            break
        }
        console.log('%c[Hr-handleOldData] - code', 'color: #6927D8', code)

        customer.code = code
        return customer
      },
    },
    watch: {
      '$route'(to, from) {
        console.log('%c[Hr-$route]', 'color: #63ADD1', to.query)
        let {step} = to.query
        if (step) {
          this.step = Number(step) || 1
        } else {
          this.step = 1
        }
      }
    },
    created() {
      this.getInsuredPersons()
    },

  }
</script>
