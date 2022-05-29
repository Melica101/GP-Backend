const mongoose =require("mongoose");
const Reviews =require("../models/reviews");

exports.addreview=(req, res)=>{
    console.log("adding review")
    const reviews = new Reviews({
        comment:req.body.comment,
        rating:req.body.rating,
    });
    reviews.save()
            .then(()=>{
                console.log("the review is registerd")
                res.status(200).json(reviews);
            })
            .catch((err) => {
                res.status(400).json({msg:err});
                console.log(err)
            })
}

exports.findAllreviews=(req, res)=>{
    Reviews.find({}, (err, result) => {
        if (err) res.status(500).json({ msg: err });
        res.json({
            data: result,
        });
    });
}

exports.deletereviews = (req, res) => {
    Reviews.findOneAndDelete({ rating:req.params.rating },
        (err, result) => {
            if (err) return res.status(500).json({ msg: err });
            const msg = {
               msg: "deleted",
               rating: req.param.rating,
            };
            return res.json(msg);
        });
}
