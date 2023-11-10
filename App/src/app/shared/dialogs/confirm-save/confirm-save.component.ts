import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterStateSnapshot } from '@angular/router';

@Component({
  selector: 'app-confirm-save',
  templateUrl: './confirm-save.component.html',
  styleUrls: ['./confirm-save.component.scss'],
})
export class ConfirmSaveComponent implements OnInit {
  warningText = '';

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private dialogRef: MatDialogRef<ConfirmSaveComponent>
  ) {}

  confirm(result: boolean): void {
    this.dialogRef.close(result);
  }

  ngOnInit() {
    this.route.url.subscribe(() => {
      const routerStateSnapshot: RouterStateSnapshot =
        this.router.routerState.snapshot;
      const currentRoute: string = routerStateSnapshot.url;
      if (currentRoute === '/request') {
        this.warningText = 'A solicitação será salva para análise!';
      } else if (currentRoute === '/writeoff') {
        this.warningText = 'Esta ação é irreversível!';
      } else {
        this.warningText = 'PLACEHOLDER'; // TODO alterar texto
      }
    });
  }
}
