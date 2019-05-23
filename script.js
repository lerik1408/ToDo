document.addEventListener('DOMContentLoaded',()=>{
    document.getElementById('add-project').addEventListener('click',(event)=>{
        if(getComputedStyle(document.getElementById('add')).visibility==='visible'){
            document.getElementById('add').style.visibility='hidden';
            document.getElementById('create').style.visibility='hidden';
        }else{
            document.getElementById('add').style.visibility='visible';
            document.getElementById('create').style.visibility='visible';
        }
    });
    let showingButton = document.getElementsByClassName('show-add-task');

    function AddListenerShowingButton(n){
        for(let i = n;i<showingButton.length;i++){
            showingButton[i].addEventListener('click',(event)=>{
                if(showingButton[i]===event.target){
                    if(getComputedStyle(document.getElementsByClassName('wrap-add-task')[i]).display==='none'){
                        document.getElementsByClassName('wrap-add-task')[i].style.display='block'
                    }else{
                        document.getElementsByClassName('wrap-add-task')[i].style.display='none'
                    }  
                } 
            });
        }
    }
    AddListenerShowingButton(0)
    
    let removeSpan = document.getElementsByClassName('del');
    let content =document.getElementById('content');
    function AddLisenerRemoveSpan(n){
        for(let i=n;i<removeSpan.length;i++){
            removeSpan[i].addEventListener('click',(event)=>{
                event.target.parentElement.remove();
            });
            // removeSpan[i].parentElement.remove();
        }
    }
    AddLisenerRemoveSpan(0)

    let classesSetingsCard = {
        firstDiv: {
            col :  "col-12",
            ml  :  "ml-2",
            mt  :  "mt-2",
            card : "card"
        },
        remove: {
            del:'del'
        },
        secondDiv:{
            body : "card-body",
        },
        h4:{
            title : "card-title"
        },
        ul:{
            list_group:"list-group",
            list_group_flush:"list-group-flush"
        },
        li:{
            list_group_item:"list-group-item",
            wrap: "wrap-add-task"
        },
        button:{
            btn:"btn",
            btn_task:"btn-task",
            mb: 'mb-1',
            type: "button"
        },
        input:{
            form: 'form-control',
            task: 'task',
            type: 'text'
        },
        p:{
            show:'show-add-task'
        }
    };
    let CreateCard = {
        firstDiv: () => {
            let div = document.createElement('div');
            div.className = `${classesSetingsCard.firstDiv.col} ${classesSetingsCard.firstDiv.ml} ${classesSetingsCard.firstDiv.mt} ${classesSetingsCard.firstDiv.card}`;
            document.getElementById('content').appendChild(div);
        },
        remove:(i) =>{
            let span = document.createElement('span');
            span.classList = `${classesSetingsCard.remove.del}`;
            span.textContent = '+'
            document.getElementsByClassName('card')[i].appendChild(span)
        },
        secondDiv:(i) => {
            let div = document.createElement('div');
            div.className =`${classesSetingsCard.secondDiv.body}`;
            document.getElementsByClassName('card')[i].appendChild(div)
        },
        h4:(name, i) => {
            let h4 = document.createElement('h4');
            h4.className =`${classesSetingsCard.h4.title}`;
            h4.textContent = `${name}`;
            document.getElementsByClassName('card-body')[i].appendChild(h4);
        },
        ul:(i) => {
            let ul = document.createElement('ul');
            ul.className =`${classesSetingsCard.ul.list_group} ${classesSetingsCard.ul.list_group_flush}`;
            document.getElementsByClassName('card-body')[i].appendChild(ul);
        },
        li:(i,name) => {
            let li = document.createElement('li');
            if(name){
                let p =document.createElement('p')
                p.textContent = `${name}`;
                li.appendChild(p);
            }else{
            li.className=`${classesSetingsCard.li.wrap}`
            }
            li.className+=` ${classesSetingsCard.li.list_group_item}`;
            document.getElementsByClassName('list-group')[i].appendChild(li)
        },
        button:(i)=>{
            let button = document.createElement('button');
            button.className =`${classesSetingsCard.button.btn} ${classesSetingsCard.button.btn_task} ${classesSetingsCard.button.mb}`;
            button.type =`${classesSetingsCard.button.type}`;
            button.textContent='Добавить задачу';
            document.getElementsByClassName('list-group-item')[i].appendChild(button);
        },
        input:(i)=>{
            let input =document.createElement('input');
            input.className=`${classesSetingsCard.input.form} ${classesSetingsCard.input.task}`
            input.type =`${classesSetingsCard.input.type}`;
            document.getElementsByClassName('list-group-item')[i].appendChild(input);
        },
        p:(i)=>{
            let p =document.createElement('p');
            p.className=`${classesSetingsCard.p.show}`;
            p.textContent='Добавить задание';
            document.getElementsByClassName('list-group')[i].appendChild(p);
        }
    };
    let inputTask = document.getElementsByClassName('task');
    let buttonTask = document.getElementsByClassName('btn-task');
    let ul = document.getElementsByClassName('list-group');

    document.getElementById('create').addEventListener('click',()=>{
        let value = document.getElementById('add').value;
        if(value===''){
            alert('Строка не может быть пустой')
        }else{
            const amoutCard = document.getElementsByClassName('card').length
            const amoutli= document.getElementsByClassName('list-group-item').length
            CreateCard.firstDiv();
            CreateCard.remove(amoutCard);
            CreateCard.secondDiv(amoutCard);
            CreateCard.h4(value, amoutCard);
            CreateCard.ul(amoutCard);
            CreateCard.li(amoutCard);
            CreateCard.button(amoutli);
            CreateCard.input(amoutli);
            CreateCard.p(amoutCard);
            AddLisener(buttonTask.length-1);
            AddListenerShowingButton(showingButton.length-1);
            AddLisenerRemoveSpan(removeSpan.length-1);
           
            document.getElementById('add').value='';
        }
    });

  

    let CreateControl ={
        remove : (i) => {
            let remove = document.createElement('span');
            remove.className= 'remove';
            remove.textContent='Удалить';
            ul[i].lastChild.appendChild(remove);
            remove.addEventListener('click',(event)=>{
                let li=event.target.parentNode;
                li.parentNode.removeChild(li);
            });
        },
        done : (i) => {
            let done = document.createElement('span');
            done.className = 'done';
            done.textContent='Заверешено'
            ul[i].lastChild.appendChild(done);
            done.addEventListener('click',(event)=>{
                let p=event.target.parentNode.firstChild;
                if(p.style.opacity!=="0.3"){
                    p.style.opacity="0.3";
                    p.style.textDecoration = "line-through ";
                }else{
                    p.style.opacity="1";
                    p.style.textDecoration = "none ";
                }
            });
        }
    }
     function AddLisener(n){
         for(let i = n;i<buttonTask.length;i++){
            buttonTask[i].addEventListener('click',(event) =>{
                if(buttonTask[i]===event.target&&inputTask[i].value!=''){
                    let text = inputTask[i].value;
                    CreateCard.li(i,text);
                    inputTask[i].value='';
                    CreateControl.remove(i)
                    CreateControl.done(i)
                }
            })
        }
    }
    AddLisener(0);



    
    
})