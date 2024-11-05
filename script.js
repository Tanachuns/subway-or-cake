

  
const searchHandler = async (searchQuery)=>{
    const data =await (await fetch('./subway_branch_list.json')).json()
    const list = data.filter(item=>item.branch.includes(searchQuery))
    return list
}

const form = document.getElementById("searchForm")
const searchBox = document.getElementById("searchBox")
const searchList = document.getElementById("searchList")
const searchListEscape = document.getElementById("searchListEscape")
const result = document.getElementById("result")
const loadingDot = `<div class="loading-dots">
        <span></span>
        <span></span>
        <span></span>
    </div>`

let index = -1;



searchBox.addEventListener("input",async e=>{
    const searchQuery = e.target.value
    searchList.style.display = "none"
    searchList.innerText = ""
    result.innerHTML=""
    if(searchQuery){
        const list =  await searchHandler(e.target.value)
        if(list.length>0){
            searchList.style.display = "block"
            searchListEscape.style.display = "block"
            index=-1
        }
        list.slice(0,6).forEach(item => {
            const li = document.createElement('li'); 
            li.addEventListener("click",e=>{
                searchBox.value = e.target.innerText
                searchList.innerText = ""
                searchList.style.display = "none"
            })
            li.textContent = item.branch; 
            searchList.appendChild(li);
        });
    }
})

searchBox.addEventListener("keydown",e=>{
    const childList = searchList.children
      if(e.key==="ArrowDown"&&index<childList.length-1){
        index+=1
    }else if(e.key==="ArrowDown"&&index>=childList.length-1){
        index=0
    }
    else if( e.key==="ArrowUp"&&index>0){
        index-=1
    }
    else if( e.key==="ArrowUp"&&index<=0){
        index=childList.length-1
    }
    else if( e.key==="ArrowUp"&&index<=0){
        index=childList.length-1
    }else if (e.key==="Escape"){
        searchList.style.display = "none"
        index=-1
    }
    
    if(childList[index]){
             for (var i = 0; i < childList.length; i++) {
          childList[i].style.background = 'transparent'
        }
        searchBox.value = childList[index].innerText
        childList[index].style.background = '#474747'
    }
    
})


searchListEscape.addEventListener("click",()=>{
     searchList.style.display = "none"
    index=-1
    searchListEscape.style.display = "none"
})

form.addEventListener("submit",(e)=>{
    
    e.preventDefault()
    console.log(e)
       searchList.style.display="none"
        searchList.innerText = ""
        result.innerHTML = loadingDot;
       setTimeout(async ()=>{
        const searchQuery = e.target.searchBox.value
        const list =  await searchHandler(searchQuery)
        list.filter(item=>item.branch==searchQuery)
        console.log(list)
        result.innerHTML = list[0].isValid?"It's a <span class='sub'>Sub</span ><span class='way'>Way</span>.":"It's a Cake.";
       }, 3000);
})
