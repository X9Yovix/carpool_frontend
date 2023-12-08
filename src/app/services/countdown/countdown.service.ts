import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { map, takeWhile, throttleTime } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class CountdownService {
  private countdownSubject: BehaviorSubject<number>;

  constructor() {
    this.countdownSubject = new BehaviorSubject<number>(0);
  }

  startCountdown(countdownDate: Date): Observable<number> {
    const endTime = countdownDate.getTime();
    const currentTime$ = timer(0, 1000);

    return currentTime$.pipe(
      map(() => {
        const now = new Date().getTime();
        const distance = endTime - now;
        return Math.max(0, distance);
      }),
      //throttleTime(1000),
      takeWhile(distance => distance > 0)
    );
  }
}
