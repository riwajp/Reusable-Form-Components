const filter=(data,key,type,value)=>{

let filtered_data;


if(value && data){
    const valueExtractor=(obj,nested_key)=>{

        let value=obj;
    
        for(let key of nested_key.split(".")){
        
            value=value[key]
        }
        return(value);
    
    }


    switch(type){
        case "within-date":
            if(value.start && value.end){
            filtered_data=data.filter(d=>new Date(valueExtractor(d,key))>value.start && new Date(valueExtractor(d,key))<value.end) 
            }
            break;
        case "starts-with-multiple":
            if(value.length){
            const reg_exp=new RegExp("^"+value.join("|^"));
            console.log(reg_exp)
            filtered_data=data.filter(d=>reg_exp.test(valueExtractor(d,key)))
            console.log(filtered_data)
            }

        break;

    }

  
}



if(!filtered_data){filtered_data=data}

return filtered_data;

}

export {filter};