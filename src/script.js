const listEl = document.getElementById('list');
const btnCreateEl = document.getElementById('btn_create');

//item object의 정보들을 넣을 공간
let todos = [];
loadData();
displayTodos();

btnCreateEl.onclick = createTodo;

//btnCreateEl 눌렸을때: 새로운 item object 만들기
function createTodo(){
    const data = createItemData(); //정보 생성
    const elem = createItemElem(data); //요소 생성
    addEventListener(data, elem);
    listEl.prepend(elem.itemEl); //리스트의 최상단에 삽입

    //바로 내용 편집
    elem.inputEl.removeAttribute('disabled');
    elem.inputEl.focus();

    saveData(); //생성 update
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

//새로운 item object의 요소 각각에 이벤트 리스너 달기
function addEventListener(item, elem){
    
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
        saveData(); //수정 update
    })
    elem.btnEditEl.addEventListener('click', ()=>{
        elem.inputEl.removeAttribute('disabled');
        elem.inputEl.focus();
    })
    elem.btnRemoveEl.addEventListener('click', ()=>{
        todos = todos.filter(t=>t.id != item.id); //해당 todo 제외한 리스트 반환
        elem.itemEl.remove(); //요소 삭제  
        saveData(); //삭제 update
    })
}

//새로고침해도 유실되지 않게 로컬영역에 데이터 저장
function saveData(){
    const data = JSON.stringify(todos); //todos를 string화해서 JSON 변환
    window.localStorage.setItem('my_todos', data);
}

//로컬영역의 데이터 불러오기
function loadData(){
    const data = localStorage.getItem('my_todos');

    if(data){
        todos = JSON.parse(data); //JSON string을 object로 변환
    }
}

//todos의 데이터 보여주기
function displayTodos(){
    for(let i =0; i<todos.length; i++){
        const data = todos[i];
        const elem = createItemElem(data);
        addEventListener(data, elem);
        listEl.prepend(elem.itemEl); //리스트의 최상단에 삽입
    }
}