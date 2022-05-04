import { IFile, IFolder } from "./components/shared/interface";
import { Component, OnInit } from "@angular/core";

const localStorageKey = "localData";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  fileNameInInput: string = "";
  folderList: Array<IFolder> = [];
  folderName: string = "";
  selectedFolder?: IFolder;
  constructor() {}

  ngOnInit(): void {
    this.loadData();
  }
  onFolderSelect(folder: IFolder | undefined) {
    this.selectedFolder = folder;
    console.log(this.selectedFolder);
  }

  onAddFile() {
    if (this.fileNameInInput === "") {
      return console.error("nezya");
    }
    if (this.selectedFolder)
      this.selectedFolder?.files.push({ name: this.fileNameInInput });
    this.selectedFolder = this.selectedFolder;
    this.saveData();
  }

  onAddFolder() {
    if (this.folderName === "") {
      return console.error("nezya");
    }
    this.folderList.push({ name: this.folderName, files: [] });
    this.saveData();
  }
  loadData() {
    const saveDataJson = localStorage.getItem(localStorageKey);
    if (saveDataJson) {
      this.folderList = JSON.parse(saveDataJson);
    }
  }
  saveData() {
    const saveDataJson = JSON.stringify(this.folderList);
    localStorage.setItem(localStorageKey, saveDataJson);
  }
}
