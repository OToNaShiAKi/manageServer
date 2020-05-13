import List from "./../models/List";

const timeHandle = (list, lists) => {
  for (let item of lists)
    if (list.startTime <= item.endTime && list.endTime >= item.startTime) {
      if (item.repeat.length) {
        if (list.repeat.length) {
          for (let week of list.repeat)
            if (item.repeat.includes(week)) throw {
              status: -1,
              message: `周${week}该时间段冲突`
            }
        } else if (list.day.length)
          for (let day of list.day) {
            const week = new Date(day).getDay();
            if (item.repeat.includes(week)) throw {
              status: -1,
              message: `${day}该时间段冲突`
            }
          }
      } else if (item.day.length) {
        if (list.repeat.length) {
          for (let day of item.day) {
            const week = new Date(day).getDay();
            if (list.repeat.includes(week)) throw {
              status: -1,
              message: `周${week}该时间段冲突`
            }
          }
        } else if (list.day.length)
          for (let day of list.day)
            if (item.day.includes(day)) throw {
              status: -1,
              message: `${day}该时间段冲突`
            }
      }
    }
}

class ListController {
  GetList(req, res, next) {
    List.find({
      enable: true
    }).then(lists => {
      res.json({
        status: 200,
        message: "获取列表成功",
        lists
      })
    }).catch((err) => next(err));
  }
  EditList(req, res, next) {
    let list = req.body;
    List.findById(list._id).then(find => {
      if (find) {
        delete list._id;
        for (let key in list)
          find[key] = list[key];
        list = find;
      } else list = new List(list);
      return List.find({
        house: list.house,
        enable: true,
        _id: { $ne: list._id }
      }, '-_id repeat day startTime endTime')
    }).then(lists => {
      if (lists.length)
        timeHandle(list, lists);
      list.enable = true;
      return list.save();
    }).then(list => {
      res.json({
        status: 200,
        message: "编辑借用记录成功",
        _id: list._id
      })
    }).catch(err => next(err));
  }
  async MoveList(req, res) {
    let flag = true;
    for (let _id of req.body.listId) await List.updateOne({
      _id
    }, {
      enable: false
    }).catch((err) => {
      flag = false;
    })
    if (flag) res.json({
      status: 200,
      message: '停用记录成功'
    })
    else res.json({
      status: -1,
      message: '部分记录停用失败，请刷新重试'
    })
  }
  HistoryList(req, res, next) {
    List.find({
      enable: false,
      adminId: req.params.adminId || req.session.adminId
    }).then(history => {
      if (history.length) res.json({
        status: 200,
        message: "获取列表成功",
        history
      })
      else res.json({
        status: -1,
        message: "列表尚无数据",
      })
    }).catch(err => next(err))
  }
  async StartList(req, res, next) {
    let flag = true;
    let list = {}
    for (let _id of req.body.listId) await List.findById(_id).then(find => {
      list = find;
      return List.find({
        house: list.house,
        enable: true,
        _id: {
          $ne: list._id
        }
      }, '-_id repeat day startTime endTime')
    }).then(lists => {
      if (lists.length)
        timeHandle(list, lists);
      list.enable = true;
      return list.save();
    }).catch(() => {
      flag = false;
    })
    if (flag) res.json({
      status: 200,
      message: '启用记录成功'
    })
    else res.json({
      status: -1,
      message: '部分记录启用失败，请刷新重试'
    })
  }
}

export default new ListController();