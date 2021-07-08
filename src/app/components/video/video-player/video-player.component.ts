import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  OnChanges,
  ViewChild,
} from '@angular/core';
import { PlyrComponent } from 'ngx-plyr';
import * as Plyr from 'plyr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css'],
})
export class VideoPlayerComponent implements OnInit, OnChanges {
  public videoDesc2;
  private url = environment.url;

  @Input()
  set videoDesc(str: string) {
    this.videoDesc2 = str;
  }

  @ViewChild(PlyrComponent, { static: true })
  plyr: PlyrComponent;

  player: Plyr;

  videoSources: Plyr.Source[] = [];

  poster =
    'https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-HD.jpg';

  public change = true;
  public check;
  constructor(private cdRef: ChangeDetectorRef) {}
  ngOnInit(): void {}
  ngOnChanges(): void {
    this.videoSources = [];
    const source = {
      src: this.url + 'video/getVideo/' + this.videoDesc2,
    };
    this.videoSources.push(source);
    this.change = false;
    setTimeout(() => {
      this.change = true;
    }, 1);

    this.check = Math.random();
  }
  played(event: Plyr.PlyrEvent) {}

  play(): void {
    this.player.play(); // or this.plyr.player.play()
  }

  pause(): void {
    this.player.pause(); // or this.plyr.player.play()
  }

  stop(): void {
    this.player.stop(); // or this.plyr.player.stop()
  }
}
