# 筑楷项目移动端 
## 技术选型
基础框架：[Taro](https://taro-docs.jd.com/docs/)、Vue3、TypeScript

状态管理器：[Pinia](https://pinia.web3doc.top/)

UI组件：[NutUI Vue Taro](https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/intro)
## 环境准备
Node版本16+

安装 Taro 命令行工具

```bash
# 使用 npm 安装 CLI
npm install -g @tarojs/cli
```
推荐使用pnpm

```bash
npm install pnpm -g
```
## 使用

```bash
git clone https://gitee.com/huakun_information_center_1/zhukai-uniapp-front.git
```

```bash
pnpm i
```

```bash
# 运行命令、通过微信开发工具指向dist包查看效果
npm run dev:weapp
```

```bash
# 打包命令
npm run build:weapp
```
## 开发注意事项
1.在.vue文件中不支持下面的写法

```bash
<style scoped></style>
```
2.所有页面以下面组件作为根组件包裹，保证UI组件适配不同主题

```bash
<basic-layout></basic-layout>
```
3.Taro不支持以相对路径引用本地静态资源，需使用js导入使用

4.tabBar页面和login页面放在主包下，所有业务代码存放在busPackage分包下，tabBar页面只提供对应业务页面的入口，以减小主包体积
