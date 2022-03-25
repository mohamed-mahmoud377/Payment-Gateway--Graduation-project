import {prod} from "./prod";
import {dev} from "./dev";

let keys1 :typeof  dev
let keys2 :typeof prod
if (process.env.NODE_ENV==='production'){
     keys2  = (prod )as typeof prod


}else{
     keys1 =(dev) as typeof dev
}




