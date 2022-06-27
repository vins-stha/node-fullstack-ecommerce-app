
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];

export const dateCreated = () =>{
    let date = new Date();
    let dd = date.getDate();
    let mm =  month[date.getMonth()];
    let yy = date.getFullYear();

    return ( dd + " " + mm + "," + yy);
};


