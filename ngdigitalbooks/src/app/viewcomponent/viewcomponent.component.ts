import { Component, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-viewcomponent',
  templateUrl: './viewcomponent.component.html',
  styleUrls: ['./viewcomponent.component.css']
})
export class ViewcomponentComponent implements OnInit {

  content!:string;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    this.content=data
   }

  ngOnInit(): void {
    console.log(this.content);
  }

}
