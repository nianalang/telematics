/**
 * action类型
 */
export const type = {
    SWITCH_MENU : 'SWITCH_MENU',
    LOGIN:'LOGIN',
}

// 菜单点击切换，修改面包屑名称
export function switchMenu(menuName) {
    return {
        type:type.SWITCH_MENU,
        menuName
    }
}

//登陆传递信息
export function login(info) {
    return {
        type:type.LOGIN,
        ...info
    }
}