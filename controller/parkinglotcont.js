const mongoose =require("mongoose");
const Parkinglot = require("../models/parkinglot");

exports.addParkinglot=(req, res)=>{
    console.log("adding location")
    const parkinglot = new Parkinglot({
        parkinglot_name:req.body.parkinglot_name,
        l_name:req.body.l_name,
        latitiude:req.body.latitiude,
        longtitude:req.body.longtitude,
        total_space:req.body.total_space,
        price:req.body.price,
        security_detail:req.body.security_detail,
        remaining_space:req.body.remaining_space,
    });
    parkinglot.save()
            .then(()=>{
                console.log("the parking is registerd")
                res.status(200).json(parkinglot);
            })
            .catch((err) => {
                res.status(400).json({msg:err});
                console.log(err)
            })
}
exports.findAllparkinglots=(req, res)=>{
    Parkinglot.find({}, (err, result) => {
        if (err) res.status(500).json({ msg: err });
        res.json({
            data: result,
        });
    });
}
exports.findParkinglotbylocation=(req,res)=>{
    Parkinglot.findOne({l_name:req.params.l_name},
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
                data:result,
            };
            return res.json(msg);
        });
}

exports.findAParkinglot=(req,res)=>{
    Parkinglot.findOne({parkinglot_name:req.params.parkinglot_name},
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
                data:result,
            };
            return res.json(msg);
        });
}
exports.updateParkinglot=(req,res)=>{
    Parkinglot.findOneAndUpdate({ parkinglot_name:req.params.parkinglot_name },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
                data:result,
            };
            return res.json(msg);
        });
}

exports.deleteParkinglot = (req, res) => {
    Parkinglot.findOneAndDelete({ parkinglot_name:req.params.parkinglot_name },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
               data:result
            };
            return res.json(msg);
        });
}