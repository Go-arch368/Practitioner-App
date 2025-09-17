export const formatSSN = (value:string) : string =>{
    const raw = value.replace(/\D/g,"").slice(0,9)
    if(raw.length<=3) return raw;
    if(raw.length<=5) return `${raw.slice(0,3)}-${raw.slice(3)}`;
    return `${raw.slice(0,3)}-${raw.slice(3,5)}-${raw.slice(5)}`
}