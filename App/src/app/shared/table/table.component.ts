import { Component, Input } from '@angular/core';
import { TableColumn } from 'src/app/interfaces/table-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  @Input() tableColumns: TableColumn[] = [];
}
