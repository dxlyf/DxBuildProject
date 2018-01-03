var Generator=require('../util/baseGenerators');

module.exports=class extends Generator
{
    prompting()
    {
        return this.prompt([{
                type:"input",
                name:"taskName",
                message:"任务名称",
                default:"",
                filter(val)
                {
                    return String(val).trim();
                },
                validate(val)
                {
                    return val==''?'请输入任务名称':true;
                }

        },{
            type:"list",
            name:"taskType",
            choices:['babel','typescript'],
            message:"任务类型",
            default:0,
            validate(val)
            {
                return val==''?'请选择任务类型':true;
            }
        }]);
    }

}