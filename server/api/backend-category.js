var moment = require('moment')
var mongoose = require('../mongoose')
var Category = mongoose.model('Category')
const general = require('./general')

const item = general.item
const modify = general.modify
const recover = general.recover
const deletes = general.deletes

/**
 * 管理时, 获取分类列表
 * @method
 * @param  {[type]} ctx [description]
 * @return {[type]}     [description]
 */
exports.getList = async ctx => {
    try {
        const result = await Category.find().sort('-cate_order').exec()
        ctx.success({
            list: result
        })
    } catch (err) {
        ctx.error(err.toString())
    }
}

exports.getItem = async ctx => {
    await item(ctx, Category)
}

exports.insert = async ctx => {
    var cate_name = ctx.request.body.cate_name,
        cate_order = ctx.request.body.cate_order

    if (!cate_name || !cate_order) {
        ctx.error('请填写分类名称和排序')
    } else {
        try {
            const result = await Category.createAsync({
                cate_name,
                cate_order,
                creat_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                update_date: moment().format('YYYY-MM-DD HH:mm:ss'),
                is_delete: 0,
                timestamp: moment().format('X')
            })
            ctx.success(result._id, '添加成功')
        } catch (err) {
            ctx.error(err.toString())
        }
    }
}

exports.deletes = async ctx => {
    await deletes(ctx, Category)
}

exports.recover = async ctx => {
    await recover(ctx, Category)
}

exports.modify = async ctx => {
    var _id = ctx.request.body.id,
        cate_name = ctx.request.body.cate_name,
        cate_order = ctx.request.body.cate_order,
        update_date = moment().format('YYYY-MM-DD HH:mm:ss')

    await modify(ctx, Category, _id, { cate_name, cate_order, update_date })
}
