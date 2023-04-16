var query = location.search;
var value = query.split('=');
mode=value[1];

if (mode=="solitaire") {//カードの枚数を定義
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
    currentdeck=0;
    $('#deck').on('click',function(){
      if (currentdeck==shuffleCards.length){//山札を出し切ったとき
        while($("#oneofdeck")[0].children.length!=1) $("#oneofdeck")[0].removeChild($("#oneofdeck")[0].lastElementChild);//山札から出したカードを全て削除
        currentdeck=-1;
      }
      if (currentdeck==-1){//全て出した状態から始めの状態に戻る
        if (shuffleCards.length>1) $(this)[0].src="Cards/back.png";
        currentdeck++;
        return;
      }
      document.getElementById('audio_drawcard').currentTime = 0; //連続クリックに対応
      document.getElementById('audio_drawcard').play(); //クリックしたら音を再生
      var newhtml=document.createElement('img');//新しいimg要素の定義
      newhtml.id=String(shuffleCards[currentdeck]['type'])+"_"+String(shuffleCards[currentdeck]['number']);
      newhtml.classList.add("card","oneofdeck","oneofdeckcard");
      newhtml.src="Cards/"+String(newhtml.id)+".png";
      $("#oneofdeck").append(newhtml);//山札の右に画像を1枚のせる
      currentdeck++;
      if (currentdeck==shuffleCards.length){//山札から全て出し切ったときに裏になっている札を削除
        $("#deck")[0].removeAttribute("src");
      }
      draggable_droppable_init()
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
    function init(){
      document.getElementById('audio_distributecard').currentTime = 0; //連続クリックに対応
      document.getElementById('audio_distributecard').play(); //クリックしたら音を再生
      var data = document.querySelector('#coltest');
      for (let i=0;i<7;i++){//7行7列
        for (let j=0;j<7;j++){
          if (i>j) continue;//階段状にカードを配る
          var newhtml=document.createElement('img');
          var selectCard = shuffleCards[0];//カードを1枚選択
          shuffleCards.splice(0, 1);
          newhtml.id=String(selectCard['type'])+"_"+String(selectCard['number']);
          if (i==j) newhtml.src="Cards/"+String(newhtml.id)+".png";//対角線上のカードは表
          else newhtml.src="Cards/back.png";//それ以外は裏
          newhtml.classList.add("card");
          data.children[j].append(newhtml);
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
      $(".card").draggable({
        appendTo: "body",
        cancel: ".dummy",
        cursor: "move",
        drag: function(event, ui) {//連続しているカードを一緒に移動する
            targets.forEach((elem, index) => {
              $(elem).css(ui.position);
            });
        },
        start: function(event,ui){
          document.getElementById('audio_drawcard').currentTime = 0; //連続クリックに対応
          document.getElementById('audio_drawcard').play(); //クリックしたら音を再生
          targets=[ui.helper[0]];//同時にドラッグする要素が入る
          var id = ui.helper[0].id;
          for (const target of $(ui.helper[0]).nextAll($(this))){//連続しているカード情報を一時保存
            if (mode=="solitaire"){//色に関して、繋げられるか判定
              if (id[0]=="D"||id[0]=="H") tmp1="Red";
              else tmp1="Black";
              if (target.id[0]=="D"||target.id[0]=="H") tmp2="Red";
              else tmp2="Black";
              flag=(tmp1!=tmp2);
            }
            if (flag && (Number(id.substr(2))-1==Number(target.id.substr(2)))){//繋げられるか判定
              targets.push(target);//繋げられる場合、targetsに追加
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
      $("#completecard>*").droppable({//上がりカードのドロップ処理
        drop: function(event, ui){
          flag=false;
          if (targets.length==1){//カードを上げるのは1個移動の時のみ受け付ける
            if (event.target.lastElementChild.id=="dummy" && ui.helper[0].id.substr(2)==1) flag=true;//最初に1を置くとき
            else if ((ui.helper[0].id[0]==event.target.lastElementChild.id[0]) && (Number(ui.helper[0].id.substr(2))-1==Number(event.target.lastElementChild.id.substr(2)))) flag=true; //2以上のケースで繋がるとき
            if (flag){
              ui.helper[0].removeAttribute("class");
              ui.helper[0].classList.add("card","complete", "completecard");
              var lasthtml=ui.helper[0].previousElementSibling;
              if (lasthtml!=null && lasthtml.id!="deck" && lasthtml.id!="dummy"){
                if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){//元の場所の上のカードが裏なら開く
                  lasthtml.src="Cards/"+lasthtml.id+".png";
                }
              }
              if (ui.helper[0].parentElement.id=="oneofdeck"){//山札から移動してきた場合、山札の中から対象データを削除する
                shuffleCards.splice(--currentdeck, 1);
              }
              event.target.append(ui.helper[0]);//カード移動
              draggable_droppable_init();
            }
          }
        },
      });
      $("#coltest>*>*").droppable({
        drop: function(event,ui){
          if (event.target.id=="dummy"){
            if (mode=="solitaire"&&Number(ui.helper[0].id.substr(2))==13){//スパイダーソリティアは13でなくても一番上における
              var lasthtml=ui.helper[0].previousElementSibling;
              if (lasthtml!=null && lasthtml.id!="deck" && lasthtml.id!="dummy"){
                if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){//元の場所の上のカードが裏なら開く
                  lasthtml.src="Cards/"+lasthtml.id+".png";
                }
              }
              targets.forEach((elem, index) => {//カード移動
                if (elem.parentElement.id=="oneofdeck"){
                  shuffleCards.splice(--currentdeck, 1);
                }
                elem.removeAttribute("class");
                elem.classList.add("card");
                event.target.parentElement.append(elem);
              });
              draggable_droppable_init();
            }
          }
          if (mode=="solitaire"){
            if (ui.draggable[0].id[0]=="D"||ui.draggable[0].id[0]=="H") tmp1="Red";
            else tmp1="Black";
            if (event.target.id[0]=="D"||event.target.id[0]=="H") tmp2="Red";
            else tmp2="Black";
            flag=(tmp1!=tmp2);
          }
          if (flag && Number(ui.draggable[0].id.substr(2))+1==Number(event.target.id.substr(2))){
            var lasthtml=ui.helper[0].previousElementSibling;
            if (lasthtml!=null && lasthtml.id!="deck" && lasthtml.id!="dummy"){
              if (lasthtml.src.split("/").reverse()[0].split('.')[0]=="back"){//元の場所の上のカードが裏なら開く
                lasthtml.src="Cards/"+lasthtml.id+".png";
              }
            }
            targets.forEach((elem, index) => {//カード移動
              if (elem.parentElement.id=="oneofdeck"){
                shuffleCards.splice(--currentdeck, 1);
              }
              elem.removeAttribute("class");
              elem.classList.add("card");
              event.target.parentElement.append(elem);
            });
            draggable_droppable_init();
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
        if (data.children[i].childElementCount!=1){
          $(lasthtml).draggable("enable");//最後の要素のdraggableは必ず有効
        }
        for (let j=data.children[i].childElementCount-2;  j>0; j--){//各列のカードを後ろから見る
          if (data.children[i].children[j].src.split("/").reverse()[0].split('.')[0]=="back"){
            break;
          }
          if (mode=="solitaire"){
            if (lasthtml.id[0]=="D"||lasthtml.id[0]=="H") tmp1="Red";
            else tmp1="Black";
            if (data.children[i].children[j].id[0]=="D"||data.children[i].children[j].id[0]=="H") tmp2="Red";
            else tmp2="Black";
            flag=(tmp1!=tmp2);
          }
          if ((flag) && (Number(lasthtml.id.substr(2))+1==Number(data.children[i].children[j].id.substr(2)))){//まとめてドラッグできるかの判定
            $(data.children[i].children[j]).draggable("enable");
            lasthtml=data.children[i].children[j];
          }else{
            break;
          }
        }
      }
    }
});
