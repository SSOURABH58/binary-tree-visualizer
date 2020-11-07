import React from 'react'
import { node } from '../algoritheams/binarytreealgos';
import './node.css'


function Node({element,setonnodecreate,onnodecreate,PrintedElement}){
    return(
        // onAnimationEnd={setTreetimeline(addtodisplay(element,Randomarray,Treetimeline,Mapedarray))}
        <div className={element==='NA'?"NAnode":"nodecont"} onAnimationEnd={()=>{
            console.log("before",element,PrintedElement)
            if(PrintedElement[PrintedElement.length-1]==element)
                return setonnodecreate(element)
            console.log(onnodecreate)
        }}>
            <h3 className="nodeval" style={element==='NA'?{display:'none'}:{}}>{element}</h3>
        </div>
    );
}

export default Node