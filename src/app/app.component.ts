import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'AngularTask';
  hide:boolean = true;
  cardBoardArray:any = [];
  cardListObject = {
    title: '',
    list:[],
    create: false,
    cssClass:'',
    btn_card: false,
    hide_btn: false
  }

  currentSelectedItemIndex: any = {};
  currentSelectedCard: any = {};

  ngOnInit() {
    this.addNewBoard("Title2");
    this.addNewBoard("Title1");
    this.addNewBoard("+ Add new list",true);
  }

  addNewBoard(title?,btn_add?) {
    this.cardListObject = {
      title: title?title:'',
      list:[],
      create: false,
      cssClass: btn_add?'add-card-list':'card',
      btn_card: btn_add?btn_add:false,
      hide_btn: false
    }
    if(!btn_add) {
      this.cardBoardArray.splice(this.cardBoardArray.length-1, 0,this.cardListObject);
    } else {
      this.cardBoardArray.push(this.cardListObject);
    }
  }

  removeCurrentCard(cardId) {
    this.cardBoardArray.splice(cardId,1);
  }

  addNewTask(cardId) {
    var listItem = {
      content: '',
      editable: true
    }
    this.cardBoardArray[cardId].hide_btn = true;
    this.cardBoardArray[cardId].list.push(listItem);
  }

  removeNewTask(cardId) {
    this.cardBoardArray[cardId].list.pop();
    this.cardBoardArray[cardId].hide_btn = false;
  }

  doAction(action,cardId,taskId) {
    if (action === 'edit') {
      this.cardBoardArray[cardId].list[taskId].editable = true;
    } else {
      if (this.cardBoardArray[cardId].list[taskId].content.trim() == '') {
        window.alert('Please enter some value or remove item');
        return;
      }
      this.cardBoardArray[cardId].list[taskId].editable = false;
      this.cardBoardArray[cardId].hide_btn = false;
    }
  }

  onDragStart(ev: any, taskId: number, cardList: any[]) {
    this.currentSelectedItemIndex = taskId;
    this.currentSelectedCard = cardList;
    ev.dataTransfer.setData('text/plain', ev.target.innerText);
    ev.dataTransfer.dropEffect = 'copy';
  }

  onDragOver(ev: any) {
    ev.preventDefault();
    ev.dataTransfer.dropEffect = 'move';
  }

  onDrop(ev: any, cardList: any[], taskId: number) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text/plain');
    console.log(data);
    this.currentSelectedCard.splice(this.currentSelectedItemIndex, 1);
    if (taskId !== undefined) {
      cardList.splice(taskId, 0, {content: data, editable: false});
    } else {
      cardList.push({content: data, editable: false});
    }
    ev.stopPropagation();
  }
}


