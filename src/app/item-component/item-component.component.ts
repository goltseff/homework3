import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ToDoService, ITodoItemData  } from '../todo.service';

@Component({
  selector: 'app-item-component',
  templateUrl: './item-component.component.html',
  styleUrls: ['./item-component.component.css']
})
export class ItemComponentComponent implements OnInit {

  @Input() todoitem: ITodoItemData;
  @Output() delTodo = new EventEmitter();
  @Output() editTodo = new EventEmitter();
  public statuses_dictionary = [];
  delTodoClk(p_todoid: string) {
    this.delTodo.emit(p_todoid);
  }
  editTodoClk(p_todoid: string) {
    this.editTodo.emit(p_todoid);
  }

  constructor(private todoService: ToDoService) { this.statuses_dictionary = this.todoService.statuses_dictionary; }

  ngOnInit() {
  }

}
