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

  const [Randomarray,setRandomarray]=useState([0,0,0,0,0])
  const [Mapedarray,setMapedarray]=useState([])
  const [Treetimeline,setTreetimeline]=useState([])
  const [onnodecreate,setonnodecreate]=useState(-2)
  const [PrintedElement,setPrintedElement]=useState([])


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


  const startManager=()=>{
    setRandomarray(createRandomArray(10))
    setTreetimeline([])
    setPrintedElement([])
    // setTreetimeline(addtodisplay(-1,Randomarray,Treetimeline,Mapedarray))
  }

  useEffect(()=>setMapedarray(createBinaryTree([...Randomarray])),[Randomarray])
  useEffect(()=>{
    setTreetimeline(addtodisplay([...Randomarray],[...Treetimeline],[...Mapedarray],[...PrintedElement]))
  },[onnodecreate])
  // useEffect(()=>setTreetimeline(addtodisplay(-1)),[Randomarray,Mapedarray,Treetimeline])

  //jsx =--------------------------------------------------------------
  return (
    <div className="App">
      <header><h2>Binary Tree Visualizer</h2></header>
      <div className="binarytreecont">
      {Treetimeline.map((lvl,i)=>
        <div className="lvl" key={i}>
          {lvl.map((sect,j)=>
          <div className="section" key={j}>
            <Node 
              element={sect.key}
              setonnodecreate={setonnodecreate}
              onnodecreate={onnodecreate}
              PrintedElement={PrintedElement}
            ></Node>
          </div>
          )}
        </div>
        )}
        </div>
      <div className="dasbord">
        <h4>Dashboard</h4>
        <div className="arrtab">
        {Randomarray.map(element=>
          <h3 className="arrele">{element}</h3>
          )}
        </div>
        <form action="#">
          <input type="text" className="inputbox"/>
        </form>
        <div className="btncont">
          <button  ><h3>Use</h3></button>
          <button ><h3>Add</h3></button>
          <button onClick={()=>startManager()} ><h3>Random</h3></button>
          <button onClick={()=>setTreetimeline(addtodisplay([...Randomarray],[...Treetimeline],[...Mapedarray],[...PrintedElement,-1]))}><h3>Populate</h3></button>
        </div>
      </div>
    </div>
  );
}

export default App;
