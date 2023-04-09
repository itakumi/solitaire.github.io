var query = location.search;
var value = query.split('=');
mode=value[1];
console.log(mode);

if (mode=="spider_easy"){
  TRUMPDATA = {
      card: [
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
      ],
      joker: 0
  }
}else if (mode=="spider_normal") {
  TRUMPDATA = {
      card: [
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'S', count: 13 },
          { type: 'H', count: 13 },
          { type: 'H', count: 13 },
          { type: 'H', count: 13 },
          { type: 'H', count: 13 },
      ],
      joker: 0
  }
}else if (mode=="spider_hard") {
  TRUMPDATA = {
      card: [
          { type: 'S', count: 13 },
          { type: 'H', count: 13 },
          { type: 'C', count: 13 },
          { type: 'D', count: 13 },
          { type: 'S', count: 13 },
          { type: 'H', count: 13 },
          { type: 'C', count: 13 },
          { type: 'D', count: 13 }
      ],
      joker: 0
  }
}else if (mode=="solitaire") {
  TRUMPDATA = {
      card: [
          { type: 'S', count: 13 },
          { type: 'H', count: 13 },
          { type: 'C', count: 13 },
          { type: 'D', count: 13 }
      ],
      joker: 0
  }
}
$(function(){
    function check_distributable(){//山札を1列配ることができるか確認(何もない列がないか確認)
      data = document.querySelector('#coltest');
      flag=true;
      for (let i=0;i<10;i++){
          if (data.children[i].childElementCount==1){
            flag=false;
            break;
          }
      }
      return flag;
    }
    $('#decklist>*').on('click',function(){//山札をクリックしたときのイベント
      //山札を配る
      flag=check_distributable();//山札を配ることができるか判定
      if (flag){
        for (let i=0;i<10;i++){//一列(10枚)配る
          var newhtml=document.createElement('img');
          var selectCard = shuffleCards[0];
          shuffleCards.splice(0, 1);
          newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
          newhtml.src="Cards/"+String(newhtml.id)+".png";
          newhtml.classList.add("card","ui-droppable","rounded");
          data.children[i].append(newhtml);
        }
        draggable_droppable_init();
        $('#decklist :last-child').remove();//山札を一枚消去
      }else{
        alert("カードが無い列があります");
      }
    });
    function trump_init(trumpData) {//トランプの初期化
        var cards=[];
        for (let i=0;i<trumpData['card'].length;i++) {//通常カード追加
            var thistype=trumpData['card'][i];
            for (let j=0;j<thistype['count'];j++) {
                cards.push({
                    type: thistype['type'],
                    number: j+1
                });
            }
        }
        for (var i=0;i<trumpData['joker'];i++) {//joker追加
            cards.push({
                type: 'joker',
                number: i+1
            });
        }
        return cards;
    }
    function sort_at_random(arrayData) {//トランプのシャッフル
        var arr=arrayData.concat();
        var arrLength=arr.length;
        var randomArr=[];
        for(let i=0;i<arrLength;i++) {
            var randomTarget=Math.floor(Math.random()*arr.length);// 0～countArrの個数 の範囲から、数値をランダムに抽出
            randomArr[i]=arr[randomTarget];// randomArrに数値を格納
            arr.splice(randomTarget, 1);// 同じ数値を再度使わないように、今回使った数値をcountArrから削除しておく
        }
        return randomArr;
    }
    var ORIGINALCARDDATA = trump_init(TRUMPDATA);
    var shuffleCards = sort_at_random(ORIGINALCARDDATA);
    function getmaxval(html){//連続している最大値を取得
      var tmp=html;
      ans=html.id;
      while(true){
        if (tmp.previousElementSibling==null){
          break;
        }else{
          if ((tmp.id[0]==tmp.previousElementSibling.id[0]) && (Number(tmp.id.substr(2))+1==Number(tmp.previousElementSibling.id.substr(2)))){
            tmp=tmp.previousElementSibling;
            ans=tmp.id;
          }else{
            break;
          }
        }
      }
      return ans.substr(2);
    }
    function getminval(html){//連続している最小値を取得
      var tmp=html;
      ans=html.id;
      while(true){
        if (tmp.nextElementSibling==null){
          break;
        }else{
          if ((tmp.id[0]==tmp.nextElementSibling.id[0]) && (Number(tmp.id.substr(2))-1==Number(tmp.nextElementSibling.id.substr(2)))){
            tmp=tmp.nextElementSibling;
            ans=tmp.id;
          }else{
            break;
          }
        }
      }
      return ans.substr(2);
    }
    function init(){//最初にカードを配る関数
      var data = document.querySelector('#coltest');
      for (let i=0;i<6;i++){//54枚配る
        for (let j=0;j<10;j++){
          var newhtml=document.createElement('img');
          var selectCard = shuffleCards[0];
          shuffleCards.splice(0, 1);
          newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
          if (i==5){//1行は表向き
            newhtml.src="Cards/"+String(newhtml.id)+".png";
          }else{
            newhtml.src="Cards/back.png";
          }
          newhtml.classList.add("card","ui-droppable","rounded");
          data.children[j].append(newhtml);
          if (i==4 && j==3){
            break;
          }
        }
      }
    }
    init();
    draggable_droppable_init();
    function draggable_droppable_init(){//draggableとdroppableを対象のカードのみ有効化する関数
      $(".dummy").droppable().droppable("disable");
      $("#coltest>*>img").droppable().droppable("disable");
      $("#coltest>*>img").draggable().draggable("disable");
      $("#coltest :last-child").droppable().droppable("enable");

      $("#coltest>*>*").draggable({
        appendTo: "body",
        cancel: ".dummy",
        cursor: "move",
        drag: function(event, ui) {//連続しているカードを一緒に移動する
            targets.forEach((elem, index) => {
              $(elem).css(ui.position);
            });
        },
        start: function(event,ui){
          targets=[ui.helper[0]];
          var id = ui.helper[0].id;
          for (const target of $(ui.helper[0]).nextAll($(this))){//連続しているカード情報を一時保存
            if ((id[0]==target.id[0]) && (Number(id.substr(2))-1==Number(target.id.substr(2)))){
              targets.push(target);
              id=target.id;
            }
          }
          var a=10;
          targets.forEach((elem, index) => {//連続しているカードの表示優先度を調整
            $(elem).css("z-index", a++);
          });
        },
        stop: function(event, ui){
          targets.forEach((elem, index) => {//ドラッグを放したら設定を元に戻す
            elem.style["z-index"]=null;
            elem.style.top=null;
            elem.style.left=null;
          });
        },
        snap: true,
        snapMode: "outer",
      });
      $("#coltest>*>*").droppable({
        accept:"#coltest>*>*",
        drop: function(event,ui){
          if (event.target.id=="dummy"){
            if (true){//スパイダーソリティアは13でなくても一番上における
              var lasthtml=ui.helper[0].previousElementSibling;
              if (lasthtml!=null && lasthtml.id!="dummy"){
                if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){//元の場所の上のカードが裏なら開く
                  lasthtml.src="Cards/"+lasthtml.id+".png";
                }
              }
              targets.forEach((elem, index) => {//カード移動
                elem.classList.add("card");
                event.target.parentElement.append(elem);
              });
              draggable_droppable_init();
            }
          }
          if (Number(ui.draggable[0].id.substr(2))+1==Number(event.target.id.substr(2))){//カードを移動できるかの判定
            var lasthtml=ui.helper[0].previousElementSibling;
            if (lasthtml!=null && lasthtml.id!="dummy"){
              if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){//元の場所の上のカードが裏なら開く
                lasthtml.src="Cards/"+lasthtml.id+".png";
              }
            }
            targets.forEach((elem, index) => {//カード移動
              elem.classList.add("card");
              event.target.parentElement.append(elem);
            });
            draggable_droppable_init();
            currenthtml=ui.helper[0];
            if(getmaxval(currenthtml)==13 && getminval(currenthtml)==1){//移動後1～13まで揃っているかの判定
              currenthtml=currenthtml.parentElement.lastElementChild;
              type=currenthtml.id[0];
              for (let i=1; i<=13; i++){//連続している1～13までのカードを削除
                currenthtml=currenthtml.previousElementSibling;
                currenthtml.nextElementSibling.remove();
              }
              currenthtml.src="Cards/"+currenthtml.id+".png";
              var completehtml=document.createElement('img');
              bottom=document.getElementById("completecard");
              completehtml.id="complete";
              completehtml.src="Cards/"+type+"_13.png";
              completehtml.classList.add("complete","rounded");
              bottom.append(completehtml);//complete cardを追加
              draggable_droppable_init();
            }
          }else{
            targets.forEach((elem, index) => {//移動できない場合は元に戻す
              elem.style["z-index"]=null;
              elem.style.top=null;
              elem.style.left=null;
            });
          }
        }
      });
      //対象の位置のdraggableを有効化
      data = document.querySelector('#coltest');
      for (let i=0; i<data.childElementCount; i++){//全ての列を見て回る
        var lasthtml=data.children[i].children[data.children[i].childElementCount-1];
        $(lasthtml).draggable("enable");//最後の要素のdraggableは必ず有効
        for (let j=data.children[i].childElementCount-2;  j>0; j--){//各列のカードを後ろから見る
          if ((lasthtml.id[0]==data.children[i].children[j].id[0]) && (Number(lasthtml.id.substr(2))+1==Number(data.children[i].children[j].id.substr(2)))){//連続している時
            $(data.children[i].children[j]).draggable("enable");//そのカードもdraggableを有効化
            lasthtml=data.children[i].children[j];//ずらして再び戻る
          }else{
            break;
          }
        }
      }
    }
});
