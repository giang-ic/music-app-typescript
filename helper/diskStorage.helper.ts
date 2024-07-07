import { Request } from 'express'
import multer, { FileFilterCallback } from 'multer'

type DestinationCallback = (error: Error | null, destination: string) => void
type FileNameCallback = (error: Error | null, filename: string) => void

export const diskStorageHelper = () => {
    const storage = multer.diskStorage({
        destination: (req: Request, file: Express.Multer.File, cb: DestinationCallback): void => {
          cb(null, './public/uploads')
        },
        filename: (req: Request, file: Express.Multer.File, cb: FileNameCallback): void => {
          cb(null, Date.now() + '-' + file.originalname);
        }
    })
    return storage;
}
  