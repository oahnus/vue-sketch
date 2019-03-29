<style scoped lang="less">
  @import "../../global.less";
  #DragDialog {
    .dialog-con {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      margin: 0;
      /*pointer-events: none;*/
    }
    .dialog-con--showmodal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      overflow: auto;
      margin: 0
    }
    .dialog-con--nomodal {

    }

    .dialog {
      position: relative;
      margin: 0 auto 50px;
      background: #fff;
      border-radius: 2px;
      -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
      box-shadow: 0 1px 3px rgba(0, 0, 0, .3);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      width: 50%;

      margin-top: 200px;
    }

    .dialog__header {
      padding: 10px;
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

    .dialog__footer {
      height: 40px;
      padding: 5px 10px;
    }
    .dialog__content {
      height: auto;
      padding: 10px;
    }
  }
</style>

<style lang="less">
  #DragDialog {
    .el-dialog__header {
      padding: 0;
    }
  }
</style>

<template>
  <div id="DragDialog">
    <el-dialog width="600px"
               ref="dlg"
               class="b1"
               :modal="false"
               :visible.sync="visible">
      <div slot="title"
           :draggable="onlyTitleDrag"
           @dragstart="dragStart($event)"
           @drag="drag($event)"
           @dragend="dragEnd($event)"
           @drop="drop($event)">
        <div style="padding: 20px;">
          TITLE
        </div>
      </div>
    </el-dialog>

    <div class="dialog-con b1"
         v-show="visible2" @click.self="handleWrapperClick">
      <div :style="{width: '600px'}"
           ref="dlg2"
           class="dialog b1"
           :draggable="!onlyTitleDrag"
           @dragstart="dragStart($event)"
           @drag="drag($event)"
           @dragend="dragEnd($event)"
           @drop="drop($event)"
           :modal="false">

        <div class="dialog__header b2"
             :draggable="onlyTitleDrag"
             @dragstart="dragStart($event)"
             @drag="drag($event)"
             @dragend="dragEnd($event)"
             @drop="drop($event)">
          <div class="dialog__title">
            <!--<slot name="title"></slot>-->
            TITLE
          </div>
          <div class="dialog__closebtn" @click="visible2 = false">
            x
          </div>
        </div>
        <div class="dialog__content">
          {{count}}
        </div>
        <div class="dialog__footer b2">
          footer
          <el-button @click="count += 1">CCC</el-button>
        </div>
      </div>

    </div>

    <el-button style="margin: 300px" @click="visible = true">CCC</el-button>
    <el-button style="margin: 300px" @click="open2">CCC</el-button>

    <div class=""
         :draggable="true"
         @dragstart="dragStart2($event)"
         @drag="drag2($event)"
         @dragend="dragEnd2($event)"
         @drop="drop2($event)"
         style="background: #eee;border: 1px solid #4e2;width: 300px;height: 200px;position: absolute;top: 150px;left: 150px;">
      <div class="dialog__header b2">
        <div class="dialog__title">
          <!--<slot name="title"></slot>-->
          TITLE
        </div>
        <div class="dialog__closebtn">
          x
        </div>
      </div>
      <div class="dialog__content">
        {{count}}
      </div>
      <div class="dialog__footer b2">
        footer
        <el-button @click="count += 1">CCC</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    props: {
      closeOnClickModal: {
        type: Boolean,
        default: false
      },
      onlyTitleDrag: {
        type: Boolean,
        default: true
      },
      attachSlide: {
        type: Boolean,
        default: true
      },
      attachLimit: {
        type: Number,
        default: 30
      }
    },
    data() {
      return {
        // visible
        visible: false,
        visible2: false,
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
      open2() {
        this.visible2 = true
        this.$refs.dlg.$el.style.marginLeft = 'auto'
        this.$refs.dlg.$el.style.marginRight = 'auto'
      },

      handleWrapperClick(e) {
        if (this.closeOnClickModal) {
          this.visible2 = false
        }
      },

      dragStart(e) {
        e.stopPropagation()

        console.log('%c[DragDialog-dragStart]', 'color: #63ADD1', )
        let x = e.x;
        let y = e.y;

        let parentNode = this.onlyTitleDrag ? e.target.parentNode.parentNode : e.target;

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
        // let parentNode = e.target.parentNode.parentNode;
        let parentNode = this.onlyTitleDrag ? e.target.parentNode.parentNode : e.target;

        let marginLeft = this.startOffsetLeft + offsetX
        let marginTop = this.startOffsetTop + offsetY
        parentNode.style.marginLeft = marginLeft + 'px'
        parentNode.style.marginTop = marginTop + 'px'
      },
      dragEnd(e) {
        e.stopPropagation()
        let x = e.x;
        let y = e.y;

        let offsetX = x - this.dragStartX
        let offsetY = y - this.dragStartY

        // let parentNode = e.target.parentNode.parentNode;
        let parentNode = this.onlyTitleDrag ? e.target.parentNode.parentNode : e.target;

        let marginLeft = this.startOffsetLeft + offsetX
        let marginTop = this.startOffsetTop + offsetY
        parentNode.style.marginLeft = marginLeft + 'px'
        parentNode.style.marginTop = marginTop + 'px'

        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;

        if (this.attachSlide) {
          let attachLimit = this.attachLimit

          if (parentNode.offsetLeft < attachLimit) {
            parentNode.style.marginLeft = '0px'
          }
          if (parentNode.offsetLeft + parentNode.offsetWidth > clientWidth - attachLimit) {
            parentNode.style.marginLeft = (clientWidth - parentNode.offsetWidth) + 'px'
          }
          if (parentNode.offsetTop < attachLimit) {
            parentNode.style.marginTop = '0px'
          }
        }
      },
      dragStart2(e) {
        e.stopPropagation()

        console.log('%c[DragDialog-dragStart]', 'color: #63ADD1', )
        let x = e.x;
        let y = e.y;

        let parentNode = e.target;

        this.dragStartX = x
        this.dragStartY = y
        this.startOffsetLeft = parentNode.offsetLeft
        this.startOffsetTop = parentNode.offsetTop
      },
      drop2(e) {
        e.stopPropagation()

      },
      drag2(e) {
        e.stopPropagation()
        let x = e.x;
        let y = e.y;

        let offsetX = x - this.dragStartX
        let offsetY = y - this.dragStartY
        // let parentNode = e.target.parentNode.parentNode;
        let parentNode = e.target;

        let marginLeft = this.startOffsetLeft + offsetX
        let marginTop = this.startOffsetTop + offsetY
        parentNode.style.left = marginLeft + 'px'
        parentNode.style.top = marginTop + 'px'
      },
      dragEnd2(e) {
        e.stopPropagation()
        let x = e.x;
        let y = e.y;

        let offsetX = x - this.dragStartX
        let offsetY = y - this.dragStartY

        // let parentNode = e.target.parentNode.parentNode;
        let parentNode = e.target;

        let marginLeft = this.startOffsetLeft + offsetX
        let marginTop = this.startOffsetTop + offsetY
        parentNode.style.left = marginLeft + 'px'
        parentNode.style.top = marginTop + 'px'

        let clientWidth = document.body.clientWidth;
        let clientHeight = document.body.clientHeight;

        // if (this.attachSlide) {
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
        // }
      },
    },
    mounted() {
      if (this.visible) {
        this.rendered = true;
        this.open();
        if (this.appendToBody) {
          document.body.appendChild(this.$el);
        }
      }

      this.$nextTick(() => {
        if (!this.onlyTitleDrag) {
          let elementChild = this.$refs.dlg.$el.firstElementChild;
          elementChild.setAttribute('draggable', true)
          elementChild.addEventListener('dragstart', this.dragStart)
          elementChild.addEventListener('drag', this.drag)
          elementChild.addEventListener('dragend', this.dragEnd)
          elementChild.addEventListener('drop', this.drop)
        }
      })
    },
    watch: {
    },
    destroyed() {
      // if appendToBody is true, remove DOM node after destroy
      if (this.appendToBody && this.$el && this.$el.parentNode) {
        this.$el.parentNode.removeChild(this.$el);
      }
    }
  }
</script>
