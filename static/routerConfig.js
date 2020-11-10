const userCtrl = require("../controller/userCtrl");
const permissionCtrl = require('../controller/permissionCtrl')
const infoCtrl = require('../controller/infoCtrl')
const roleCtrl = require('../controller/roleCtrl')
const operationCtrl = require('../controller/operationCtrl')
const permission = [
  {
    serverName: 'user',
    eventName: 'login',
    dispatcher: userCtrl.login,
    description: '登录',
    roles: 'ALL'
  },
  {
    serverName: 'user',
    eventName: 'info',
    dispatcher: userCtrl.getInfo,
    description: '获取信息'
    , roles: 'ALL'
  },
  {
    serverName: 'user',
    eventName: 'logout',
    dispatcher: userCtrl.logout,
    description: '登出'
    , roles: 'ALL'
  },
  {
    serverName: 'routes',
    eventName: 'edit',
    dispatcher: permissionCtrl.edit,
    description: '获取编辑信息',
  roles: 'ALL'
  },

  {
    serverName: 'routes',
    eventName: 'getRoutes',
    dispatcher: permissionCtrl.getRouter,
    description: '获取当前用户权限信息',
  roles: 'ALL'
  },

  {
    serverName: 'routes',
    eventName: 'deleteRoute',
    dispatcher: permissionCtrl.deleteRoute,
    description: '删除权限',
  roles: 'ALL'
  },
  {
    serverName: 'routes',
    eventName: 'updatePermission',
    dispatcher: permissionCtrl.updatePermission,
    description: '更新权限',
  roles: 'ALL'
  },
  {
    serverName: 'info',
    eventName: 'list',
    dispatcher: infoCtrl.getList,
    description: '获取用户信息',
  roles: 'ALL'
  },
  {
    serverName: 'info',
    eventName: 'getInfoByUid',
    dispatcher: infoCtrl.getInfoByUid,
    description: '获取当前用户信息',
  roles: 'ALL'
  },
  {
    serverName: 'info',
    eventName: 'edit',
    dispatcher: infoCtrl.edit,
    description: '编辑用户信息',
  roles: 'ALL'
  }, {
    serverName: 'info',
    eventName: 'deleteUser',
    dispatcher: infoCtrl.deleteUser,
    description: '删除当前用户',
  roles: 'ALL'
  }, {
    serverName: 'role',
    eventName: 'getRoles',
    dispatcher: roleCtrl.getRoles,
    description: '获取角色信息',
  roles: 'ALL'
  }, {
    serverName: 'role',
    eventName: 'addRole',
    dispatcher: roleCtrl.addRole,
    description: '添加角色',
  roles: 'ALL'
  }, {
    serverName: 'role',
    eventName: 'deleteRoleByRid',
    dispatcher: roleCtrl.deleteRoleByRid,
    description: '删除当前角色',
  roles: 'ALL'
  },
  {
    serverName: 'operation',
    eventName: 'getBtnInfo',
    dispatcher: operationCtrl.getBtnInfo,
    description: '判断按钮权限',
  roles: 'ALL'
  },
]
module.exports = permission
