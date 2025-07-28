import multer from 'multer'
import path from 'path'
import fs from 'fs'

function getFolderByItsMimeType(mimeType){
    if (mimeType.startsWith('image/')) return './uploads/images'
    if (mimeType === 'application/pdf') return './uploads/pdfs' 
    if (mimeType === 'application/msword') return './uploads/docs'
    if (mimeType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.documents') return './uploads/docs'
    if (mimeType === 'application/vnd.ms-excel') return './uploads/excels'
    if (mimeType === 'application/openxmlformats-officedocument.spreadsheet') return './uploads/spreadsheets'
    if (mimeType === 'application/zip') return 'uploads/zips'
    return './uploads/others'
}

const storage = multer.diskStorage({
    destination: function(req, file, cb){
     const dynamicFolder = getFolderByItsMimeType(file.mimetype)
    if (!fs.existsSync(dynamicFolder)){
        fs.mkdirSync(dynamicFolder, {recursive: true})
    }
        cb(null, dynamicFolder)
    },
    filename: function(req,file, cb){
        const dynamicFolder = getFolderByItsMimeType(file.mimetype)
        const filePath = path.join(dynamicFolder, file.originalname)
        if (fs.existsSync(filePath)){
            return cb(new Error('File already exists'), false)
        }
        cb(null, file.originalname)
    }
})

const upload = multer({storage}) 



export default upload