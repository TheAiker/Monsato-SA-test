import { IFolder } from "./../shared/interface";
import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";

@Component({
  selector: "app-folder",
  templateUrl: "./folder.component.html",
  styleUrls: ["./folder.component.scss"],
})
export class FolderComponent implements OnInit {
  @Input()
  folderList: IFolder[] = [];
  @Input()
  selectedFolder?: IFolder;
  @Output()
  selectedFolderChange = new EventEmitter<IFolder | undefined>();
  @Output()
  saveData = new EventEmitter<null>();

  name: string = "";

  constructor() {}

  ngOnInit(): void {}

  onDeleteFolder(index: number) {
    if (this.selectedFolder) {
      this.selectedFolder.files = [];
      this.folderList.splice(index, 1);
      this.selectedFolderChange.emit(undefined);
      this.saveData.emit(null);
    }
    console.log(this.selectedFolder);
  }
  onFolderSelection(folder: IFolder) {
    this.selectedFolder = folder;
    this.selectedFolderChange.emit(this.selectedFolder);
  }
}
