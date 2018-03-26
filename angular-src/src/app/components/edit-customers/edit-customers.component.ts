import { Component, OnInit } from '@angular/core';
import {CustomerService} from '../../services/customer.service';
import {Task} from '../../../../task';
@Component({
  selector: 'app-edit-customers',
  templateUrl: './edit-customers.component.html',
  styleUrls: ['./edit-customers.component.css']
})
export class EditCustomersComponent implements OnInit {
tasks: Task[];
  constructor(private taskService:CustomerService){
    this.taskService.getTasks()
        .subscribe(tasks => {
            this.tasks = tasks;
        });
}

  ngOnInit() {
  }

}
