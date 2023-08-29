import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor(private snackBar: MatSnackBar) {}

  showAlert(
    message: string,
    action: string = 'Close',
    duration: number = 2000,
    position: MatSnackBarConfig['verticalPosition'] = 'bottom',
  ): void {
    const config: MatSnackBarConfig = {
      duration: duration,
      verticalPosition: position,
      horizontalPosition: 'end', // Set the horizontal position to 'end'
    };

    this.snackBar.open(message, action, config);
  }
}
