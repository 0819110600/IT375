const Tours = require('./../models/tourModel');
exports.getAllTours = async(req,res) => {
    try {
        const tours = await Tours.find();
        res.status(200).json({
        status:'success',
        results: tours.length,
        data: {tours}
        });
        }catch (err){
        res.status(404).json({
        status: 'fail',
        message: err
        });
   }
};
exports.getOneTour = (req, res) => {
    try{
        const toursId = parseInt(req.params.id);
        const tours = await Tours.findOne({id: toursId});
        if(tours){
        res.status(200).json({
        status:'success',
        data: {tours}
        });
        }else{
        res.status(404).json({
        status:'fail',
        message: 'no id found'
        });
        }
        }catch(err){
        res.status(404).json({
        status:'fail',
        message: err
        });
        
        }
};
exports.createNewTour = (req,res) => {
    try{
        
         let currentToursId = await Tours.find({}).sort({id: -1}).limit(1).then((lastTours) => {
             return lastTours[0].id
     
         });
         currentToursId += 1;
     const createNewTour = {
     id: currentToursId,
     ...req.body
     };
     const createNewTour = await Tours.create(createNewTour);
     res.status(201).json({
     status:'success',
     data: {tours: createNewTour}
     });
         }catch(err){
         res.status(400).json({
         status:'fail',
         message: err
         });
         
         }
};
exports.updateTour = (req,res) => {
    try{
        const toursId = parseInt(req.params.id);
        const tours = await Tours.findOneAndUpdate({id: toursId},req.body,{
        new: true,
        runValidators: true
        });
        if(tours){
        res.status(200).json({
        status:'success',
        data: {tours}
        });
        }else{
        res.status(404).json({
        status:'fail',
        message: 'no id found'
        });
        }
        }catch(err){
        res.status(404).json({
        status: 'fail',
        message: err
        });
        }
};
exports.deleteTour = (req,res) => {
    try{
        const toursId = parseInt(req.params.id);
        const tours = await Tours.findOneAndDelete({id: parseInt(toursId)});
        if(tours){
        res.status(200).json({
        status:'success',
        data: null
        });
        }else{
        res.status(404).json({
        status:'fail',
        message: 'no id found'
        });
        }
        }catch(err){
        res.status(404).json({
        status: 'fail',
        message: err
        });
        
        }
};