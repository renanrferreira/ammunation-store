import { Component } from '@angular/core';
import { Navbar } from '../navbar/navbar';
import { RouterModule } from '@angular/router';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { TiltedCard } from '../tilted-card/tilted-card';
import { CommonModule } from '@angular/common';
import { StaggeredMenuComponent, StaggeredMenuItem } from '../staggered-menu/staggered-menu';

@Component({
  selector: 'true',
  imports: [RouterModule, NgbCarouselModule, TiltedCard, CommonModule,StaggeredMenuComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  menuItems: StaggeredMenuItem[] = [
    { label: 'Rifles', ariaLabel: 'Scroll to Rifles', link: 'rifles' },
    { label: 'Shotguns', ariaLabel: 'Scroll to Shotguns', link: 'shotguns' },
    { label: 'Pistolas', ariaLabel: 'Scroll to Pistolas', link: 'pistolas' },
    { label: 'Melees', ariaLabel: 'Scroll to Melees', link: 'acessorios' }
  ];

  socialItems = [
    { label: 'GitHub', link: 'https://github.com/renanrferreira?tab=repositories' }
  ];
  images = [
    'public/store1.png',
    'public/store2.png',
    'public/store3.png',
    'public/store4.png',
    'public/store5.png'
  ]
  rifleList = [
    {
      imageSrc: 'Guns/ak.png',
      altText: 'Assault Rifle Mk II',
      captionText: 'Assault Rifle Mk II',
      oldPrice: '102.100,00',
      newPrice: '98.750,00',
      views: 1843,
      viewInterval: 500
    },
    {
      imageSrc: 'Guns/m4.png',
      altText: 'Carbine Rifle M00 II',
      captionText: 'Carbine Rifle Mk II',
      oldPrice: '', 
      newPrice: '107.500,00',
      views: 1231,
      viewInterval: 1000
    },
    {
      imageSrc: 'Guns/sniper.png',
      altText: 'Sniper Mk II',
      captionText: 'Sniper Mk II',
      oldPrice: '170.670,00', 
      newPrice: '165.375,00',
      views: 567,
      viewInterval: 2000
    },
    {
      imageSrc: 'Guns/12.png',
      altText: 'Assault SMG',
      captionText: 'Assault SMG',
      oldPrice: '15.100,00',
      newPrice: '12.550,00',
      views: 212,
      viewInterval: 3000
    }
  ];
  shotgunList = [
    {
      imageSrc: 'Guns/assault.png',
      altText: 'Assault Shotgun',
      captionText: 'Assault Shotgun',
      oldPrice: '4.600,00',
      newPrice: '3.500,00',
      views: 879,
      viewInterval: 1000
    },
    {
      imageSrc: 'Guns/pump.png',
      altText: 'Pump Shotgun',
      captionText: 'Pump Shotgun',
      oldPrice: '1.800,00',
      newPrice: '1.200,00',
      views: 1880,
      viewInterval: 600
    },
    {
      imageSrc: 'Guns/cort.png',
      altText: 'Sawed-Off Shotgun',
      captionText: 'Sawed-Off Shotgun',
      oldPrice: '',
      newPrice: '800,00',
      views: 120,
      viewInterval: 5000
    },
    {
      imageSrc: 'Guns/muscket.png',
      altText: 'Musket',
      captionText: 'Musket',
      oldPrice: '',
      newPrice: '18.190,00',
      views: 80,
      viewInterval: 4000
    }
  ];
  pistolList = [
    {
      imageSrc: 'Guns/heavy.png',
      altText: 'Heavy Pistol',
      captionText: 'Heavy Pistol',
      oldPrice: '4.000,00',
      newPrice: '3.750,00',
      views: 490,
      viewInterval: 3000
    },
    {
      imageSrc: 'Guns/combat.png',
      altText: 'Combat Pistol',
      captionText: 'Combat Pistol',
      oldPrice: '',
      newPrice: '3.200,00',
      views: 567,
      viewInterval: 2000
    },
    {
      imageSrc: 'Guns/ap.png',
      altText: 'AP Pistol',
      captionText: 'AP Pistol',
      oldPrice: '1.450,00',
      newPrice: '1.000,00',
      views: 208,
      viewInterval: 4000
    },
    {
      imageSrc: 'Guns/vint.png',
      altText: 'Vintage Pistol',
      captionText: 'Vintage Pistol',
      oldPrice: '',
      newPrice: '3.450,00',
      views: 67,
      viewInterval: 5000
    }
  ];
  meleeList = [
    {
      imageSrc: 'Guns/faca.png',
      altText: 'Knife',
      captionText: 'Knife',
      oldPrice: '130,00',
      newPrice: '100,00',
      views: 50,
      viewInterval: 3000
    },
    {
      imageSrc: 'Guns/soco.png',
      altText: 'Knuckle Dusters',
      captionText: 'Knuckle Dusters',
      oldPrice: '',
      newPrice: '150,00',
      views: 1200,
      viewInterval: 2000
    },
    {
      imageSrc: 'Guns/granada.png',
      altText: 'Grenade',
      captionText: 'Grenade',
      oldPrice: '',
      newPrice: '360,00',
      views: 785,
      viewInterval: 4000
    },
    {
      imageSrc: 'Guns/gas.png',
      altText: 'Tear Gas',
      captionText: 'Tear Gas',
      oldPrice: '200,00',
      newPrice: '150,00',
      views: 376,
      viewInterval: 5000
    }
  ];
}

