import Cloudinary from "cloudinary"

const cloudinary = Cloudinary.v2



const cloudinaryConnect = () => {
    cloudinary.config({
        cloud_name: "dzvgcx6gi",
        api_key: "138515198932395",
        api_secret: "IN3B9Nu_91g_XLb52YbOzcAdpFU"

    })

}



export { cloudinaryConnect }

