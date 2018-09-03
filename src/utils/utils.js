import React from 'react';

export default {
    formatDate(time){
        if(!time) return '';
        let data=new Date(time);
        let year=data.getFullYear();
        let month=data.getMonth();
        if(month<10){
             month='0'+month;
        }
        let day=data.getDate();
        if(day<10){
            day='0'+day;
        }
        let hour=data.getHours();
        if(hour<10){
            hour='0'+hour;
        }
        let minute=data.getMinutes();
        if(minute<10){
            minute='0'+minute;
        }
        let second=data.getSeconds();
        if(second<10){
            second='0'+second;
        }
        return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
    }
}