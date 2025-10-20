export const validateUrl = (name)=>{
    const Url = name?.toString().replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-")
    return Url
}