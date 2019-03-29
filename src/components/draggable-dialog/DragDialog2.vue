<style scoped>
  .dialog {
    background: #fff;
    border: 1px solid #409eff;
    position: absolute;
    border-radius: 5px;
    top: 50px;
    left: 50px;
    width: 50%;

    margin: 0 auto 50px;
    -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .dialog__header {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .dialog__title {

  }
  .dialog__closebtn {
    color: #999;
    position: absolute;
    top: 10px;
    right: 20px;
    padding: 0;
    background: 0 0;
    width: 16px;
    height: 16px;
    outline: 0;
    cursor: pointer;
    font-size: 16px;
  }

  .dialog--fullscreen {
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
  }

  .dialog__footer {
    border-top: 1px solid #eee;
    height: 40px;
    padding: 5px 10px;
  }
  .dialog__content {
    height: auto;
    padding: 10px;
  }
  .dialog__btn {
    margin-top: 5px;
    width: 60px;
    height: 30px;
    background: #fff;
    color: #0077db;
    outline: none;
    border: 1px solid #dcdfe6;
    border-radius: 5px;
    cursor: pointer;
  }

  .dialog__btn:hover {
    background: #ecf5ff;
    border: 1px solid #409eff;
  }
</style>

<template>
  <transition
          name="dialog-fade"
          @after-enter="afterEnter"
          @after-leave="afterLeave">
  <section class="dialog"
           v-show="visible"
           ref="dialog"
           :draggable="!onlyDragTitle"
           @dragstart="dragStart($event)"
           @drag="drag($event)"
           @dragend="dragEnd($event)"
           @drop="drop($event)"
           :class="[{dialogClass}]"
           :style="dialogStyle">
    <div class="dialog__header" :style="{cursor: onlyDragTitle ? 'move' : ''}">
      <slot name="title">
        <span class="dialog__title">
          {{title}}
        </span>
      </slot>
      <div v-if="showClose"
           class="dialog__closebtn"
           @click="close">X</div>
    </div>
    <div class="dialog__content">
      <slot></slot>
    </div>
    <div class="dialog__footer">
      <slot name="footer">
        <button class="dialog__btn" style="float: right" @click="close">关闭</button>
      </slot>
    </div>
  </section>
  </transition>
</template>

<script>
  export default {
    components: {},
    props: {
      fullScreen: {
        type: Boolean,
        default: false,
      },
      center: {
        type: Boolean,
        default: false,
      },
      showClose: {
        type: Boolean,
        default: true,
      },
      showFooter: {
        type: Boolean,
        default: true,
      },
      title: {
        type: String,
        default: 'Title'
      },
      width: String,
      visible: {
        type: Boolean,
        default: false
      },
      attachSlide: {
        type: Boolean,
        default: true
      },
      attachLimit: {
        type: Number,
        default: 30
      },
      beforeClose: {
        type: Function,
      },
      onlyDragTitle: {
        type: Boolean,
        default: false
      },
      footerAlign: {
        type: String,
        default: 'right'
      },
      dialogClass: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        // visible

        // options

        // form

        // data
        dragStartX: 0,
        dragStartY: 0,
        startOffsetLeft: 0,
        startOffsetTop: 0,

        count: 0,
      }
    },
    methods: {
      fullscreen() {
        let elem = this.$refs.dialog.$el
        elem.style.top = 0
        elem.style.left= 0
        elem.style.right = 0
        elem.style.bottom = 0
      },
      close() {
        console.log('%c[DragDialog2-close]', 'color: #63ADD1', )
        this.$emit('update:visible', false)
        if (typeof this.beforeClose === 'function') {
          this.beforeClose()
        }
      },

      dragStart(e) {
        e.stopPropagation()

        console.log('%c[DragDialog-dragStart]', 'color: #63ADD1', )
        let x = e.x;
        let y = e.y;

        let parentNode = this.onlyDragTitle ? e.target.parentNode : e.target;

        this.dragStartX = x
        this.dragStartY = y
        this.startOffsetLeft = parentNode.offsetLeft
        this.startOffsetTop = parentNode.offsetTop
      },
      drop(e) {
        e.stopPropagation()

      },
      drag(e) {
        e.stopPropagation()
        let x = e.x;
        let y = e.y;

        let offsetX = x - this.dragStartX
        let offsetY = y - this.dragStartY

        let parentNode = this.onlyDragTitle ? e.target.parentNode : e.target;

        let marginLeft = this.startOffsetLeft + offsetX
        let marginTop = this.startOffsetTop + offsetY
        parentNode.style.left = marginLeft + 'px'
        parentNode.style.top = marginTop + 'px'
      },
      dragEnd(e) {
        e.stopPropagation()
        let x = e.x;
        let y = e.y;

        let offsetX = x - this.dragStartX
        let offsetY = y - this.dragStartY

        let parentNode = this.onlyDragTitle ? e.target.parentNode : e.target;

        let marginLeft = this.startOffsetLeft + offsetX
        let marginTop = this.startOffsetTop + offsetY
        parentNode.style.left = marginLeft + 'px'
        parentNode.style.top = marginTop + 'px'

        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;

        if (this.attachSlide) {
          let attachLimit = this.attachLimit

          if (parentNode.offsetLeft < attachLimit) {
            parentNode.style.left = '0px'
          }
          if (parentNode.offsetLeft + parentNode.offsetWidth > clientWidth - attachLimit) {
            parentNode.style.left = (clientWidth - parentNode.offsetWidth) + 'px'
          }
          if (parentNode.offsetTop < attachLimit) {
            parentNode.style.top = '0px'
          }
        }
      },
      afterEnter() {

      },
      afterLeave() {

      }
    },
    computed: {
      dialogStyle() {
        let style = {}
        if (!this.fullScreen) {
          if (this.width) {
            style.width = this.width
          }
        }
        if (!this.onlyDragTitle) {
          style.cursor = 'move'
        }

        return style
      },
    },
    watch: {
      '$route'(to, from) {
      }
    },
    created() {
    },
    mounted() {
      this.$nextTick(() => {
        if (this.onlyDragTitle) {
          let elementChild = this.$refs.dialog.firstElementChild;

          elementChild.setAttribute('draggable', true)
          elementChild.addEventListener('dragstart', this.dragStart)
          elementChild.addEventListener('drag', this.drag)
          elementChild.addEventListener('dragend', this.dragEnd)
          elementChild.addEventListener('drop', this.drop)
        }
      })
    }
  }
</script>
