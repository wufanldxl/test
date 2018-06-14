let api={};
let host='';
// let host='http://10.4.81.200:8085';
api.install=(Vue)=>{
    Vue.prototype.$api={
        index:{
            recommend:host+'/qaplatform/qa/homePage/recommend',
            questionLabel:host+'/qaplatform/qa/homePage/labelType/list',
            getQuestList:host+'/qaplatform/qa/homePage/question/list'
        },
        ask:host+'/qaplatform/qa/question/add',
        masterList:host+'/qaplatform/qa/talent/getTalentList',
        image:{
            uploadImg:host+'/qaplatform/uploadImage/execute',
            editUpImg:host+'/qaplatform/uploadImage/execute2'
        },
        questionDetail:host+'/qaplatform/qa/question/info',
        indexDetail:host+'/qaplatform/qa/question/supreme/info',
        //点赞
        like:host+'/qaplatform/qa/answer/great',
        //收藏
        collect:host+'/qaplatform/qa/question/collect',
        //获取用户身份
        IDType:host+'/qaplatform/qa/homePage/mine',
        //验证是否是达人本人
        isMe:host+'/qaplatform/qa/talent/verification',
        comment:host+'/qaplatform/qa/discuss/add',
        userInfo:{
            count:host+'/qaplatform/qa/my/user/init',
            myQuestions:host+'/qaplatform/qa/my/question/list',
            myComment:host+'/qaplatform/qa/my/discuss/list',
            myCollect:host+'/qaplatform/qa/my/collect/list'
        },
		// 搜索页面
		search:host+'/qaplatform/qa/homePage/search',
        //达人-我的
        master:{
            masterInfo:host+'/qaplatform/qa/talent/info',
            myTask:host+'/qaplatform/qa/my/task/list',
            myAnswer:host+'/qaplatform/qa/my/answer/list',
        },
        //达人他的
        masterIndex:{
            masterInfo:host+'/qaplatform/qa/talent/info2',
            answers:host+'/qaplatform/qa/talent/answers',
            collecs:host+'/qaplatform/qa/talent/collects',
        },
//      举报页面
		report:{
			getReportLabel:host+'/qaplatform/qa/question/getReportLabel',
			add:host+'/qaplatform/qa/report/add'
		},
        answer:host+'/qaplatform/qa/answer/submit',
        talentShare:host+'/qaplatform/qa/share/getTalentShareData',
        questionShare:host+'/qaplatform/qa/share/getQuestionShareData'
    }
}
export {host};
export {api};
