import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoService, ITodoItemData  } from '../todo.service';
import { InitTagsService  } from '../app-init.service';

interface ITagsChecked {
  checked: boolean;
  name: string;
}


@Component({
  selector: 'app-item-edit-component',
  templateUrl: './item-edit-component.component.html',
  providers: [ToDoService]
})
export class ItemEditComponentComponent {
  public todoitem: ITodoItemData;
  public edited_tags: ITagsChecked[] = [];
  private tags: string[] = [];
  @Output() refresh = new EventEmitter();
  public statuses_dictionary = [];
  constructor(
    private todoService: ToDoService,
    private initTagsService: InitTagsService
  ) {
    this.statuses_dictionary = this.todoService.statuses_dictionary;
    this.tags = this.initTagsService.tags;
    this.todoitem = {
      id: 0,
      desc: '',
      name: '',
      status: 0,
      tags: [],
      type: ''
    };
    const tmp_array = [];
    this.tags.forEach(function (value) {
      const agg_tag: ITagsChecked = {
        checked: false,
        name: value
      };
      tmp_array.push(agg_tag);
    });
    this.edited_tags = tmp_array;
  }
  @Input()
  set editID(editID: string) {
    const nEditID = parseInt(editID, null);
    if (nEditID > 0) {
      this.todoitem.id = nEditID;
      this.LoadItemFromService();
    }
  }
  @Input() editNumber: number;

  private LoadItemFromService() {
    if (this.todoitem.id > 0) {
      this.todoitem = this.todoService.getItemByID(this.todoitem.id);
      const tags = this.todoitem.tags;
      this.edited_tags.forEach(function (value) {
        value.checked = false;
        let needchange = false;
        tags.forEach(function (value2) {
          if (value.name === value2) { needchange = true; }
        });
        if (needchange) { value.checked = true; }
      });
    }
  }

  updateCheckboxes(event) {
    const name: string = event.target.id.substring(3);
    this.edited_tags.forEach(function (value, index) {
      if (value.name === name) {
        if (event.target.checked) { value.checked = true; } else { value.checked = false; }
       }
    });
   }

   editTodo(p_edit_name, p_edit_dscr, p_edit_status) {
    let error = '';
    const checked_tags = [];
    if (p_edit_name.value === '') { error = 'Не задан заголовок'; }
    if (p_edit_dscr.value === '') { error = 'Не задано описание'; }

    if (error === '') {
      this.edited_tags.forEach(function (value, index) {
        if (value.checked === true) { checked_tags.push(value.name); }
        value.checked = false;
      });

      this.todoitem.name = p_edit_name.value;
      this.todoitem.desc = p_edit_dscr.value;
      this.todoitem.status = parseInt(p_edit_status.value, null);
      this.todoitem.tags = checked_tags;


      this.todoService.addItem(this.todoitem);
      this.todoitem.id = 0;
      this.todoitem.name = '';
      this.todoitem.desc = '';
      this.todoitem.status = 0;
      this.statuses_dictionary = this.todoService.statuses_dictionary;
      this.refresh.emit(this.editNumber);
     } else {
       alert(error);
     }

   }

}
