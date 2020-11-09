import React, { useState } from 'react'
import { node } from '../algoritheams/binarytreealgos';
import './node.css'

function Node({element,setonnodecreate,PrintedElement,AnimationSpeed,lvl}){
    const [ishover,setishover]=useState(false)
    return(
        <div className={element.key==='NA'?"NAnode":"nodecont"} 
        style={{height:`${element.key==='NA'?20-lvl:100-10*lvl}px` ,
                width:`${element.key==='NA'?20-lvl:100-10*lvl}px`,
                fontSize:`${2-.2*lvl}rem`,minHeight:`${element.key==='NA'?5:30}px`,
                minFontSize:`1rem`,
                minWidth:`${element.key==='NA'?5:30}px`,
                animationDuration: `${AnimationSpeed}s`,
                animationDelay: ``}}
        onAnimationEnd={e=>{
            if(PrintedElement[PrintedElement.length-1]==element.key)
                return setonnodecreate({key:element.key})
        }}
        onMouseEnter={()=>setishover(!ishover)}
        onMouseLeave={()=>setishover(!ishover)}
        >
            <h6 className="nodeval" 
            style={element.key==='NA'||!ishover?{display:'none'}:element.key<element.parent?{color:"rgb(105, 126, 187)"}:{color:"rgb(202, 96, 96)"}} 
            >{element.parent}</h6>
            <h3 className="nodeval" 
            style={element.key==='NA'?{display:'none'}:{}} 
            >{element.key}</h3>
        </div>
    );
}

export default Node