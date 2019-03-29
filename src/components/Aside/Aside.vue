<style scoped>

</style>
<template>
  <transition name="fade">
    <div id="aside" class="aside" v-show="isActive" :class="[{ 'is-active': isActive }, placementClass]">
      <div class="modal-background" v-if="backdrop" @click="backdropClose"></div>
      <transition :name="transitionName">
        <div class="modal-card" :style="modalWidth" v-show="isActive">
          <header class="modal-card-head aside-header" v-if="showHeader">
            <slot name="header">
              <p class="modal-card-title">{{ title }}</p>
              <span class="close" @click="handleCancel">×</span>
            </slot>
          </header>
          <section class="modal-card-body aside-body">
            <slot></slot>
          </section>
          <footer class="modal-card-foot aside-footer" v-if="showFooter">
            <slot name="footer">
              <a class="button" @click="handleCancel" v-if="showCancel">{{ cancelText }}</a>
              <a class="button is-primary" :class="{'is-loading': isLoading}" @click="handleOk" v-if="showOk">{{ okText }}</a>
            </slot>
          </footer>
        </div>
      </transition>
    </div>
  </transition>
</template>
<script>
  import ModalMixin from '../Modal/Modal'
  export default {
    mixins: [ModalMixin],
    props: {
      width: {
        type: Number,
        default: 450,
      },
      placement: {
        type: String,
        default: 'left',
      },
      transition: {
        type: String,
        default: 'fadeLeft',
      },
    },
    data() {
      return {
        outsideClose: null,
      }
    },
    computed: {
      placementClass() {
        if (this.placement && this.placement !== 'left') {
          return `aside-${this.placement}`;
        }
        return null;
      },
      transitionName() {
        if (this.placement === 'right' && this.transition === 'fadeLeft') {
          return 'fadeRight';
        }
        return this.transition;
      },
    },
    mounted() {
      /////////// 点击空白处 关闭弹出框
      let vm = this
      vm.outsideClose = function(e){
        let clickX = e.clientX
        let screenX = document.body.clientWidth
        // 右侧 aside 宽度 1000
        if (screenX - vm.width > clickX) {
          vm.$emit('close') // isActive 是 mixin 中的属性
        }
      }
      document.addEventListener('mousedown', vm.outsideClose);
      //////////////
    },
    beforeDestroy() {
      let vm = this
      document.removeEventListener('mousedown', vm.outsideClose)
    }
  };
</script>
