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
    for(let i = 0;i<showingButton.length;i++){
        showingButton[i].addEventListener('click',(event)=>{
            if(showingButton[i]===event.target){
                if(getComputedStyle(document.getElementsByClassName('wrap-add-task')[i]).visibility==='visible'){
                    document.getElementsByClassName('wrap-add-task')[i].style.visibility='hidden'
                }else{
                    document.getElementsByClassName('wrap-add-task')[i].style.visibility='visible'
                }  
            } 
        });
    }

    let classesSetingsCard = {
        firstDiv: {
            col :  "col-5",
            ml  :  "ml-2",
            mt  :  "mt-2",
            card : "card"
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
            list_group_item:"list-group-item"
        },
        input:{
            classSetings:{
                form:"form-control",
                task : "task",
                display: 'd-none'
            },
            typeSetings:{
                type: "text"
            }
        }
    };
    let CreateCard = {
        firstDiv: () => {
            let div = document.createElement('div');
            div.className = `${classesSetingsCard.firstDiv.col} ${classesSetingsCard.firstDiv.ml} ${classesSetingsCard.firstDiv.mt} ${classesSetingsCard.firstDiv.card}`;
            document.getElementById('content').appendChild(div);
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
                li.textContent = `${name}`
            }
            li.className =`${classesSetingsCard.li.list_group_item}`;
            document.getElementsByClassName('list-group')[i].appendChild(li)
        },
        p:(i) => {
            let p = document.createElement('p');
            p.textContent = 'Добавить задачу';
            document.getElementsByClassName('list-group-item')[i].appendChild(p)
        },
        input:(i)=>{
            let input = document.createElement('input');
            input.className =`${classesSetingsCard.input.classSetings.form} ${classesSetingsCard.input.classSetings.task} ${classesSetingsCard.input.classSetings.display}`;
            input.type = `${classesSetingsCard.input.typeSetings.type}`;
            document.getElementsByClassName('list-group-item')[i].appendChild(input);
        }
    };
    document.getElementById('create').addEventListener('click',()=>{
        let value = document.getElementById('add').value;
        const amoutCard = document.getElementsByClassName('card').length
        const amoutli= document.getElementsByClassName('list-group-item').length
        CreateCard.firstDiv();
        CreateCard.secondDiv(amoutCard);
        CreateCard.h4(value, amoutCard);
        CreateCard.ul(amoutCard);
        CreateCard.li(amoutCard);
        CreateCard.p(amoutli);
        CreateCard.input(amoutli);
        document.getElementById('add').value='';
    });

    let inputTask = document.getElementsByClassName('task');
    let buttonTask = document.getElementsByClassName('btn-task');
    let ul = document.getElementsByClassName('list-group');
    // let li =document.getElementsByClassName('list-group-item')

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
                let li=event.target.parentNode;
                // li.style.background="black";
                if(li.style.background==='grey'){
                    li.style.background='white'
                }else{
                    li.style.background="grey"
                }
            });
        }
    }


    for(let i = 0;i<buttonTask.length;i++){
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
 
})