/**
 * reducer数据处理
 */

 import {type} from './../action/index';

const initialState={
    menuName:'首页'
}
//action接受过来的方法
export default (state=initialState,action)=>{
    switch(action.type){
        case type.SWITCH_MENU:
                return{
                    ...state,
                    menuName:action.menuName//更换新的值
                }
            break;
        default:
            return {...state};
            break;
    }
}