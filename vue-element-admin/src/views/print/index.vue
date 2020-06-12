<template>
  <div class="app-container">
    <button v-print="printObj">打印当前页面</button>
    <div id="printMe">

      <p>二维码生成器</p>
      <div ref="qrcode" />
      <!--ECharts-->
      <div ref="echartMain" :style="{width: '300px', height: '300px'}" />

      <input type="number">
      <input type="time">
      <input type="checkbox">
      <input type="radio">

      <p>单选框</p>
      <div>
        <el-radio v-model="radio" label="1">是</el-radio>
        <el-radio v-model="radio" label="2">否</el-radio>
      </div>

      <p>多选框</p>
      <div>
        <el-checkbox v-model="checkAll" :indeterminate="isIndeterminate" @change="handleCheckAllChange">全选</el-checkbox>
        <div style="margin: 15px 0;" />
        <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
          <el-checkbox v-for="city in cities" :key="city" :label="city">{{ city }}</el-checkbox>
        </el-checkbox-group>
      </div>

      <p>下拉选框</p>
      <select>
        <option value="volvo">Volvo</option>
        <option value="saab">Saab</option>
        <option value="mercedes">Mercedes</option>
        <option value="audi">Audi</option>
      </select>

      <p>文本框</p>
      <textarea id="" name="" cols="30" rows="10" />

    </div>
  </div>
</template>

<script>
import QRCode from 'qrcodejs2'
import echarts from 'echarts'

const cityOptions = ['上海', '北京', '广州', '深圳']

export default {
  name: 'Print',
  data() {
    return {
      // 打印属性
      printObj: {
        id: 'printMe',
        popTitle: '打印头消息',
        extraCss: 'https://www.baidu.com/,https://www.baidu.com/',
        extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      },

      radio: '1',

      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    }
  },
  mounted() {
    this.echart()
    // 二维码
    this.$nextTick(() => {
      new QRCode(this.$refs.qrcode, {
        width: 100,
        height: 100,
        // text: 'https://www.baidu.com/'
        text: 'weixin://wxpay/bizpayurl?pr=wnYilCb'
      })
    })
  },
  methods: {
    echart() {
      const myChart = echarts.init(this.$refs.echartMain)
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [{
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20]
        }]
      })
    },

    handleCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : []
      this.isIndeterminate = false
    },
    handleCheckedCitiesChange(value) {
      const checkedCount = value.length
      this.checkAll = checkedCount === this.cities.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length
    }

  }
}
</script>

