
export default function ImageValidator(e) {
    let { files } = e.target
    if (files.length === 0) {
        return "Image field is Mendatory"
    }
    else if (files.length === 1) {
        let file = files[0]
        if (file.size > 1048576)
            return "File size is above 1MB, Please Upload a file upto 1MB"
        else if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/webp" || file.type === "image/gif") {
            return ''
        }
        else
            return "Invalid Image. Please upload .jpeg .jpg .png .webp .gif Format"

    }
    else {
        var errorMsg = []
        Array.from(e.target.files).forEach((file, index) => {
            if (file.size > 1048576) {
                errorMsg.push(`Pic ${index + 1} Size is Too High. Please Upload a file upto 1MB`)
            }
            else if (file.type === "image/jpeg" || file.type === "image/jpg" || file.type === "image/png" || file.type === "image/webp" || file.type === "image/gif");
            else
                errorMsg.push(`Invalid Image ${index + 1}. Please upload .jpeg .jpg .png .webp .gif Format `)
        })
        return errorMsg.length === 0?"":errorMsg.toString()
    }
}
