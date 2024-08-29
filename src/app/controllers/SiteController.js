const Course = require('../models/Course');
const {mutipleMongooseToObject} = require('../../util/mongoose');

class SiteController {
    // [GET] /
    index(req, res, next) {
        Course.find({})
        //Sử dụng lean() sau find() với Mongoose
        //kích hoạt lean() này sẽ cho Mongoose bỏ qua việc khởi tạo
        //toàn bộ tài liệu Mongoose và chỉ cung cấp cho bạn POJO.
        //giúp truy vấn nhanh hơn rất nhiều khi sử dụng find().
        // .lean()
        .then((courses) => {
            res.render("home", { 
                courses : mutipleMongooseToObject(courses)
            });
        })
        .catch((error) => {
            next(error);
        });
    }


    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new SiteController();
