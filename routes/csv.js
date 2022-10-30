const router = require(".");
const { forwardAuthenticated } = require("../config/auth");

router.post("/CRUDcreate", forwardAuthenticated, csvController.create);
router.get("/CRUDread", csvController.read);
router.post("/CRUDupdate", csvController.update);
router.post("/CRUDdelete", csvController.delete);


const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads')
    },
    filename: (req, file, cb) => {
        cb(null. Date.now() + "--" + file.originalname);
    },
});

const upload = multer({ storage: fileStorageEngine });

router.post('/single', upload.single('fileUpload'), (req, res) => {
    console.log('single route');
    console.log('file:'+JSON.stringify(req.file));
    res.send("Single file upload success");
});

router.post("/fileUpload", upload.single('fileCSV'), 
csvController.fileupload);