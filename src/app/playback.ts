import { Component } from '@angular/core';
import { AccountService } from '../services/account';
import { Router } from '@angular/router';

@Component({
  selector: 'playback',
  templateUrl: './playback.html',
  styleUrls: ['./playback.css']
})
export class PlaybackComponent {
  constructor(
    public readonly accountService: AccountService,
    private readonly router: Router) {
  }

}
