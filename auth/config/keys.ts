import {prod} from "./prod";
import {dev} from "./dev";

let keys :typeof  prod | typeof dev
if (process.env.NODE_ENV==='production'){
     keys = prod


}else{
     keys =dev
}

export {keys}


