import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.css']
})
export class BookTableComponent implements OnInit {
  @Input() book: any;
  constructor() { }
  ngOnInit(): void {
    
    console.log(this.book)
  }

}
