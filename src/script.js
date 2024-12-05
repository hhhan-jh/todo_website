const listEl = document.getElementById('list');
const btnCreateEl = document.getElementById('btn_create');

//item object의 정보들을 넣을 공간
let todos = [];

btnCreateEl.onclick = createTodo;

function createTodo(){
    const item = createItemData(); //정보 생성
    const elem = createItemElem(item); //요소 생성
    addEventListener(item, elem);
    listEl.prepend(elem.itemEl); //리스트의 최상단에 삽입

    //바로 내용 편집
    elem.inputEl.removeAttribute('disabled');
    elem.inputEl.focus();
}

//새로운 item object의 정보 생성
function createItemData(){
    const itemData = {
        id: new Date().getTime(), //유니크한 숫자값 받기
        text: '', //할일
        isFinish: false //완수 여부
    }

    //해당 정보를 todos 배열 처음에 추가
    todos.unshift(itemData);

    return itemData;
}

//새로운 item object의 요소 생성
function createItemElem(item){
    //요소 생성
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    const chkboxEl = document.createElement('input');
    chkboxEl.classList.add("chk_box");
    chkboxEl.type = 'checkbox';
    if(item.isFinish) itemEl.classList.add('finished');

    const inputEl = document.createElement('input');
    inputEl.classList.add("txt_box");
    inputEl.type = 'text';
    inputEl.value = item.text;
    inputEl.setAttribute('disabled', '');

    
    const actionsEl = document.createElement('div');
    actionsEl.classList.add('actions');

    const btnEditEl = document.createElement('button');
    btnEditEl.classList.add('material_icons', 'btn_edit');
    btnEditEl.innerText = 'edit';

    const btnRemoveEl = document.createElement('button');
    btnRemoveEl.classList.add('material_icons', 'btn_remove');
    btnRemoveEl.innerText = 'remove';

    //요소끼리 연결
    itemEl.append(chkboxEl);
    itemEl.append(inputEl);
    itemEl.append(actionsEl);
    actionsEl.append(btnEditEl);
    actionsEl.append(btnRemoveEl);

    
    

    return {itemEl, inputEl, chkboxEl, btnEditEl, btnRemoveEl};
}

function addEventListener(item, elem){
    //이벤트 리스너 달기
    elem.chkboxEl.addEventListener('change', ()=>{
        item.isFinish = elem.chkboxEl.checked;

        if(item.isFinish) {
            elem.itemEl.classList.add('finished');
            elem.inputEl.classList.add('finished');
        }
        else {
            elem.itemEl.classList.remove('finished');
            elem.inputEl.classList.remove('finished');
        }
    })
    elem.inputEl.addEventListener('input', ()=>{
        item.text = elem.inputEl.value;
    })
    elem.inputEl.addEventListener('blur', ()=>{
        elem.inputEl.setAttribute('disabled', '');
    })
    elem.btnEditEl.addEventListener('click', ()=>{
        elem.inputEl.removeAttribute('disabled');
        elem.inputEl.focus();
    })
    elem.btnRemoveEl.addEventListener('click', ()=>{
        todos = todos.filter(t=>t.id != item.id); //해당 todo 제외한 리스트 반환
        elem.itemEl.remove(); //요소 삭제  
    })
}