<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click" @command="handleCommand">
        <div class="avatar-wrapper">
          <span class="el-dropdown-link">
            {{ name }}<i class="el-icon-arrow-down el-icon--right" />
          </span>
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item command="edit">
            修改密码
          </el-dropdown-item>

          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>

    <!-- 弹出层 -->
    <el-dialog v-dialogDrag title="修改密码" :visible.sync="dialogVisible" width="420px">
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">

        <el-form-item label="新密码" prop="password">
          <el-input v-model="form.password" type="password" style="width:200px" />
        </el-form-item>

        <el-form-item label="重复密码" prop="password2">
          <el-input v-model="form.password2" type="password" style="width:200px" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="submitLoding" @click="submitForm('form')">提交</el-button>
        <!-- <el-button @click="onCancel">Cancel</el-button> -->
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import { editPassword } from '@/api/admin'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else if (value.length < 6) {
        callback(new Error('请输入6位数以上密码'))
      } else {
        if (this.form.password2 !== '') {
          this.$refs.form.validateField('password2')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.form.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      nav: '',
      dialogVisible: false,
      submitLoding: false,
      activeIndex: '/records',
      form: {
        password: '',
        password2: ''
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password2: [
          { validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'avatar',
      'name'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/logout')
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
    },
    // 下拉菜单操作
    handleCommand(command) {
      switch (command) {
        case 'edit':
          this.showEdit()
          break
      }
    },
    showEdit() {
      this.dialogVisible = true
    },
    // 表单提交
    submitForm(formName) {
      this.submitLoding = true

      this.$refs[formName].validate((valid) => {
        if (valid) {
          editPassword({ password: this.form.password }).then(response => {
            this.$message.success('修改成功!')
            this.dialogVisible = false
            this.submitLoding = false
          }).catch(err => {
            console.log(err)
            this.submitLoding = false
          })
        } else {
          this.submitLoding = false
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
