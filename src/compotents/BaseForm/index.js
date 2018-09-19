import React from 'react';
import {Input,Select,Checkbox,Radio,Button,Form} from 'antd';
import Utils from './../../utils/utils';

const FormItem=Form.Item
const Option=Select.Option

class FilterForm extends React.Component{

    //初始化
    initFormList=()=>{
        const {getFieldDecorator}=this.props.form;
        const formList=this.props.formList;
        if(formList&&formList.length>0){
            formList.forEach((item,index)=>{
                let label=item.label;
                let field=item.field;
                let initialValue=item.initialValue;
                let placeholder=item.placeholder;
                let width=item.width;
                let list=item.list;
                if(list.type=='select'){
                    const SELECT= <FormItem label={label}>
                            {
                                getFieldDecorator([field],{
                                    initialValue:initialValue
                                })(
                                    <Select
                                        style={{ width: width }}
                                        placeholder="全部"
                                    >
                                        {Utils.getOptionList(item.list)}
                                    </Select>
                                )
                            }
                        </FormItem>
                }
            })
        }
    }
    render(){
        return(
            <Form>

            </Form>
        );
    }
}
export default  Form.create()(FilterForm)
