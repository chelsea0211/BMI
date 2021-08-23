let BMIDataAry = JSON.parse(localStorage.getItem('BMIData')) || [];

const bHeight = document.querySelector('.bodyHeight');
const bWeight = document.querySelector('.bodyWeight');
const btn = document.querySelector('.seeResult');
const emptyHeight = document.querySelector('.emptyHeight');
const emptyWeight = document.querySelector('.emptyWeight');
const recordL = document.querySelector('.recordList');
const recordLi = document.querySelector('.recordList li');
const del = document.querySelector('.recordList .del');
const refresh = document.querySelector('.refreshBtn');
bHeight.addEventListener('blur',checkData,false);
bWeight.addEventListener('blur',checkData,false);
btn.addEventListener('click',calculate,false);
recordL.addEventListener('click',delThisData,false);
refresh.addEventListener('click',deleteInput,false);

//渲染網頁
allBMIData();

function checkData() {
    
     if (bHeight.value == '')
      { emptyHeight.classList.remove('hidden');}
    else
      {  emptyHeight.classList.add('hidden');} 
    
     if (bWeight.value == '')
      {  emptyWeight.classList.remove('hidden');}
     else 
     {  emptyWeight.classList.add('hidden');} 

}
function calculate(){
    if (bHeight.value != '' && bWeight.value != '')
    {    
        CalculateBMI();
      
    }

    
}

function CalculateBMI() {
    
    let cm = bHeight.value;
    let kg = bWeight.value;
    let BMI = kg/(cm/100)**2;
        BMI  = BMI.toFixed(2);
    
    let yyyy = new Date().getFullYear();
    let mm = new Date().getMonth()+1;
    let dd = new Date().getDate();
    if (mm < 10) {
        mm = '0'+mm; 
    }
    if (dd < 10) {
        dd = '0'+ dd; 
    }

    let today = `${mm}-${dd}-${yyyy}`;
    
    
    let obj = { 
        result: '',
        bmi: BMI,
        w : kg+'kg',
        h : cm+'cm',
        date : today,
        class : ''
    };
    
    if (BMI < 18.5)
    {
        obj.result = "過輕";
        obj.class =  "underWeight-";
    }
    else if (BMI >=18.5 && BMI < 25)
    {
        obj.result = "正常";
        obj.class =  "ideal-";
    }
    else if (BMI >=25 && BMI < 30)
    {
        obj.result = "過重";
        obj.class =  "overWeight-";
    }
    else if (BMI >=30 && BMI < 35)
    {
        obj.result = "輕度肥胖";
        obj.class =  "lightFat-";
    }
    else if (BMI >=35 && BMI < 40)
    {
        obj.result = "中度肥胖";
        obj.class =  "lightFat-";
    }
    else if (BMI >=40 )
    {
        obj.result = "嚴重肥胖";
        obj.class =  "heavyFat-";
    }
    
    let status = document.querySelector('.status');
    
    document.querySelector('.status h3').textContent = BMI;
    document.querySelector('.statusText').textContent = obj.result;
    btn.style.display = 'none';
    status.style.display = 'flex';
  
    refresh.classList.add(`${obj.class}bg`);
    status.classList.add(`${obj.class}fc`);
    
    obj.class += 'bc';
  
    BMIDataAry.push(obj);
    allBMIData();
    localStorage.setItem('BMIData',JSON.stringify(BMIDataAry));
}

//渲染網頁
 function allBMIData() {
   
    let str = '';
  
    for (let i=0;i<BMIDataAry.length;i++)
    {
        
        str += `<li class="${BMIDataAry[i].class} box"><h3>${BMIDataAry[i].result}</h3>   
            <small>BMI</small><span>${BMIDataAry[i].bmi}</span>
            <small>Weight</small><span>${BMIDataAry[i].w}</span>
            <small>Height</small><span>${BMIDataAry[i].h}</span>
            <small>${BMIDataAry[i].date}</small>
            <a href="*" class="del"><i class = "fas fa-trash-alt" data-num = "${i}"></i></a>
        </li>`
    }
    recordL.innerHTML =str;
} 
function deleteInput(e){
   
   e.preventDefault();
   
    bHeight.value = '';
    bWeight.value = '';
    btn.style.display = 'block';
    let status = document.querySelector('.status');
    status.style.display = 'none';
}


function delThisData(e){
    if (e.target.nodeName != 'I')
        return;
    e.preventDefault();
    BMIDataAry.splice(e.target.dataset.num,1);
    allBMIData();
    localStorage.setItem('BMIData',JSON.stringify(BMIDataAry));
}
