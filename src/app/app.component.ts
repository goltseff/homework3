import { Component, ViewChild, ElementRef, OnInit  } from '@angular/core';
import { ToDoService, ITodoItemData  } from './todo.service';
import { InitTagsService  } from './app-init.service';

interface ITagsChecked {
  checked: boolean;
  name: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ToDoService]
})
export class AppComponent implements OnInit {
  constructor(
    private todoService: ToDoService,
    private initTagsService: InitTagsService
  ) {
    this.items = this.todoService.items;
    this.tags = this.initTagsService.tags;
  }
  public items: ITodoItemData[] = [];
  private tags: string[] = [];
  public add_tags: ITagsChecked[] = [];
  public editID = 0;
  public edit1ID = 0; edit2ID = 0; edit3ID = 0;
  ngOnInit() {
    const tmp_array: any[] = [];
    this.tags.forEach(function (value) {
      const agg_tag: ITagsChecked = {
        checked: false,
        name: value
      };
      tmp_array.push(agg_tag);
    });
    this.add_tags = tmp_array;
  }


  public addTodo(p_add_name: any, p_add_dscr: any) {
    let error = '';
    const checked_tags = [];
    if (p_add_name.value === '') { error = 'Не задан заголовок'; }
    if (p_add_dscr.value === '') { error = 'Не задано описание'; }

    if (error === '') {
      this.add_tags.forEach(function (value, index) {
        if (value.checked === true) { checked_tags.push(value.name); }
        value.checked = false;
      });

      const todo = {
        id: Date.now(),
        desc: p_add_dscr.value,
        name: p_add_name.value,
        status: 0,
        tags: checked_tags,
        type: ''
      };
      this.todoService.addItem(todo);
      this.items = this.todoService.items;
      p_add_dscr.value = '';
      p_add_name.value = '';
     } else {
       alert(error);
     }
  }
  delTodo(e: string) {
      const tmpint = parseInt(e, null);
      this.todoService.removeItem(tmpint);
      this.items = this.todoService.items;
  }
  editTodo(e: string) {
    let error = '';
    this.editID = parseInt(e, null);
    if (this.editID === this.edit1ID ||
      this.editID === this.edit2ID ||
      this.editID === this.edit3ID
    ) { error = 'задача уже взята на редактирование'; }
    if (error === '') {
      if (this.edit1ID === 0) { this.edit1ID = this.editID;
      } else if (this.edit2ID === 0) { this.edit2ID = this.editID;
      } else if (this.edit3ID === 0) { this.edit3ID = this.editID;
      } else {error = 'закончились места для редактирования :('; }
    }
    if (error !== '') {alert(error); }
  }
  scrolLeft (elem: Element) {
    console.log(elem.className);
  }
  scrolRight (elem: any) {
    console.log(elem);
  }
  refresh(num: number) {
    if (num === 1) { this.edit1ID = 0; }
    if (num === 2) { this.edit2ID = 0; }
    if (num === 3) { this.edit3ID = 0; }
    this.todoService.loadItemsFromLS();
    this.items = this.todoService.items;
  }
 updateCheckboxes(event) {
  const name: string = event.target.id.substring(3);
  this.add_tags.forEach(function (value, index) {
    if (value.name === name) {
      if (event.target.checked) { value.checked = true; } else { value.checked = false; }
     }
  });
 }
}
