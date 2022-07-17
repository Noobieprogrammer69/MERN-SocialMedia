export const checkimage = (file) => {
    let err=""
    console.log(err)
    if(!file) return err="file not found"
    if(file.size > 5024*5024) return err="file size should be less than 1mb";
    if(file.type !== 'image/jpeg' && file.type !== "image/png") return err="file not supported"
}

export const imageupload = async (images) => {
    let imgArr = []
    for (const item of images) {
        const formData = new FormData();
        if(item.camera) {
            formData.appennd("file", item.camera)
        } else {
            formData.append("file", item)
        }

        formData.append('upload_preset', "bzwm1xwl")
        formData.append('cloud_name', "drircrzo6")

        const res = await fetch('https://api.cloudinary.com/v1_1/drircrzo6/upload', {
            method: "POST",
            body: formData,
        })

        const data = await res.json()
        imgArr.push({public_id:data.public_id, secure_url:data.secure_url})
    }
    return imgArr;
}
