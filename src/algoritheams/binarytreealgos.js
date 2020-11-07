
export class node{
    constructor(key){
        this.key=key;
        this.left_childe=undefined;
        this.right_childe=undefined;
    }
} 

export const insertion=(tree,key,arr)=>{
    arr.push([])
    if(tree===undefined){
        let root = new node(key)
        return root
    }else {
        let index = 1
        while(true){
            if(key<tree.key){
                if(tree.left_childe===undefined){
                    tree.left_childe= new node(key)

                    arr[index].push({key,parent:tree.key})
                    return 
                }else tree=tree.left_childe
            }else if(key>tree.key){
                if(tree.right_childe===undefined){
                    tree.right_childe= new node(key)

                    arr[index].push({key,parent:tree.key})
                    return 
                }else tree=tree.right_childe
            }else return
            index++
        }
    }
}

export const triversalgos=(type,tree)=>{
    let triversedArray=[]
//triversing algos =-----------------------------------------
    const triverse=(tree)=>{
        if(tree===undefined){
            return
        }
        triverse(tree.left_childe)
        triversedArray.push(tree.key)
        triverse(tree.right_childe)
    }

//calling based on the type input =-------------------------
    switch (type) {
        case "inorder":
            triverse(tree)
            return triversedArray
    
        default:
            return []
    }
    
}
