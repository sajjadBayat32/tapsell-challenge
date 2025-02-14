import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HeaderComponent } from './shared/layout/header/header.component';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatDialogModule, HeaderComponent],
  providers: [{ provide: MatDialogRef, useValue: {} }],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  ngOnInit(): void {}
}
