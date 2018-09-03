const menuList = [
    {
        key:'sub1',
        title: '首页',
        router: '/admin/home'
    },

    {
        key:'sub2',
        title: '分销商管理',
        router: '/admin/user',
        children: [
            {
                key:'1',
                title: '信息管理',
                router: '/admin/charts/bar'
            },
            {
                key:'2',
                title:'增加',
                router: '/admin/charts/pie'
            },
            {
                key:'3',
                title: '折线图',
                router: '/admin/charts/line'
            },
        ]
    },

    {
        key:'sub3',
        title: '管理员管理',
        router: '/admin/admin',
        children: [
            {
                key:'4',
                title: '信息管理',
                router: '/admin/charts/bar'
            },
            {
                key:'5',
                title: '饼图',
                router: '/admin/charts/pie'
            },
            {
                key:'6',
                title: '折线图',
                router: '/admin/charts/line'
            },
        ]
    },


    {
        key:'sub4',
        title: '图表',
        router: '/admin/charts',
        children: [
            {
                key:'7',
                title: '柱形图',
                router: '/admin/charts/bar'
            },
            {
                key:'8',
                title: '饼图',
                router: '/admin/charts/pie'
            },
            {
                key:'9',
                title: '折线图',
                router: '/admin/charts/line'
            },
        ]
    },

    {
        key:'sub5',
        title: '权限设置',
        router: '/admin/permission'
    },
];
export default menuList;