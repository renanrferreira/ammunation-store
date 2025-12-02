import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})

export class Navbar {

  constructor() { }

scrollTo(sectionId: string): void {
  const element = document.getElementById(sectionId);
    
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start',      
        inline: 'nearest'
      });
    }
  }
}