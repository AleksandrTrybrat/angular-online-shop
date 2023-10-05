import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'OnlineShop';
  isDarkEnable = false;
  changeTheme()  {
    this.isDarkEnable = !this.isDarkEnable;
  }
  openCloseBar = true;
hidden = 'hidden'
openMenu(){
this.openCloseBar = !this.openCloseBar
console.log(this.openCloseBar)
if(this.openCloseBar === false){
  this.hidden = 'contents'
}else{
  this.hidden = 'hidden'
}
}
}
