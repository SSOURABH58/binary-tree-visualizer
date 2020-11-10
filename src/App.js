//modules imports from React =-------------------------------------
import React,{ useEffect, useState} from 'react'
import './App.css';

//Algos Import =--------------------------------------------------
import {insertion,node,triversalgos} from './algoritheams/binarytreealgos'

//Components Import =----------------------------------------------------
import Node from './components/node'

//Global Varibels =-----------------------------------------
let root = undefined
//functions=------------------------------------------------------
// Functions =-----------------------------------
const createRandomArray=(length)=>{
  let array=[],temp
  for (let index = 0; index < length; index++) {
    temp = (Math.random()*10*length).toFixed()
    if(array.indexOf(temp)==-1)
      array.push(temp)
    else
      index--
  }
  return array
}

const arangeMaping=(arr)=>{
  arr=arr.filter(element=>element.length!==0)
  for (let index = 0; index < arr.length; index++) {
    arr[index].sort((a,b)=>a.key-b.key)
    if(index===0)
        continue
    for (let subindex = 0,parentindex=0; subindex < Math.pow(2,index); subindex+=2,parentindex+=1) {
      arr[index].push({key:'NA',Parent:'NA'})
      if(arr[index][subindex].parent!==arr[index-1][parentindex].key)
        arr[index].splice(subindex,0,{key:'NA',Parent:arr[index-1][parentindex].key},{key:'NA',Parent:arr[index-1][parentindex].key})
      else if(arr[index][subindex].parent!==arr[index][subindex+1].parent)
        if(arr[index][subindex].key<arr[index][subindex].parent)
          arr[index].splice(subindex+1,0,{key:'NA',Parent:arr[index][subindex].parent})
        else
          arr[index].splice(subindex,0,{key:'NA',Parent:arr[index][subindex].parent})
      arr[index].pop()
    }
  }
  return arr
}

const createBinaryTree=(list)=>{
  root=undefined
  let arr=[[{key:list[0]}]]
  root=new node(list[0])
  list.map(element=>insertion(root,parseInt(element),arr))
  arr = arangeMaping(arr)
  return arr
}


// React Function APP =---------------------------------------------------
function App() {

  // States =----------------------------

  const [Randomarray,setRandomarray]=useState([0])
  const [Mapedarray,setMapedarray]=useState([])
  const [Treetimeline,setTreetimeline]=useState([])
  const [onnodecreate,setonnodecreate]=useState(-2)
  const [PrintedElement,setPrintedElement]=useState([])
  const [Inputval,setInputval]=useState("")
  const [Length,setLength]=useState(10)
  const [Zoom,setZoom]=useState(1)
  const [AnimationSpeed,setAnimationSpeed]=useState(.7)


  const addtodisplay=(Randomarray,Treetimeline,Mapedarray,PrintedElement=[])=>{
    if(PrintedElement[0]===-2){
      return []
    }
    let lastelement = PrintedElement[PrintedElement.length-1]
    let nextelement=Randomarray[Randomarray.indexOf(lastelement)+1]
    let arr=[...Treetimeline]
    let isfound=false
    for (let index = 0; index < Mapedarray.length; index++) {
      if(arr.length<index+1){
        arr.push([])
        for (let subindex = 0; subindex < Math.pow(2,index); subindex++) {
          arr[index].push({key:'NA'})
        }
      }
      isfound=false
      PrintedElement.map(elemnt=>{if(elemnt===nextelement)isfound=true})
      if(!isfound){
        for (let subindex = 0; subindex < Mapedarray[index].length; subindex++) {
          if(Mapedarray[index][subindex].key==nextelement )
            {arr[index].splice(subindex,1,Mapedarray[index][subindex])
              setPrintedElement([...PrintedElement,nextelement])
            return arr}
        }
      }
      
    }
    return arr
  }

  const getInput=(inputs,type)=>{
    if(inputs.indexOf(',')===-1)
      inputs = inputs.split(" ")
    else
      inputs = inputs.split(",")
    switch (type) {
      case "use":
        inputs = inputs.filter((item,index)=>inputs.indexOf(item)===index)
        setRandomarray(inputs)
        setTreetimeline([])
        setPrintedElement([])
        break;
      case "add":
        inputs=[...Randomarray,...inputs]
        inputs = inputs.filter((item,index)=>inputs.indexOf(item)===index)
        setRandomarray([...inputs])
        setTreetimeline(addtodisplay([...Randomarray],[...Treetimeline],[...Mapedarray],[...PrintedElement]))
        break;
    
      default:
        break;
    }
  setInputval("")
  }


  const startManager=()=>{
    setRandomarray(createRandomArray(Length))
    setTreetimeline([])
    setPrintedElement([])
  }

  useEffect(()=>setMapedarray(createBinaryTree([...Randomarray])),[Randomarray])
  useEffect(()=>{
    setTreetimeline(addtodisplay([...Randomarray],[...Treetimeline],[...Mapedarray],[...PrintedElement]))
  },[onnodecreate])
  useEffect(()=>{
    let arr = []
    for (let index = 0; index < Length; index++) {
      arr.push(0)
    }
    setRandomarray(arr)},[Length])

  //jsx =--------------------------------------------------------------
  return (
    <div className="App">
      <header><h2>Binary Tree Visualizer</h2></header>
      <div className="visulas" style={{zoom:Zoom}}>
      <div className="binarytreecont">
      {Treetimeline.map((lvl,i)=>
        <div className="lvl" key={i}>
          {lvl.map((sect,j)=>
          <div className="section" key={j}>
            <Node 
              element={sect}
              setonnodecreate={setonnodecreate}
              onnodecreate={onnodecreate}
              PrintedElement={PrintedElement}
              AnimationSpeed={AnimationSpeed}
              lvl={i}
            ></Node>
          </div>
          )}
        </div>
        )}
        </div>
        </div>
      <div className="zoomcont">
        <h6>{`${Zoom}X`}</h6>
        <input type="range" className="range" value={Zoom*65} onChange={e=>setZoom((e.target.value/65).toFixed(2))}/>
      </div>
      <div className="dasbord">
        <h1>Dashboard</h1>
        <div className="arrtab">
        {Randomarray.map((element,i)=>
          <h3 key={i} className="arrele">{element} </h3>
          )}
        </div>
        <h5>{`Random Array Length : ${Length}`}</h5>
        <input type="range" className="range" onChange={e=>setLength((e.target.value/5).toFixed())}/>
        <form action="#" onSubmit={e=>e.target.preventDefault}>
          <input type="text" className="inputbox" value={Inputval} placeholder="ex: 1 2 3 4.. or 1,2,3,4.." onChange={e=>setInputval(e.target.value)}/>
        </form>
        <div className="btncont">
          <button className="btnp" onClick={()=>getInput(Inputval,"use")} ><h2>Use</h2></button>
          <button className="btnp" onClick={()=>getInput(Inputval,"add")} ><h2>Add</h2></button>
          <button className="btnp" onClick={()=>startManager()} ><h2>Random</h2></button>
          <button className="btnq" onClick={()=>setTreetimeline(addtodisplay([...Randomarray],[...Treetimeline],[...Mapedarray],[...PrintedElement]))}><h2>Visualiz</h2></button>
        </div>
        <h5>{`Animation Playback Speed : ${(2.53-AnimationSpeed*1.43).toFixed(2)}x`}</h5>
        <input type="range" className="range" onChange={e=>setAnimationSpeed(((100-e.target.value)*0.0175+0.01).toFixed(2))}/>
      </div>
    </div>
  );
}

export default App;
