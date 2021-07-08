import { Component, Input, OnInit } from '@angular/core';
import { FileService } from '../../../services/file.service';
import { global } from '../../../services/global';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-lesson-material',
  templateUrl: './lesson-material.component.html',
  styleUrls: ['./lesson-material.component.css'],
  providers: [FileService],
})
export class LessonMaterialComponent implements OnInit {
  public arrFileName = [];
  public suppMaterial;

  @Input()
  set SM(supportMaterial) {
    this.suppMaterial = supportMaterial;
  }

  constructor(private _fileService: FileService) {}

  ngOnInit(): void {}

  download(index) {
    let c = 0;
    let arr = [];

    this.suppMaterial.forEach((element) => {
      arr.push(element.supportMaterialPath.split('/', 4));
      this.arrFileName.push(arr[c][3]);
      c++;
    });

    var filename = this.arrFileName[index];

    this._fileService.downloadFile(filename).subscribe(
      (data) => saveAs(data, filename),
      (error) => console.error(error)
    );
  }
  prueba() {
    let c = 0;
    let arr = [];
    let arrFileName = [];
    this.suppMaterial.forEach((element) => {
      arr.push(element.supportMaterialPath.split('/', 4));
      arrFileName.push(arr[c][3]);
      c++;
    });
  }
}
